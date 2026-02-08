set -o errexit

apt-get update && apt-get install -y tesseract-ocr libgl1-mesa-glx
pip install -r requirements.txt