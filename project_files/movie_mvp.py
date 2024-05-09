from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import schedule
import time
import datetime
from data_storage import store_popularity_rank


def get_popularity_rank():
    options = Options()
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--log-level=3")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    driver.get('https://www.imdb.com/')
    driver.maximize_window()
    driver.implicitly_wait(4)

    driver.find_element(By.ID, "suggestion-search").send_keys("Dune")
    wait = WebDriverWait(driver, 5)
    wait.until(expected_conditions.presence_of_element_located((By.LINK_TEXT, "Dune: Part Two")))
    driver.find_element(By.XPATH, "//div[contains(text(),'Dune: Part Two')]").click()
    popRank = driver.find_element(By.CSS_SELECTOR, "div[class='sc-3a4309f8-0 bjXIAP sc-b7c53eda-1 iIQkEw'] div[class='sc-5f7fb5b4-1 fTREEx']").text
    wait.until(expected_conditions.presence_of_element_located((By.CSS_SELECTOR, "div[class='sc-3a4309f8-0 bjXIAP sc-b7c53eda-1 iIQkEw'] div[class='sc-5f7fb5b4-1 fTREEx']")))
    now = datetime.datetime.now()
    current_date = now.strftime("%Y-%m-%d %H:%M:%S")

    store_popularity_rank('Dune: Part Two', popRank, current_date)


def job():
    print("Storing Popularity rank...")
    get_popularity_rank()

def run_schedule():
    # schedule.every().week.do(job)
    schedule.every(10).seconds.do(job)  # For testing, run the job every 10 seconds 

    while True:
        schedule.run_pending()
        print("Inside the loop")  # This should print every second for testing purposes
        time.sleep(1)

if __name__=="__main__":
    run_schedule()

