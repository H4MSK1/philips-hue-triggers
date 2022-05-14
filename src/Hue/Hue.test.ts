import { promises as fs } from 'fs';
import config from '../config';
import { mockMappedLights } from '../__mocks__/lights';
import { Lights, MappedHueLight } from './API';
import Hue from './Hue';

jest.mock('../config');
jest.mock('./API/Lights/Lights');
jest.mock('fs', () => ({
  promises: {
    writeFile: jest.fn(),
    readFile: jest.fn(),
  },
}));

describe('Hue', () => {
  let spyOnLightsUpdate: jest.SpyInstance<Promise<void>, [light: MappedHueLight]>,
    spyOnLightsFetchAll: jest.SpyInstance<Promise<MappedHueLight[]>>,
    spyOnFSWriteFile: jest.SpyInstance,
    spyOnFSReadFile: jest.SpyInstance;

  beforeEach(() => {
    spyOnLightsFetchAll = jest.spyOn(Lights, 'fetchAll').mockResolvedValue(mockMappedLights);
    spyOnLightsUpdate = jest.spyOn(Lights, 'update');

    spyOnFSWriteFile = jest.spyOn(fs, 'writeFile');
    spyOnFSReadFile = jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(mockMappedLights));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should write a JSON encoded string to cache with the correct parameters', async () => {
    // When
    await Hue.writeToCache(mockMappedLights);
    // Then
    expect(spyOnFSWriteFile).toHaveBeenCalledTimes(1);
    expect(spyOnFSWriteFile).toHaveBeenCalledWith(config.cachePath, JSON.stringify(mockMappedLights), 'utf-8');
  });

  it('should read from cache with the correct parameters', async () => {
    // When
    await Hue.readLightsFromCache();
    // Then
    expect(spyOnFSReadFile).toHaveBeenCalledTimes(1);
    expect(spyOnFSReadFile).toHaveBeenCalledWith(config.cachePath, 'utf-8');
  });

  it('should dim lights that are turned "on" and cache fetched lights', async () => {
    // When
    await Hue.dimLights();
    // Then
    expect(spyOnFSWriteFile).toHaveBeenCalledTimes(1);
    expect(spyOnLightsFetchAll).toHaveBeenCalledTimes(1);
    expect(spyOnLightsUpdate).toHaveBeenCalledTimes(mockMappedLights.length);
  });

  it('should restore dimmed lights state that are turned "on" from cache', async () => {
    // When
    await Hue.restoreLights();
    // Then
    expect(spyOnFSReadFile).toHaveBeenCalledTimes(1);
    expect(spyOnLightsUpdate).toHaveBeenCalledTimes(mockMappedLights.length);
  });
});
