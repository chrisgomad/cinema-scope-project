import pytest
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from webdriver_manager.firefox import GeckoDriverManager
from webdriver_manager.microsoft import EdgeChromiumDriverManager

def pytest_addoption(parser):
    parser.addoption(
        "--browser_name", action="store", default="chrome"
    )

@pytest.fixture(scope="class")
def setup(request):
    
    browser_name = request.config.getoption("browser_name")
    if browser_name == "chrome":
        options = webdriver.ChromeOptions()
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--log-level=3")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    elif browser_name == "firefox":
        options = webdriver.FirefoxOptions()
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--log-level=3")
        driver = webdriver.Firefox(executable_path=GeckoDriverManager().install(), options=options)
    elif browser_name == "edge":  # Add a condition for Edge
        options = webdriver.EdgeOptions()
        options.add_argument("--ignore-certificate-errors")
        options.add_argument("--log-level=3")
        driver = webdriver.Edge(executable_path=EdgeChromiumDriverManager().install(), options=options)
    else:
        raise pytest.UsageError("--browser_name should be chrome or firefox")

    driver.get('https://www.imdb.com/')
    driver.maximize_window()
    driver.implicitly_wait(4)
    request.cls.driver = driver
    yield
    driver.close()