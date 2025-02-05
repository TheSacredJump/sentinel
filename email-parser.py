"""
  Parses the downloaded mailboxes from Gmail. It can be any mbox file, but we grab the necessary fields for generating the draft dataset
"""
import mailbox
from bs4 import BeautifulSoup
import pandas as pd
class GmailMboxMessage():
    def __init__(self, email_data):
        self.email_data = email_data

    def parse_email(self):
        """
        Returns exactly one string containing the plain-text body
        (ignoring other parts such as HTML or attachments).
        """
        return self._get_single_text_part()

    def transform_html(self, html_string) -> str:
      soup = BeautifulSoup(html_string, 'html.parser')
      all_text = soup.get_text()
      return all_text

    def _get_single_text_part(self):
        """
        Walk through the MIME parts (if multipart) and return the
        first text/plain part encountered as a single string.
        """
        # If multipart, iterate over all sub-parts
        if self.email_data.is_multipart():
            for part in self.email_data.walk():
                if part.get_content_type() == 'text/plain':
                    # decode=True handles base64/quoted-printable, etc.
                    text_bytes = part.get_payload(decode=True)
                    if text_bytes:
                        charset = part.get_content_charset() or 'utf-8'
                        try:
                          return True, text_bytes.decode(charset, errors='replace')
                        except LookupError:
                          return None, self.email_data
                elif part.get_content_type() == "text/html":
                  text_bytes = part.get_payload(decode=True)
                  if text_bytes:
                      charset = (part.get_content_charset() or 'utf-8').strip().lower()
                      try:
                          extracted_text = self.transform_html(text_bytes.decode(charset, errors='replace')).strip()
                          extra_cleaned = " ".join(extracted_text.split())
                          # print(f"We had to go to HTML, {extra_cleaned}")
                          return True, extra_cleaned
                      except LookupError:
                        print("Encountered lookup error")
            return None, self.email_data  # No text/plain part found
        else:
            # If it's not multipart, check if it's already text
            if self.email_data.get_content_type() == 'text/plain':
                text_bytes = self.email_data.get_payload(decode=True)
                charset = self.email_data.get_content_charset() or 'utf-8'
                try:
                  return True, text_bytes.decode(charset, errors='replace') if text_bytes else None
                except LookupError:
                  return None, self.email_data

            elif self.email_data.get_content_type() == "text/html":
              text_bytes = self.email_data.get_payload(decode=True)
              if text_bytes:
                  charset = (self.email_data.get_content_charset() or 'utf-8').strip().lower()
                  try:
                      extracted_text = self.transform_html(text_bytes.decode(charset, errors='replace')).strip()
                      extra_cleaned = " ".join(extracted_text.split())
                      # print(f"We had to go to HTML, {extra_cleaned}")
                      return True, extra_cleaned
                  except LookupError:
                    print("Ran into lookup error")
                    return None, self.email_data
            else:
                return None, self.email_data

def get_domain(text: str) -> str | None:
    parts = text.split("@")
    return parts[-1] if len(parts) > 1 else None

i = 0
inboxes = ["...filepath", "...filepath2"]
# Usage example:
for mailbox_path in inboxes:
  df_obj = {"Subject": [], "Sender": [], "Body": [], "Domain": []}
  mbox_obj = mailbox.mbox(mailbox_path)
  for idx, email_obj in enumerate(mbox_obj):
      email_data = GmailMboxMessage(email_obj)
      is_none, text_string = email_data.parse_email()
      text_from = email_obj["From"]
      text_subject = email_obj["subject"]
      if not is_none or not text_from or not text_subject:
        # print(f"Subject #{text_subject} From:\n", text_from, f" Bodt #{text_string} \n---\n")
        i+=1
        continue
      domain = get_domain(text_from)
      df_obj["Subject"].append(text_subject)
      df_obj["Sender"].append(text_from)
      df_obj["Body"].append(text_string)
      df_obj["Domain"].append(domain)

      # print(f"Subjext #{text_subject} text:\n", text_string, "\n---\n")
      # input()
  df = pd.DataFrame(df_obj)
  path = mailbox_path.split("/")[-1].split(".")[0]
  df.to_csv(path + "-csv", sep='\t', encoding='utf-8', index=False, header=True, quoting=3, escapechar='\\')
  print("You missed {} emails. Still saved the file".format(i))
