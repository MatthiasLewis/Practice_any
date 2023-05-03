import os
import openai
import json
#只印出找到的前2筆資料
openai.organization = "org-0c0gQUIr0PrFUAdg6geUSvhq"
openai.api_key = os.getenv("OPENAI_API_KEY")
api_list = openai.Model.list()
num = 0
for api in api_list["data"]:
    if "davinci" in api["id"]:
        print(api["id"])
        print(openai.Model.retrieve(api["id"]))
        num+=1
    if num ==2:
        break

