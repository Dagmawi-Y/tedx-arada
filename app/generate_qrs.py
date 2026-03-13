import csv
import qrcode
import os
import json
import re
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers.pil import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask

# TED Branding Colors
TED_RED = (230, 43, 30)  # #e62b1e
WHITE = (255, 255, 255)

def sanitize_filename(name):
    name = re.sub(r'[^a-zA-Z0-9\s]', '', name)
    return name.strip().replace(" ", "_")

def generate_qrs():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(base_dir, "attendees.csv")
    output_dir = os.path.join(base_dir, "qrcodes")
    # Using the white logo from the landing page assets
    logo_path = os.path.normpath(os.path.join(base_dir, "../landing/public/images/logo/logo-white.png"))

    if not os.path.exists(csv_file_path):
        print(f"Error: {csv_file_path} not found.")
        return

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

            # High error correction to allow for logo embedding
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_H,
                box_size=20, # Larger boxes for better quality
                border=4,
            )
            qr.add_data(qr_data_str)
            qr.make(fit=True)

            # Create clean customized QR code without logo
            img = qr.make_image(
                image_factory=StyledPilImage,
                module_drawer=RoundedModuleDrawer(),
                color_mask=SolidFillColorMask(back_color=TED_RED, front_color=WHITE)
            )

            safe_name = sanitize_filename(attendee_name)
            filename = f"{safe_name}.png"
            filepath = os.path.join(output_dir, filename)

            img.save(filepath)

            count += 1
            print(f"Generated customized QR: {filepath}")

    print(f"\nSuccessfully generated {count} premium QR codes in '{output_dir}'.")

if __name__ == "__main__":
    generate_qrs()