from newsapi import NewsApiClient
import json
#武漢肺炎-外遇沒資料>_>
newsapi=NewsApiClient(api_key="bbdd0d7a8f44488b9c71a6ea9dd3c3f9")
response = newsapi.get_everything(q='武漢肺炎',sources=None,sort_by='publishedAt',page_size=100)

with open ("exam_2.json","a",encoding='utf-8') as f:
  for i in response['articles']:                      
    json.dump(i,f,ensure_ascii=False)
    f.write(",")

