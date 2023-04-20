import requests
from bs4 import BeautifulSoup
import curd_0420

response = requests.get("https://travel.ettoday.net/category/%E5%8F%B0%E5%8C%97/")
response_1 = response.text
soup = BeautifulSoup(response_1,"html.parser")

con = curd_0420.connectsql()
cur1 = con[0]
db1 = con[1]

data_h3_a = soup.find_all("a",class_="pic")

for i in data_h3_a:
    title_one = i.findNextSibling("h3").find("a").text
    data_p = i.findNextSibling(class_="summary")
    if data_p is None:
        data_p = "Null"
        curd_0420.inserttable(title_one,data_p,cur1,db1)
    else:    
        data_em = data_p.find("em")
        if data_em is not None:
            data_em.extract()
        data_p = data_p.text
        curd_0420.inserttable(title_one,data_p,cur1,db1)

curd_0420.output(cur1)
curd_0420.close(db1)


