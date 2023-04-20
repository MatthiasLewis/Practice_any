import requests
from bs4 import BeautifulSoup

response = requests.get("https://travel.ettoday.net/category/%E5%8F%B0%E5%8C%97/")
response_1 = response.text
soup = BeautifulSoup(response_1,"html.parser")

data_h3_a = soup.find_all("a",class_="pic")

for i in data_h3_a:
    print(i.findNextSibling("h3").find("a").text)
    print(" ")

for i in data_h3_a:
    data_p = i.findNextSibling(class_="summary")
    if data_p is None:
        continue
    data_em = data_p.find("em")
    if  data_em is None:
        print(data_p.text)    
    else:
        data_em.extract()
        print(data_p.text)

