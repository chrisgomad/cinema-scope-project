from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


options = Options()
options.add_argument("--ignore-certificate-errors")
options.add_argument("--log-level=3")
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)
driver.implicitly_wait(4)
driver.get('https://www.imdb.com/')

driver.find_element(By.ID, "suggestion-search").send_keys("Dune")
wait = WebDriverWait(driver, 10)
wait.until(expected_conditions.presence_of_element_located((By.LINK_TEXT, "Dune: Part Two")))
driver.find_element(By.XPATH, "//div[contains(text(),'Dune: Part Two')]").click()