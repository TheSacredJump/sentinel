"""
  Uses ollama to generate the categories for each email. Must use post processing after doing this.
"""


import pandas as pd
import ollama
import os
import gc

INPUT_FILE = "...filepath"
OUTPUT_FILE = "categorized_emails.csv"
TEMP_FILE = "categorized_emails_temp.csv"  # Temporary file for safe writing
SAVE_INTERVAL = 100  # Save after every 100 newly processed emails

BROAD_CATEGORIES = [
    "Work", "School", "Personal", "Social", "Finance",
    "Promotions", "Spam", "Other", "Networking", "Health & Wellness", "Sports & Outdoor",
    "Technology & Coding", "Entertainment", "Travel & Events", "Community & Clubs",
    "Legal & Government", "Home & Family"
]

# Ensure categories are stored in a set for fast validation
CATEGORY_SET = set(BROAD_CATEGORIES)

# A single template for the prompt to minimize overhead in the loop
PROMPT_TEMPLATE = """You are an AI email classifier. Assign emails only to the **broad** categories from the provided list.

**Broad Categories:** {broad}

**Rules:**
- Assign **at least one** category from the list.
- If the email fits **multiple** categories, include all relevant ones.
- If uncertain, use "Other".
- Only respond with the category names, separated by commas, with no extra text.

**Email Details:**
- **Subject:** {subject}
- **Sender:** {sender}
- **Domain:** {domain}
- **Body (Excerpt):** {body_excerpt}

**Response Format:** Only a comma-separated list of categories (e.g., Work,School,Finance)
"""

try:
    df = pd.read_csv(
        INPUT_FILE, sep="\t", encoding="utf-8",
        quotechar='"', escapechar='\\'
    )
except Exception as e:
    print(f"Error reading input file: {e}")
    exit(1)

# Shuffle if needed
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

# Try to resume from the existing output file
if os.path.exists(OUTPUT_FILE):
    try:
        existing_df = pd.read_csv(OUTPUT_FILE)
        if len(existing_df) == len(df):
            df["Categories"] = existing_df["Categories"]
            print(f"Resuming with {len(existing_df)} previously processed rows.")
        else:
            print("Warning: Output file found, but lengths differ. Starting fresh.")
            df["Categories"] = None
    except Exception as e:
        print(f"Error reading existing output file: {e}")
        df["Categories"] = None
else:
    df["Categories"] = None

def categorize_email(subject: str, sender: str, body: str, domain: str, i: int) -> str:
    """
    Classifies an email and returns a validated comma-separated list of categories.
    Returns None if an error occurs or if the response is invalid.
    """
    body_excerpt = str(body).replace("\n", " ") if pd.notna(body) else ""

    prompt = PROMPT_TEMPLATE.format(
        broad=", ".join(BROAD_CATEGORIES),
        subject=subject,
        sender=sender,
        domain=domain,
        body_excerpt=body_excerpt
    )

    try:
        response = ollama.chat(
            model="mistral",
            messages=[{"role": "user", "content": prompt}],
            options={"num_ctx": 2048, "gpu": True}  # Force GPU usage
        )

        categories = response['message']['content'].strip()

        # Validate the response
        valid_categories = [c.strip() for c in categories.split(",") if c.strip() in CATEGORY_SET]

        if not valid_categories:
            print(f"Warning: Invalid response for email {i}. Skipping.")
            return None

        print(f"Response {i}: {', '.join(valid_categories)}")
        return ", ".join(valid_categories)

    except Exception as e:
        print(f"Error processing email {i}: {e}")
        return None

total_rows = len(df)
processed_since_last_save = 0
print(f"Going to iterate over {total_rows} rows")

for i in range(total_rows):
    if pd.isna(df.iloc[i]["Categories"]):  # Check for NaN correctly
      print("nan value at: " + f"{i}")
      # Skip already processed valid rows
      if i % 500 == 0:
          gc.collect()
      if pd.notna(df.at[i, "Categories"]) and df.at[i, "Categories"] not in {None, "Error"}:
          continue

      try:
          subject = df.at[i, "Subject"]
          sender = df.at[i, "Sender"]
          domain = df.at[i, "Domain"]
          body = df.at[i, "Body"]
      except Exception as e:
          print(f"Error accessing row {i}: {e}. Skipping.")
          continue

      categories = categorize_email(subject, sender, body, domain, i)

      if categories:
          df.at[i, "Categories"] = categories
          processed_since_last_save += 1
      else:
          print(f"Skipping row {i} due to processing error.")

      # Save progress at intervals
      if processed_since_last_save >= SAVE_INTERVAL:
          try:
              df.to_csv(TEMP_FILE, index=False)
              os.replace(TEMP_FILE, OUTPUT_FILE)  # Atomic file replacement
              print(f"Progress saved: row {i+1}/{total_rows} categorized.")
              processed_since_last_save = 0
          except Exception as e:
              print(f"Error saving progress at row {i}: {e}")
    else:
      i+=1
# Final save
try:
    df.to_csv(TEMP_FILE, index=False)
    os.replace(TEMP_FILE, OUTPUT_FILE)
    print("All done! Final file saved.")
except Exception as e:
    print(f"Error during final save: {e}")
