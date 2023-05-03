import os
import openai
openai.organization = "org-0c0gQUIr0PrFUAdg6geUSvhq"
openai.api_key = os.getenv("OPENAI_API_KEY")
api_list = openai.Model.list()
print(api_list)

#curl https://api.openai.com/v1/models \
#  -H "Authorization: Bearer $OPENAI_API_KEY" \
#  -H "OpenAI-Organization: org-IvId3dAhb1Aw4yaRNv8NT3sh"
