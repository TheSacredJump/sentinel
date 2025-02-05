"""
  This is for cleaning up the data after the categories has been generated. Trying to eleminate the empty rows / dup rows.
"""
import pandas as pd

# Load Data
df = pd.read_csv("...filepath", index_col=0)

df["Subject"] = df["Subject"].fillna("No Subject")
df["Sender"] = df["Sender"].fillna("Unknown Sender")
df["Body"] = df["Body"].fillna("No Content")  # Ensure Body field is preserved
df["Domain"] = df["Domain"].fillna("Unknown Domain")
df["Categories"] = df["Categories"].fillna("Uncategorized")

df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
df["Body"] = df["Body"].str.replace(r"\s+", " ", regex=True)  # Normalize spaces

df["Subject"] = df["Subject"].str.lower()
df["Sender"] = df["Sender"].str.lower()
df["Body"] = df["Body"].str.lower()
df["Domain"] = df["Domain"].str.lower()
df["Categories"] = df["Categories"].str.lower()

df["Email"] = df["Sender"].str.extract(r'<(.*?)>')  # Extract email if present
df["Sender Name"] = df["Sender"].str.extract(r'(.*) <')  # Extract name if present
df["Sender Name"] = df["Sender Name"].fillna(df["Sender"])  # If no name, keep original sender
df.drop(columns=["Sender"], inplace=True)

df["Email"] = df.apply(lambda row: f"unknown@{row['Domain']}" if pd.isna(row["Email"]) else row["Email"], axis=1)

df["Sender Name"] = df["Sender Name"].fillna(df["Domain"].apply(lambda x: x.split(".")[0] if x != "Unknown Domain" else "Unknown Sender"))

df["Categories"] = df["Categories"].str.split(", ")  # Convert categories to lists
df["Categories"] = df["Categories"].apply(lambda x: ", ".join(sorted(set(x))) if isinstance(x, list) else x)

df.drop_duplicates(subset=["Subject", "Email", "Body"], inplace=True)

print(df.isna().sum())  # Ensure no missing values
print(df.duplicated().sum())  # Check for remaining duplicates
print(df.describe(include="all"))  # Verify cleaned data

df.to_csv("...filepath", index=False)

print("Data cleaned and saved successfully!")
