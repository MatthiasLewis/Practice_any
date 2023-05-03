import os
import openai
import requests

openai.organization = "org-0c0gQUIr0PrFUAdg6geUSvhq"
openai.api_key = os.getenv("OPENAI_API_KEY")

header = {
        "Content-Type": "application/json",
        "Authorization":"Bearer "+ openai.api_key
        }

payload={"model":"text-davinci-003",
        "prompt":"我想學",
        "temperature": 0.7,
        "max_tokens": 3000,
        "n":2,
        "suffix":"換工作"
        }
url="https://api.openai.com/v1/completions"
response = requests.post(url,headers=header,json=payload)
print(response.json())


