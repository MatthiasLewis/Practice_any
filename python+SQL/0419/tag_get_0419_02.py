from bs4 import BeautifulSoup

with open ("input.html","r") as f:
    soup =  BeautifulSoup(f,"html.parser")
data = soup.select("#link1")[0].text
print(data)
