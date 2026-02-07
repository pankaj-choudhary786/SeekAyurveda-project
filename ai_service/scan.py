import json
import requests
import io
import os
import numpy as np
from PIL import Image
from sahi import AutoDetectionModel 
from sahi.predict import get_sliced_prediction

JSON_FILE = "ayur_pantry.json"
IMAGE_INPUT = "https://media.gettyimages.com/id/86056648/photo/contents-of-a-refrigerator.jpg?s=612x612&w=gi&k=20&c=3IVcnQnoAf5j1drpIkOXsyvTBUMw9aSshLts-SA_WGo=" 
CITY_NAME = "Kota"
API_KEY = "d35ded53f6848bbb681eb07774bc673a" 

def load_ayurvedic_data(file_path):
    if not os.path.exists(file_path):
        print(f" Error: {file_path} not found!")
        return [], []
    with open(file_path, 'r') as f:
        recipes = json.load(f)
    vocab = sorted(list({ing['name'].strip().upper() for r in recipes for ing in r['ingredients']}))
    return vocab, recipes

def get_image_as_numpy(source):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
    if source.startswith(('http://', 'https://')):
        try:
            response = requests.get(source, headers=headers, timeout=10)
            img = Image.open(io.BytesIO(response.content)).convert("RGB")
            return np.array(img)
        except Exception as e:
            print(f" Image Download Error: {e}")
            return None
    return np.array(Image.open(source).convert("RGB"))

def get_weather_data():
    url = f"http://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY}&units=metric"
    try:
        data = requests.get(url, timeout=5).json()
        temp = data['main']['temp']
        
        season = "SUMMER" if temp > 30 else "SPRING" if temp > 20 else "AUTUMN-WINTER"
        return {"temp": temp, "desc": data['weather'][0]['description'], "season": season}
    except:
        return {"temp": "N/A", "desc": "Unknown", "season": "SPRING"}

def detect_ingredients(image_array, ingredient_list):
    detection_model = AutoDetectionModel.from_pretrained(
        model_type='ultralytics',
        model_path='yolov8s-world.pt',
        confidence_threshold=0.10, 
        device="cpu"
    )
    detection_model.model.set_classes(ingredient_list)
    detection_model.category_mapping = {str(i): name for i, name in enumerate(ingredient_list)}

    result = get_sliced_prediction(
        image_array,
        detection_model,
        slice_height=512,
        slice_width=512,
        overlap_height_ratio=0.2
    )

    found = {}
    for prediction in result.object_prediction_list:
        name = prediction.category.name.upper()
        found[name] = found.get(name, 0) + 1
    return found

def generate_detailed_report(detected, recipes, weather):
    print(f"\n" + "="*65)
    print(f"🌿 SEEK AYURVEDA: DETAILED PANTRY & RECIPE INTELLIGENCE 🌿")
    print(f"="*65)
    print(f"Location: {CITY_NAME} | Temp: {weather['temp']}°C ({weather['desc']})")
    print(f"Current Season Context: {weather['season']}")
    print(f"-"*65)

    if not detected:
        print("No Ayurvedic ingredients identified. Try a clearer photo.")
        return

    print(f" DETECTED INVENTORY ({len(detected)} items):")
    for item, count in detected.items():
        benefit = "Natural Balancer"
        for r in recipes:
            for i in r['ingredients']:
                if i['name'].upper() == item:
                    benefit = i.get('benefit', benefit)
                    break
        print(f" • {item.ljust(18)} | Count: {count} | {benefit}")

    print(f"\n" + "="*65)
    print(f"TOP 8 SUITABLE RECIPES [ Ranked by Match in (%) ]")
    print(f"="*65)

    current_season = weather['season'].upper()
    matches = []
    
    for recipe in recipes:
        
        recipe_seasons = [s.strip().upper() for s in recipe.get('season', [])]
        req_set = {i['name'].strip().upper() for i in recipe['ingredients']}
        detected_set = set(detected.keys())
        
        have = list(detected_set.intersection(req_set))
        missing = list(req_set - detected_set)
        
        score = len(have) / len(req_set) if req_set else 0
        if score > 0:
            matches.append({
                "title": recipe['title'],
                "score": score,
                "have": have,
                "missing": missing,
                "method": recipe['Method'],
                "is_seasonal": current_season in recipe_seasons
            })

    sorted_matches = sorted(matches, key=lambda x: (x['score'], x['is_seasonal']), reverse=True)

    for i, res in enumerate(sorted_matches[:8], 1):
        match_pct = int(res['score']*100)
    
        tag = "SEASONAL MATCH" if res['is_seasonal'] else " ALL-SEASON / NEUTRAL"
        
        print(f"\n{i}. {res['title'].upper()}")
        print(f"   Score: {match_pct}% | {tag}")
        print(f"   We Have: {', '.join(res['have'])}")
        print(f"   Need further: {', '.join(res['missing']) if res['missing'] else 'None (Ready!)'}")
        print(f"   Recipe: {res['method'][:140]}...")

if __name__ == "__main__":
    vocab, recipe_db = load_ayurvedic_data(JSON_FILE)
    img_data = get_image_as_numpy(IMAGE_INPUT)
    if img_data is not None:
        weather_info = get_weather_data()
        found_ings = detect_ingredients(img_data, vocab)
        generate_detailed_report(found_ings, recipe_db, weather_info)
