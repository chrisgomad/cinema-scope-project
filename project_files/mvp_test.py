from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options


options = Options()
options.add_argument("--ignore-certificate-errors")
driver = webdriver.Chrome(options=options)
driver.implicitly_wait(4)
driver.get('https://inventory-app-68xx.onrender.com/')

driver.find_element(By.XPATH, "//div[@class='MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault css-1llrwy8']").click() # this line will click the top icon and on the login button to login.
