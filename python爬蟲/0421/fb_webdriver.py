from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import time

options = webdriver.ChromeOptions()
options.add_argument("incognito")

driver = webdriver.Chrome(options = options)
driver.get("https://www.facebook.com")

fb_login_email = input("login_email :")
fb_login_pw = input("login_pw :")
target_url = "https://www.facebook.com/groups/pythontw"

driver.find_element(By.ID,"email").send_keys(fb_login_email)
driver.find_element(By.ID,"pass").send_keys(fb_login_pw)
sub = driver.find_element(By.NAME,"login")
sub.submit()
time.sleep(5)

driver.get(target_url)
soup = BeautifulSoup(driver.page_source,"html.parser")

time.sleep(3)
for x in range(1, 3):
    driver.execute_script("window.scrollTo(0,document.body.scrollHeight)")
    time.sleep(2)

block_list = soup.find_all("div",{"dir":"auto"})
for i in block_list:
    print(i.text)
    print("─"*15)






