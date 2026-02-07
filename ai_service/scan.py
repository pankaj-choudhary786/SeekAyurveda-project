from flask import Flask, request, jsonify
from flask_cors import CORS
import json, requests, numpy as np, io
from PIL import Image
from sahi import AutoDetectionModel 
from sahi.predict import get_sliced_prediction

app = Flask(__name__)
CORS(app) 

JSON_FILE = "ayur_pantry.json"
API_KEY = "d35ded53f6848bbb681eb07774bc673a"
VOCAB, RECIPE_DB = [], []
DETECTION_MODEL = None

def load_resources():
    global VOCAB, RECIPE_DB, DETECTION_MODEL
    try:
        with open(JSON_FILE, 'r') as f:
            RECIPE_DB = json.load(f)
        VOCAB = sorted(list({ing['name'].strip().upper() for r in RECIPE_DB for ing in r['ingredients']}))
        
        # Using SAHI + YOLOv8-world for maximum accuracy on small items
        DETECTION_MODEL = AutoDetectionModel.from_pretrained(
            model_type='ultralytics', 
            model_path='yolov8s-world.pt',
            confidence_threshold=0.15, # Optimized for pantry items
            device="cpu"
        )
        DETECTION_MODEL.model.set_classes(VOCAB)
        DETECTION_MODEL.category_mapping = {str(i): name for i, name in enumerate(VOCAB)}
    except Exception as e:
        print(f"Init Error: {e}")

load_resources()

def get_weather(lat, lon):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    try:
        data = requests.get(url, timeout=5).json()
        temp = data.get('main', {}).get('temp', 25)
        season = "SUMMER" if temp > 30 else "SPRING" if temp > 20 else "WINTER"
        return {
            "temp": round(temp), 
            "condition": data.get('weather', [{}])[0].get('main', 'Clear'), 
            "season": season,
            "city": data.get('name', 'Your Area')
        }
    except:
        return {"temp": 25, "condition": "Clear", "season": "SPRING", "city": "Default"}

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        lat, lon = request.form.get('lat', 26.4499), request.form.get('lon', 75.8175)
        found = {}
        file = request.files.get('image')
        
        # SAHI Vision Processing for high accuracy
        if file:
            img = Image.open(file.stream).convert("RGB")
            result = get_sliced_prediction(
                np.array(img), 
                DETECTION_MODEL, 
                slice_height=512, 
                slice_width=512,
                overlap_height_ratio=0.2 # Ensures ingredients on edges aren't missed
            )
            for p in result.object_prediction_list:
                found[p.category.name.upper()] = 1
        
        text_input = request.form.get('text', "")
        if text_input:
            for item in text_input.split(','):
                found[item.strip().upper()] = 1

        weather = get_weather(lat, lon)
        matches = []

        for recipe in RECIPE_DB:
            req = {i['name'].strip().upper() for i in recipe['ingredients']}
            have = list(set(found.keys()).intersection(req))
            base_score = len(have) / len(req) if req else 0
            
            if base_score > 0:
                # Add Season Match Accuracy Bonus
                is_seasonal = weather['season'] in [s.upper() for s in recipe.get('season', [])]
                final_score = min(base_score + (0.1 if is_seasonal else 0), 1.0)
                
                matches.append({
                    "title": recipe['title'],
                    "score": final_score,
                    "have": [h.capitalize() for h in have],
                    "missing": [m.capitalize() for m in list(req - set(have))],
                    "method": " ".join(recipe['Method']) if isinstance(recipe['Method'], list) else recipe['Method']
                })

        # Rank by match percentage
        top = sorted(matches, key=lambda x: x['score'], reverse=True)[0] if matches else None

        return jsonify({"top_recipe": top, "weather_info": weather})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
