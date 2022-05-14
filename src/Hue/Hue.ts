import { promises as fs } from 'fs';
import config from '../config';
import { BridgeAuthenticationCredentials, HueLightState, Lights, MappedHueLight } from './API';

export type HueConfig = {
  cachePath: string;
  excludedLightIds: string[];
  bridge: BridgeAuthenticationCredentials;
  state: {
    dimmed: HueLightState;
  };
};

const Hue = new (class Hue {
  public async dimLights(): Promise<void> {
    const lights = await Lights.fetchAll();
    await this.writeToCache(lights);
    await Promise.all(
      lights.map((light) =>
        Lights.update({
          ...light,
          state: {
            ...light.state,
            ...config.state.dimmed,
          },
        }),
      ),
    );
  }

  public async restoreLights(): Promise<void> {
    const storedLights = await this.readLightsFromCache();
    await Promise.all(storedLights.map(Lights.update));
  }

  public async writeToCache(lights: MappedHueLight[]): Promise<void> {
    return fs.writeFile(config.cachePath, JSON.stringify(lights), 'utf-8');
  }

  public async readLightsFromCache(): Promise<MappedHueLight[]> {
    const rawState = await fs.readFile(config.cachePath, 'utf-8');
    return JSON.parse(rawState) as MappedHueLight[];
  }
})();

export default Hue;
