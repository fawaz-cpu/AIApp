const fetch = require('node-fetch');

class AIProcessor {
  constructor(baseUrl, apiKey){
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.headers = { "Authorization": apiKey, "Content-Type": "application/json" };
  }

  async process({template=null, description=null, data=null, response_schema=null, options=null} = {}){
    const res = await fetch(`${this.baseUrl}/v1/process`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({template, description, data, response_schema, options})
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async getJob(jobId){
    const res = await fetch(`${this.baseUrl}/v1/jobs/${jobId}`, { headers: this.headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
}

module.exports = AIProcessor;
