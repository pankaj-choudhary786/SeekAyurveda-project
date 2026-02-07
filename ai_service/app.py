from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
import cv2
import numpy as np
import json
import re
from difflib import SequenceMatcher

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)
CORS(app)

# Load Database
try:
    with open("ingredients.json", "r", encoding="utf-8") as f:
        DB = json.load(f)
except FileNotFoundError:
    print("Error: ingredients.json not found!")
    DB = []

def analyze_full_text(raw_text):
    results = {
        "total_ingredients": 0,
        "identified_ingredients": [],
        "unidentified_ingredients": [],
        "overall_safety_score": 0,
        "overall_rating": "unknown",
        "conclusion": "",
        "warnings": []
    }

    # Normalize OCR text and remove punctuation that breaks word detection
    search_blob = raw_text.lower()
    search_blob = re.sub(r'[:;.|•,]', ' ', search_blob)
    
    found_herb_ids = set()
    words_to_exclude = set() # To prevent botanical names from showing as "Unidentified"
    total_score = 0
    harmful_count = 0

    # 1. IDENTIFICATION & EXTRACTION
    for herb in DB:
        herb_name = herb.get("herb_name", "").strip()
        botanical = herb.get("botanical_name", "").strip()
        
        # Create a list of all names that represent THIS herb
        aliases = [herb_name.lower(), botanical.lower()]
        if herb.get("common_names"):
            aliases.extend([n.strip().lower() for n in herb["common_names"].split(",")])

        match_for_this_herb = False
        for alias in aliases:
            if not alias or len(alias) < 3: continue
            
            # If the alias is found in the scan
            if alias in search_blob:
                match_for_this_herb = True
                # Blacklist every word in this name so it won't show in "Unidentified"
                for word in alias.split():
                    words_to_exclude.add(word)

        if match_for_this_herb:
            if herb_name not in found_herb_ids:
                found_herb_ids.add(herb_name)
                
                score = float(herb.get("safety_score", 5.0))
                total_score += score
                
                # Assign Rating based on Score
                if score <= 2.5:
                    severity = "avoid"
                    harmful_count += 1
                elif score <= 4.5:
                    severity = "caution"
                else:
                    severity = "safe"

                # Detailed Ingredient Profile
                results["identified_ingredients"].append({
                    "matched_name": herb_name,
                    "botanical_name": botanical,
                    "safety_rating": severity,
                    "safety_score": score,
                    "benefits": herb.get("benefits", "Promotes general wellness"),
                    "contraindications": herb.get("contraindications", "None reported"),
                    "dosha_effect": herb.get("dosha_effects", "Tridoshic"),
                    "toxicity_notes": herb.get("toxicity_notes", "Safe in traditional doses"),
                    "recommended_dosage": herb.get("recommended_dosage", "Consult practitioner"),
                    "alternatives": herb.get("alternatives", "N/A")
                })

    # 2. REDUNDANCY FILTER (Cleanup)
    all_ocr_words = search_blob.split()
    # General words that aren't ingredients
    noise = ["powder", "extract", "from", "with", "added", "contains", "prepared", "each", "products", "weight", "asitis"]
    
    unique_unidentified = set()
    for word in all_ocr_words:
        # Keep only alphabetic words longer than 3 chars
        clean_word = re.sub(r'[^a-z]', '', word)
        if len(clean_word) > 3 and clean_word not in words_to_exclude and clean_word not in noise:
            unique_unidentified.add(clean_word.capitalize())
    
    results["unidentified_ingredients"] = sorted(list(unique_unidentified))

    # 3. FINAL CONCLUSION LOGIC
# 3. FINAL CONCLUSION LOGIC (Update this section)
    results["total_ingredients"] = len(results["identified_ingredients"])
    unidentified_count = len(results["unidentified_ingredients"])
    
    # NEW RULE: If unidentified count >= 15, override results
    if unidentified_count >= 15:
        results["overall_rating"] = "not_ayurvedic"
        results["overall_safety_score"] = "N/A"
        results["conclusion"] = "NON-AYURVEDIC PRODUCT: This product contains too many synthetic or unidentified ingredients (15+) to be analyzed under Ayurvedic standards."
    elif results["total_ingredients"] > 0:
        avg_score = total_score / results["total_ingredients"]
        results["overall_safety_score"] = round(avg_score, 1)
        
        if harmful_count > 0:
            results["overall_rating"] = "avoid"
            results["conclusion"] = "CRITICAL: This formulation contains potent or restricted ingredients. Professional Ayurvedic supervision is required."
        elif avg_score < 4.5:
            results["overall_rating"] = "caution"
            results["conclusion"] = "MODERATE: Generally safe, but contains specific herbs that may cause irritation if taken incorrectly."
        else:
            results["overall_rating"] = "safe"
            results["conclusion"] = "EXCELLENT: All identified ingredients are high-safety traditional herbs."
    else:
        results["overall_rating"] = "unknown"
        results["conclusion"] = "ANALYSIS INCOMPLETE: No known ingredients matched."

    return results

@app.route("/analyze", methods=["POST"])
def analyze():
    raw_text = ""
    
    # Check if input is an image
    if "image" in request.files:
        file = request.files["image"]
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        
        # Pre-processing
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        gray = clahe.apply(gray)
        processed_img = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        raw_text = pytesseract.image_to_string(processed_img)
    
    # Check if input is raw text (from the textarea)
    elif request.is_json:
        data = request.get_json()
        raw_text = data.get("text", "")
    
    else:
        return jsonify({"error": "No input provided"}), 400

    if not raw_text.strip():
        return jsonify({"error": "No text detected or provided"}), 400

    analysis = analyze_full_text(raw_text)
    
    return jsonify({
        "analysis": analysis,
        "extracted_text": raw_text
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
