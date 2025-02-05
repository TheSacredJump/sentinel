"""
  This is a quick implimentation for testing the model on an template email
"""
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import joblib
import numpy as np

# **Load the trained BERT model & tokenizer**
model_path = "...filepath/bert_model"
tokenizer_path = "...filepathbert_tokenizer"
mlb_path = "...filepath/mlb.pkl"

model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)
mlb = joblib.load(mlb_path)

# **Set model to evaluation mode**
model.eval()

def predict_email_category(email_text):
    """Predicts the category of an email using the trained BERT model."""
    inputs = tokenizer(email_text, truncation=True, padding="max_length", max_length=512, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits

    # Convert logits to probabilities (sigmoid for multi-label classification)
    probs = torch.sigmoid(logits).numpy()

    # Convert probabilities to binary predictions (threshold = 0.5)
    preds = (probs > 0.5).astype(int)

    # Convert back to category labels
    predicted_labels = mlb.inverse_transform(preds)[0]  # Convert one-hot back to labels

    return predicted_labels

test_emails = [
    "Dear user, your credit card statement is now available. Please review the details and make the payment before the due date.",
    "Hey team, don't forget about our networking event happening this weekend. Make sure to RSVP!"
]

for email in test_emails:
    print(f" **Email:** {email}")
    print(f" **Predicted Categories:** {predict_email_category(email)}")
