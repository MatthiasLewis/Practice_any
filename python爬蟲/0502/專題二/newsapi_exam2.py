from newsapi import NewsApiClient
import json
import pymongo

#武漢肺炎-外遇沒資料>_>
newsapi=NewsApiClient(api_key="bbdd0d7a8f44488b9c71a6ea9dd3c3f9")
response = newsapi.get_everything(q='武漢肺炎',sources=None,sort_by='publishedAt',page_size=100)
#將data一一放入exam_2.json及mongodb中
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['testing']
mycol = mydb['news_api']
with open ("exam_2.json","w",encoding='utf-8') as f:
  for i in range(len(response['articles'])):                     
    json.dump(response['articles'][i],f,ensure_ascii=False)
    mycol.insert_one(response['articles'][i])
    if i+1 == len(response['articles']):
      break
    f.write(",") 




