import requests
import json

url = "https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create"

accessToken = "555bd181-a7b1-4453-a3d3-5991ba5243e9"

headers = {
    "Content-Type": "application/json",
    "authorization": "Bearer {}".format(accessToken),
    "resourceOwnerId": "l7598f87d10be84c89928a5e5ae3418c40",
    "requestUId": "GENQRTEST002"
}

body = {
    "qrType": "PP",
    "ppType": "BILLERID",
    "ppId": "309476434823184",
    "amount": "1.35",
    "ref1": "REFERENCE001",
    "ref2": "REFERENCE002",
    "ref3": "CEE123"
}

res = requests.post(url=url, headers=headers, data=json.dumps(body))
json_res = res.json()

print(json_res)