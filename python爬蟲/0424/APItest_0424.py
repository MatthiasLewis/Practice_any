import requests
import json

signup = {"email":"kk159@gmail.com","username":"iii","password":"123456789","cfm_password":"123456789"}
headers = {"Accept":"application/json"}
response_1 = requests.post("https://beta-eid-backend.townway.com.tw/accounts/signup",signup,headers = headers)
print(response_1.json())

signin = {"email":"kk159@gmail.com","password":"123456789"}
response_2 = requests.post("https://beta-eid-backend.townway.com.tw/accounts/signin",signin,headers = headers)
print(response_2.json())

with open ("signin_token.json","w") as f:
    json.dump(response_2.json(),f)
with open ("signup_token.json","w") as f:
    json.dump(response_1.json(),f)


