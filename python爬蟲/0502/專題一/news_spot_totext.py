import json
from bs4 import BeautifulSoup
import requests
import time

with open("Exam1_1.json","r",encoding="utf8") as f:
    file = json.load(f)

for i in range(0,8):
    res = requests.get(file[i]["sum_title_url"])
    res = res.text
    soup = BeautifulSoup(res,"html.parser")
    content_all = soup.find("div",class_="indent").find_all("p")
    with open (f"sum_{file[i]['category']}_{file[i]['sum_title'][0:4]}.txt","w",encoding="utf8") as f1:
        for p in content_all:
          json.dump(p.text,f1,ensure_ascii=False)
          f1.write("\n")
    time.sleep(4)

    spot_con = file[i]["spotlist"]
    for s in range(0,3):
        res = requests.get(spot_con[s]["url"])
        res = res.text
        soup = BeautifulSoup(res,"html.parser")
        content_all = soup.find("div",class_="indent").find_all("p")
        with open (f"spot_{file[i]['category']}_{spot_con[s]['title'][0:4]}.txt","w",encoding="utf8") as f1:
          for p in content_all:
            json.dump(p.text,f1,ensure_ascii=False)
            f1.write("\n")
        time.sleep(4)



