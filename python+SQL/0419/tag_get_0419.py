from bs4 import BeautifulSoup

with open ("input.html","r") as f:
    soup =  BeautifulSoup(f,"html.parser")
data = soup.find_all("a")
for i in data:
    data_attr = i.get("id")
    if data_attr  == "link1":
        print(i.text)
