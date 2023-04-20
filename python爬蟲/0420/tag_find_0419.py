from bs4 import BeautifulSoup
with open ("input.html","r") as f:
    soup = BeautifulSoup(f,"html.parser")
print(soup.find("p"))
print(soup.find(string = "This is paragraph ").findNextSiblings())
print(soup.find("p").findNext("p"))

