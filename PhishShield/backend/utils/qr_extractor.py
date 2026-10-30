import cv2
import numpy as np
import base64
import io
from PIL import Image


def extract_url_from_qr(image_base64: str) -> dict:
    """
    Decodes a QR code image and extracts the URL inside it.
    Uses multiple OpenCV detection methods and image preprocessing.
    """
    try:
        image_data = base64.b64decode(image_base64)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")

        img_array = np.array(image)
        img_bgr = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)

        detector = cv2.QRCodeDetector()

        # Try original image first
        data, bbox, _ = detector.detectAndDecode(img_bgr)

        if data:
            if data.startswith("http") or data.startswith("www"):
                return {"url": data, "error": None}
            return {"url": data, "error": "QR content is not a URL"}

        # Try grayscale
        gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
        data, bbox, _ = detector.detectAndDecode(gray)

        if data:
            if data.startswith("http") or data.startswith("www"):
                return {"url": data, "error": None}
            return {"url": data, "error": "QR content is not a URL"}

        # Resize image if QR is small
        scale = 2
        resized = cv2.resize(
            gray,
            None,
            fx=scale,
            fy=scale,
            interpolation=cv2.INTER_CUBIC
        )

        data, bbox, _ = detector.detectAndDecode(resized)

        if data:
            if data.startswith("http") or data.startswith("www"):
                return {"url": data, "error": None}
            return {"url": data, "error": "QR content is not a URL"}

        # Try adaptive threshold
        threshold = cv2.adaptiveThreshold(
            gray,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,
            2
        )

        data, bbox, _ = detector.detectAndDecode(threshold)

        if data:
            if data.startswith("http") or data.startswith("www"):
                return {"url": data, "error": None}
            return {"url": data, "error": "QR content is not a URL"}

        return {"url": None, "error": "No QR code found in image"}

    except Exception as e:
        return {"url": None, "error": str(e)}