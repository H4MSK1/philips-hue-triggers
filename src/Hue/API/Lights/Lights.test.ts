import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from '../../../config';
import { mockLightsApiResponse, mockMappedLights } from '../../../__mocks__/lights';
import Bridge from '../Bridge';
import { createAxiosMockAdapter } from '../Bridge/__mocks__/createAxiosMockAdapter';
import Lights from './Lights';
import { HueLightState } from './LightsInterface';

jest.mock('../../../config');

describe('Lights', () => {
  let spyBridgeHttpClient: jest.SpyInstance<AxiosInstance>, axiosMock: MockAdapter;

  beforeEach(() => {
    axiosMock = createAxiosMockAdapter(Bridge.getHttpClient());
    spyBridgeHttpClient = jest.spyOn(Bridge, 'getHttpClient');
  });

  afterEach(() => {
    axiosMock.reset();
    spyBridgeHttpClient.mockRestore();
    jest.clearAllMocks();
  });

  it('should fetch lights from the bridge with correct URL', async () => {
    // Given
    axiosMock.onGet('/lights').reply(200, mockLightsApiResponse);
    // When
    const response = await Lights.fetchAll();
    // Then
    expect(spyBridgeHttpClient).toHaveBeenCalledTimes(1);
    expect(axiosMock.history.get[0].url).toBe('/lights');
    expect(response).toHaveLength(2);
    expect(response).toEqual(mockMappedLights);
  });

  it('should update lights state that are switched "on" via the bridge with correct URL', async () => {
    // Given
    axiosMock.onPut(new RegExp('/lights/.*/state')).reply(200);
    const [light] = mockMappedLights;
    const newState: HueLightState = {
      bri: 20,
      sat: 20,
      hue: 20,
    };
    light.state = {
      ...light.state,
      ...newState,
    };
    // When
    await Lights.update(light);
    // Then
    expect(spyBridgeHttpClient).toHaveBeenCalledTimes(1);
    expect(axiosMock.history.put[0].url).toBe(`/lights/${light.lightId}/state`);
    expect(JSON.parse(axiosMock.history.put[0].data)).toMatchObject(newState);
  });

  it('should not update lights state that are switched "off"', async () => {
    // Given
    const [light] = mockMappedLights;
    light.state.on = false;
    // When
    await Lights.update(light);
    // Then
    expect(spyBridgeHttpClient).not.toHaveBeenCalled();
  });

  describe('isLightUpdateable', () => {
    it('should return false for lights that are switched "off"', async () => {
      // Given
      const [lightOne, lightTwo] = mockMappedLights;
      lightOne.state.on = true;
      lightTwo.state.on = false;
      // When, Then
      expect(Lights.isLightUpdateable(lightOne)).toBeTruthy();
      expect(Lights.isLightUpdateable(lightTwo)).toBeFalsy();
    });

    it('should return false for lights that are either in the excluded list or switched "off"', async () => {
      // Given
      const [lightOne, lightTwo] = mockMappedLights;
      lightOne.state.on = false;
      lightTwo.state.on = true;

      config.excludedLightIds.push(lightTwo.lightId);
      // When, Then
      expect(Lights.isLightUpdateable(lightOne)).toBeFalsy();
      expect(Lights.isLightUpdateable(lightTwo)).toBeFalsy();
    });
  });
});
