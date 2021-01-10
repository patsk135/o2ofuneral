import requests
import json
from datetime import datetime

url = "https://openapi-sandbox.kasikornbank.com/v1/qrpayment/inquiry"

bearer_token = "mL9JoaTzJqAmAsfkzlSAZmh4aFWo"

headers = {
    "Authorization": "Bearer {}".format(bearer_token),
    "Content-Type": "application/json",
    "x-test-mode": "true",
    "env-id": "QR004"
}

print(headers)

# Partner ID, Partner Secret, Merchant ID จะได้รับในขั้นตอนกระบวนการ UAT และ Production
origPartnerTxnUid = "PARTNERTEST0001"
partnerId = "PTR1051673"
partnerSecret = "d4bded59200547bc85903574a293831b"
now = datetime.now().astimezone().replace(microsecond=0).isoformat()
# print(now)
merchantId = "KB102057149704"

body = {
    "partnerTxnUid": "PARTNERTEST0002",
    "partnerId": "{}".format(partnerId),
    "partnerSecret": "{}".format(partnerSecret),
    "requestDt": "{}".format(now),
    "merchantId": "{}".format(merchantId),
    "origPartnerTxnUid": "{}".format(origPartnerTxnUid)
}

body2 = {
  "merchantId": "KB102057149704",
  "origPartnerTxnUid": "PARTNERTEST0001",
  "partnerId": "PTR1051673",
  "partnerSecret": "d4bded59200547bc85903574a293831b",
  "partnerTxnUid": "PARTNERTEST0002",
  "requestDt": "2021-01-02T23:14:15+07:00"
}

# print(json.dumps(body))
# print(body2)

res = requests.post(url=url, data=json.dumps(body), headers=headers)

print(res.text)