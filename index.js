// index.js
const axios = require("axios");

class HttpClient {
  constructor(baseURL) {
    this.client = axios.create({ baseURL });
    this.cache = new Map();
  }
  
  async get(url, options = {}) {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }
    const data = await this.request({ method: 'GET', url, ...options });
    this.cache.set(url, data);
    return data;
  }

  async get(url, options = {}) {
    return this.request({ method: "GET", url, ...options });
  }

  async post(url, data, options = {}) {
    return this.request({ method: "POST", url, data, ...options });
  }

  async put(url, data, options = {}) {
    return this.request({ method: "PUT", url, data, ...options });
  }

  async delete(url, options = {}) {
    return this.request({ method: "DELETE", url, ...options });
  }

  async request(options, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await this.client(options);
        this.logRequest(options, response);
        return response.data;
      } catch (error) {
        this.logError(options, error);
        if (i === retries - 1) throw error;
      }
    }
  }

  logRequest(options, response) {
    console.log(`[Request] ${options.method.toUpperCase()} ${options.url}`);
    console.log(`[Response] ${response.status} ${response.statusText}`);
  }

  logError(options, error) {
    console.error(`[Request] ${options.method.toUpperCase()} ${options.url}`);
    if (error.response) {
      console.error(
        `[Error] ${error.response.status} ${error.response.statusText}`
      );
    } else {
      console.error(`[Error] ${error.message}`);
    }
  }
}

module.exports = HttpClient;
