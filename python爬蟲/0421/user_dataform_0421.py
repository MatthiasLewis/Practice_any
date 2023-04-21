from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

driver = webdriver.Chrome()
driver.get("file:/home/admin1/user_dataform.html")

name = driver.find_element(By.NAME, "username").send_keys("Leo")
pw = driver.find_element(By.NAME, "password").send_keys("123")

result_form = driver.find_element(By.NAME,"continue")
result_form.submit()

time.sleep(10)
