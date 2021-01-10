import requests
import base64
import json

url = "https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token"

headers = {
    "Content-Type": "application/json",
    "resourceOwnerId": "l7598f87d10be84c89928a5e5ae3418c40",
    "requestUId": "AUTHTEST01"
}

body = {
    "applicationKey" : "l7598f87d10be84c89928a5e5ae3418c40",
    "applicationSecret" : "8cd0257268d346fcb8f54230c6e61525"
}

res = requests.post(url=url, headers=headers, data=json.dumps(body))

json_res = res.json()

accessToken = json_res['data']['accessToken']

print(json_res)
print(accessToken)
