import requests


url = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth"

payload = {
  'scope': 'SALUTE_SPEECH_PERS'
}
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': 'application/json',
  'RqUID': '9995ee0a-981c-41e1-8a99-efd7cad58cdd',
  'Authorization': 'Basic MTEyY2M0MTUtMWFjMC00ZWVmLWI4Y2EtNTU4ZmU5NjNhNTcyOmQyM2M5M2QwLTdjNDItNGU5ZC1iOWI4LTJmZTAzNzg1NTJiNg=='
}

response = requests.request("POST", url, headers=headers, data=payload, verify=False)

token = response.json()['access_token']
print('access_token: ' + token)


