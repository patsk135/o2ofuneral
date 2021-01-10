import requests
import base64

consumer_id = "YhBexaJXskrk42JkKv7FBp7sUYLlI4be"
consumer_secret = "bviCfpIaqluvw7K6"

credential = consumer_id + ':' + consumer_secret
# print("credential", credential)

encoded_credential = base64.b64encode(credential.encode('ascii')).decode('ascii')
# print("encoded_credential", encoded_credential)

url = "https://openapi-sandbox.kasikornbank.com/oauth/token"

headers = {
    "Authorization": "Basic {}".format(encoded_credential),
    "Content-Type": "application/x-www-form-urlencoded",
    "env-id": "OAUTH2",
    "x-test-mode": "true"
}
# print(headers)

body = {
    "grant_type": "client_credentials"
}

res = requests.post(url=url, headers=headers, data=body)

json_res = res.json()

access_token = json_res['access_token']

print(json_res)
print(access_token)
