from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import sqlite3
import schedule
import time
import datetime

def store_popularity_rank():
    options = Options()
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--log-level=3")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.implicitly_wait(4)
    
    driver.get('https://www.imdb.com/')
    driver.find_element(By.ID, "suggestion-search").send_keys("Dune")
    wait = WebDriverWait(driver, 5)
    wait.until(expected_conditions.presence_of_element_located((By.LINK_TEXT, "Dune: Part Two")))
    driver.find_element(By.XPATH, "//div[contains(text(),'Dune: Part Two')]").click()
    popRank = driver.find_element(By.CSS_SELECTOR, "div[class='sc-3a4309f8-0 bjXIAP sc-b7c53eda-1 iIQkEw'] div[class='sc-5f7fb5b4-1 fTREEx']").text
    
    now = datetime.datetime.now()
    current_date = now.strftime("%Y-%m-%d %H:%M:%S")
    conn = sqlite3.connect('movie_database.db')
    c = conn.cursor()
    c.execute("CREATE TABLE IF NOT EXISTS movies (id INTEGER PRIMARY KEY, name TEXT, popularity INTEGER, date TEXT)")
    c.execute("INSERT INTO movies (name, popularity, date) VALUES (?,?,?)", ('Dune: Part Two', popRank, current_date))

    conn.commit()
    conn.close()

# while True:
    schedule.run_pending()
    time.sleep(1)

def job():
    print("Storing Popularity rank...")
    store_popularity_rank()
schedule.every().week.do(job)
# schedule.every(10).seconds.do(job)  # For testing, run the job every 10 seconds 

while True:
    schedule.run_pending()
    # print("Inside the loop")  # This should print every second for testing purposes
    time.sleep(1)
