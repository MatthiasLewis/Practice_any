from bs4 import BeautifulSoup

with open ("input.html","r") as f:
    soup =  BeautifulSoup(f,"html.parser")
data = soup.find_all("a",string = ["Elsie", "Lacie"])
print(data)
