from bs4 import BeautifulSoup

with open("input.html","r") as f:
    soup = BeautifulSoup(f,"html.parser")
result = soup.find_all(name=["a","p"])
for i in result:
    print(i.text)




