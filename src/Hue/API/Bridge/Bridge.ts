import axios, { AxiosInstance } from 'axios';
import config from '../../../config';

export type BridgeAuthenticationCredentials = {
  network: string;
  username: string;
};

const bridge = new (class Bridge {
  private httpClient?: AxiosInstance;

  getHttpClient(): AxiosInstance {
    if (!this.httpClient) {
      const { network, username } = this.getAuthenticationCredentials();

      this.httpClient = axios.create({
        baseURL: `http://${network}/api/${username}`,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    return this.httpClient;
  }

  getAuthenticationCredentials(): BridgeAuthenticationCredentials {
    return config.bridge;
  }
})();

export default bridge;
