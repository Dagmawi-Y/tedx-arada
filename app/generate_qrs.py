import csv
import qrcode
import os
import json
import re

def sanitize_filename(name):
    name = re.sub(r'[^a-zA-Z0-9\s]', '', name)
    return name.strip().replace(" ", "_")

def generate_qrs():

    csv_file_path = "attendees.csv"
    output_dir = "qrcodes"

    os.makedirs(output_dir, exist_ok=True)

    with open(csv_file_path, mode="r", encoding="utf-8") as file:
        reader = csv.DictReader(file)

        print("Detected CSV columns:", reader.fieldnames)

        count = 0

        for i, row in enumerate(reader, start=1):

            attendee_id = i
            attendee_name = row.get("Full Name")

            if not attendee_name:
                continue

            qr_data = {
                "id": attendee_id,
                "name": attendee_name
            }

            qr_data_str = json.dumps(qr_data)

            qr = qrcode.make(qr_data_str)

            safe_name = sanitize_filename(attendee_name)

            filename = f"{safe_name}.png"
            filepath = os.path.join(output_dir, filename)

            qr.save(filepath)

            count += 1
            print(f"Generated: {filepath}")

    print(f"\nSuccessfully generated {count} QR codes in '{output_dir}'.")

if __name__ == "__main__":
    generate_qrs()