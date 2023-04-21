import requests
from bs4 import BeautifulSoup
import curd_0420

response = requests.get("https://travel.ettoday.net/category/%E5%8F%B0%E5%8C%97/")
response_1 = response.text
soup = BeautifulSoup(response_1,"html.parser")
#connect mysql,create database
con = curd_0420.connectsql()
curd_0420.createdatabase("today_news",con)
curd_0420.close(con)
con = curd_0420.connectsql("today_news")
xxx = ["title varchar(255)","content varchar(255)"]
#create table
tablename = curd_0420.createtable("news",con,["title varchar(255)","content varchar(255)"])

data_h3_a = soup.find_all("a",class_="pic")
#insert into table
for i in data_h3_a:
    title_one = i.findNextSibling("h3").find("a").text
    data_p = i.findNextSibling(class_="summary")
    if data_p is None:
        data_p = "Null"
        curd_0420.inserttable(tablename,con,[title_one,data_p])
    else:    
        data_em = data_p.find("em")
        if data_em is not None:
            data_em.extract()
        data_p = data_p.text.strip()
        curd_0420.inserttable(tablename,con,[title_one,data_p])
#output table content
curd_0420.output(tablename,con)
curd_0420.close(con)


