from PIL import Image
import qrcode
from qrcode.constants import ERROR_CORRECT_H

URL = "https://seoha376.github.io/selection-game/"
OUTPUT = "assets/selection-game-qr.png"


def make_qr():
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=24,
        border=6,
    )
    qr.add_data(URL)
    qr.make(fit=True)
    return qr.make_image(fill_color="black", back_color="white").convert("RGB")


image = make_qr()
image.save(OUTPUT)
print(f"saved {OUTPUT} ({image.width}x{image.height})")
