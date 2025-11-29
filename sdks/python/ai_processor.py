import requests
import json

class AIProcessorClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip("/")
        self.headers = {"Authorization": api_key, "Content-Type": "application/json"}

    def process(self, template=None, description=None, data=None, response_schema=None, options=None):
        payload = {
            "template": template,
            "description": description,
            "data": data,
            "response_schema": response_schema,
            "options": options
        }
        r = requests.post(f"{self.base_url}/v1/process", headers=self.headers, json=payload, timeout=60)
        r.raise_for_status()
        return r.json()

    def get_job(self, job_id):
        r = requests.get(f"{self.base_url}/v1/jobs/{job_id}", headers=self.headers, timeout=30)
        r.raise_for_status()
        return r.json()
