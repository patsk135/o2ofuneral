import requests
import json
from datetime import datetime

url = "https://openapi-sandbox.kasikornbank.com/v1/qrpayment/request"

bearer_token = "jyiHA3Amml0MeGtfRlxwstGXuuFp"

headers = {
    "Authorization": "Bearer {}".format(bearer_token),
    "Content-Type": "application/json",
    "x-test-mode": "true",
    "env-id": "QR002"
}

headers2 = {
    "Authorization": "Bearer lDhGhv80zuMbi2LXhiTgpxpMUEjX",
    "Content-Type": "application/json",
    "x-test-mode": "true",
    "env-id": "QR002"
}

print(headers)

# Partner ID, Partner Secret, Merchant ID จะได้รับในขั้นตอนกระบวนการ UAT และ Production

partnerId = "PTR1051673"
partnerSecret = "d4bded59200547bc85903574a293831b"
now = datetime.now().astimezone().replace(microsecond=0).isoformat()
# print(now)
merchantId = "KB102057149704"
amount = 2020

body = {
    "partnerTxnUid": "PARTNERTEST0001",
    "partnerId": "{}".format(partnerId),
    "partnerSecret": "{}".format(partnerSecret),
    "requestDt": "{}".format(now),
    "merchantId": "{}".format(merchantId),
    "qrType": "3",
    "txnAmount": "{}".format(amount),
    "txnCurrencyCode": "THB",
    "reference1": "INV001",
    "reference2": "HELLOWORLD",
    "reference3": "INV001",
    "reference4": "INV001"
}

body2 = {
  "partnerTxnUid": "PARTNERTEST0001",
  "partnerId": "PTR1051673",
  "partnerSecret": "d4bded59200547bc85903574a293831b",
  "requestDt": "2020-12-28T23:27:06+07:00",
  "merchantId": "KB102057149704",
  "qrType": "3",
  "txnAmount": "2020",
  "txnCurrencyCode": "THB",
  "reference1": "INV001",
  "reference2": "HELLOWORLD",
  "reference3": "INV001",
  "reference4": "INV001"
}

# print(json.dumps(body))
# print(body2)

res = requests.post(url=url, data=json.dumps(body), headers=headers)

print(res.text)