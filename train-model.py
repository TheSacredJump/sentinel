"""
  This file is used for training the model on the specific dataset.
"""

import pandas as pd
import torch
import numpy as np
import joblib
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments, default_data_collator
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

df = pd.read_csv("...filepath/cleaned_final.csv")
df["Categories"] = df["Categories"].str.lower().str.split(", ")
mlb = MultiLabelBinarizer()
y = mlb.fit_transform(df["Categories"])  # Convert categories to multi-label format
X = df.drop(columns=["Categories"])
X_text = X.apply(lambda row: ' '.join(row.values.astype(str)), axis=1).tolist()

X_train, X_test, y_train, y_test = train_test_split(X_text, y, test_size=0.2, random_state=42)

tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

class EmailDataset(Dataset):
    def __init__(self, texts, labels):
        self.texts = texts
        self.labels = torch.tensor(labels, dtype=torch.float)

    def __len__(self):
        return len(self.texts)

    def __getitem__(self, idx):
        encodings = tokenizer(self.texts[idx], truncation=True, padding="max_length", max_length=512, return_tensors="pt")
        return {
            "input_ids": encodings["input_ids"].squeeze(0),
            "attention_mask": encodings["attention_mask"].squeeze(0),
            "labels": self.labels[idx]
        }

train_dataset = EmailDataset(X_train, y_train)
test_dataset = EmailDataset(X_test, y_test)

model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",
    num_labels=len(mlb.classes_),
    problem_type="multi_label_classification"
)

training_args = TrainingArguments(
    output_dir="./bert_results",
    eval_strategy="epoch",
    save_strategy="epoch",
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=5,  # Adjustable
    weight_decay=0.01,
    logging_dir="./logs",
    report_to="none",
    load_best_model_at_end=True,
    gradient_accumulation_steps=4,
    fp16=True,
    save_total_limit=2
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=test_dataset,
    data_collator=default_data_collator
)

trainer.train()

predictions = trainer.predict(test_dataset).predictions
predictions = torch.sigmoid(torch.tensor(predictions)).numpy()
predictions = (predictions > 0.5).astype(int)  # Convert probabilities to 0/1 predictions

precision, recall, f1, _ = precision_recall_fscore_support(y_test, predictions, average="micro")
accuracy = accuracy_score(y_test, predictions)

print(f"Model Accuracy: {accuracy:.4f}")
print(f"Precision: {precision:.4f}, Recall: {recall:.4f}, F1-score: {f1:.4f}")

# **💾 Save Model & Tokenizer**
model.save_pretrained("...filepath/bert_model")
tokenizer.save_pretrained("...filepath/bert_tokenizer")
joblib.dump(mlb, "...filepath/mlb.pkl")

print(" BERT Model Saved Successfully!")
