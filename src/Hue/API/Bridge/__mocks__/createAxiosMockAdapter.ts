import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const createAxiosMockAdapter = (instance: AxiosInstance) => {
  const mockAxios = new MockAdapter(instance);
  mockAxios.onGet('/test').reply(200);
  return mockAxios;
};
