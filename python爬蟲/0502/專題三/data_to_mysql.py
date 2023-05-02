from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import pickle
import auto_to_mysql

options = webdriver.ChromeOptions()
options.add_argument("headless",)

driver = webdriver.Chrome(options = options)
driver.get("https://gogakuru.com/english/phrase/genre/180_%E5%88%9D%E7%B4%9A%E3%83%AC%E3%83%99%E3%83%AB.html?layoutPhrase=1&orderPhrase=1&condMovie=0&flow=enSearchGenre&condGenre=180&perPage=50")

db = auto_to_mysql.connectsql("test")

table = auto_to_mysql.createtable("exam3",db,["ID int AUTO_INCREMENT" , "content varchar(255)", "PRIMARY KEY(ID)"])
f1 = open ("exam_3.txt","a")
f2 = open ("exam_3_1.pickle","a")
content1 = driver.find_elements(By.CLASS_NAME, "font-en")

for i in range(len(content1)):
  content2 = content1[i].text
  f1.write(content2+"\n")
  f2.write(content2+"\n")
  a=i+1
  auto_to_mysql.inserttable("exam3",db,[a , content2])

f1.close()
f2.close()
auto_to_mysql.close(db)





