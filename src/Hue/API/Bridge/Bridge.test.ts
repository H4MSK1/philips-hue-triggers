import MockAdapter from 'axios-mock-adapter';
import config from '../../../config';
import Bridge from './Bridge';
import { createAxiosMockAdapter } from './__mocks__/createAxiosMockAdapter';

jest.mock('../../../config');

describe('Bridge', () => {
  let axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = createAxiosMockAdapter(Bridge.getHttpClient());
  });

  afterEach(() => {
    axiosMock.reset();
    jest.clearAllMocks();
  });

  it('should return bridge authentication credentials', () => {
    // When
    const credentials = Bridge.getAuthenticationCredentials();
    // Then
    expect(credentials.network).toEqual(config.bridge.network);
    expect(credentials.username).toEqual(config.bridge.username);
  });

  it('should make a request with correct axios config', async () => {
    // When
    const request = await Bridge.getHttpClient().get('/test');
    // Then
    expect(request.config.baseURL).toEqual(`http://${config.bridge.network}/api/${config.bridge.username}`);
    expect(request.config.headers).toHaveProperty('Content-Type', 'application/json; charset=utf-8');
  });
});
