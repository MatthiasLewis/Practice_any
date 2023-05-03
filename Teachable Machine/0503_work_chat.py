import os
import openai
import requests

openai.organization = "org-0c0gQUIr0PrFUAdg6geUSvhq"
openai.api_key = os.getenv("OPENAI_API_KEY")

input("您好，歡迎使用客服機器人(請按 Enter 繼續...)")
print("請輸入您的退貨資訊")
a = input("訂單編號:")
b = input("姓名:")
c = input("地址:")
d = input("E-mail:")

header = {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ openai.api_key
        }


payload={"model":"gpt-3.5-turbo",
        "messages":[{
            "role":"assistant",
            "content":f"尊敬的客戶，您好！感謝您選擇我們的產品。很抱歉聽到您需要退貨。為了確保流程順暢，請您確認以下退貨明細：訂單編號：{a},消費者姓名：{b},退貨地址：{c},E-mail：{d},請您確認以上資訊是否正確，感謝您的合作。"}]}

url="https://api.openai.com/v1/chat/completions"
response = requests.post(url,headers=header,json=payload)

res = response.json()
print(res["choices"][0]["message"]["content"])


