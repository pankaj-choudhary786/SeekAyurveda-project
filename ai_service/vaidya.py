import json
import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


# -------------------------------------------------
# SCRAPE PROFILE PAGE
# -------------------------------------------------
def scrape_profile_details(driver, wait):

    data = {
        "name": "",
        "email": "",
        "contact": "",
        "gender": "",
        "registration_details": [],
        "work_details": []
    }

    wait.until(EC.presence_of_element_located((By.TAG_NAME, "p")))

    paragraphs = driver.find_elements(By.TAG_NAME, "p")
    bullets = driver.find_elements(By.TAG_NAME, "li")

    for p in paragraphs:
        txt = p.text.strip()

        if txt and data["name"] == "":
            data["name"] = txt

        if "Email ID:" in txt:
            data["email"] = txt.replace("Email ID:", "").strip()

        if "Contact Number:" in txt:
            data["contact"] = txt.replace("Contact Number:", "").strip()

        if "Gender:" in txt:
            data["gender"] = txt.replace("Gender:", "").strip()

    for li in bullets:
        text = li.text.strip()

        if "Board of" in text:
            data["registration_details"].append(text)
        else:
            data["work_details"].append(text)

    return data


# -------------------------------------------------
# MAIN SCRIPT
# -------------------------------------------------
def run_scraper():

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")

    driver = webdriver.Chrome(
        service=Service(ChromeDriverManager().install()),
        options=options
    )

    wait = WebDriverWait(driver, 30)
    doctors = []

    try:
        # -------------------------
        # OPEN SITE
        # -------------------------
        driver.get("https://hpr.abdm.gov.in/en")

        # -------------------------
        # CLICK KNOW YOUR DOCTOR
        # -------------------------
        know_btn = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//button[contains(.,'Know Your Doctor')]"
        )))
        driver.execute_script("arguments[0].click();", know_btn)
        time.sleep(2)

        # -------------------------
        # HEALTH PROFESSIONAL → DOCTOR
        # -------------------------
        hp = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//p[text()='Health Professional']/following::input[1]"
        )))
        hp.click()
        hp.send_keys("Doctor")
        time.sleep(3)
        hp.send_keys(Keys.ARROW_DOWN)
        hp.send_keys(Keys.ENTER)

        # -------------------------
        # SYSTEM → AYURVEDA
        # -------------------------
        sys = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//p[text()='System of Medicine']/following::input[1]"
        )))
        sys.click()
        sys.send_keys("Ayurveda")
        time.sleep(3)
        sys.send_keys(Keys.ARROW_DOWN)
        sys.send_keys(Keys.ENTER)

        # -------------------------
        # STATE → PUNJAB
        # -------------------------
        state = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//p[text()='State']/following::input[1]"
        )))
        state.click()
        state.send_keys("Punjab")
        time.sleep(3)
        state.send_keys(Keys.ARROW_DOWN)
        state.send_keys(Keys.ENTER)
        time.sleep(10)

        # -------------------------
        # DISTRICT → AMRITSAR
        # -------------------------
        dist = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//p[text()='District']/following::input[1]"
        )))
        dist.click()
        dist.send_keys("Amritsar")
        time.sleep(10)
        dist.send_keys(Keys.ARROW_DOWN)
        dist.send_keys(Keys.ENTER)

        # -------------------------
        # SEARCH
        # -------------------------
        search_btn = wait.until(EC.element_to_be_clickable((
            By.XPATH, "//button[contains(.,'Search')]"
        )))
        driver.execute_script("arguments[0].click();", search_btn)

        # -------------------------
        # WAIT FOR CARDS
        # -------------------------
        wait.until(EC.presence_of_element_located((
            By.XPATH, "//button[contains(.,'View Profile')]"
        )))

        # -------------------------
        # OPEN EACH PROFILE
        # -------------------------
        total = len(driver.find_elements(By.XPATH, "//button[contains(.,'View Profile')]"))

        for i in range(total):

            buttons = driver.find_elements(By.XPATH, "//button[contains(.,'View Profile')]")
            driver.execute_script("arguments[0].click();", buttons[i])

            wait.until(EC.number_of_windows_to_be(2))
            driver.switch_to.window(driver.window_handles[1])

            profile = scrape_profile_details(driver, wait)
            doctors.append(profile)

            driver.close()
            driver.switch_to.window(driver.window_handles[0])

            time.sleep(10)

        print(f"Scraped {len(doctors)} profiles")

    except Exception as e:
        print("ERROR:", e)

    finally:
        with open("scraped_doctors.json", "w", encoding="utf-8") as f:
            json.dump(doctors, f, indent=4, ensure_ascii=False)

        driver.quit()
        print("Saved as scraped_doctors.json")


# -------------------------------------------------
# RUN
# -------------------------------------------------
if __name__ == "__main__":
    run_scraper()