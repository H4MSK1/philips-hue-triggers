import config from '../../../config';
import Bridge from '../Bridge';
import { HueLights, LightsInterface, MappedHueLight } from './LightsInterface';

const Lights = new (class Lights implements LightsInterface {
  public isLightUpdateable({ lightId, state }: MappedHueLight): boolean {
    const { excludedLightIds } = config;
    return !excludedLightIds.includes(lightId) && state.on === true;
  }

  public async fetchAll(): Promise<MappedHueLight[]> {
    const { data } = await Bridge.getHttpClient().get<HueLights>('/lights');
    return Object.entries(data).map<MappedHueLight>(([lightId, { state }]) => ({
      lightId,
      state,
    }));
  }

  public async update(light: MappedHueLight): Promise<void> {
    if (!this.isLightUpdateable(light)) {
      return;
    }

    const {
      lightId,
      state: { bri, hue, sat, effect, ct, colormode, xy },
    } = light;

    await Bridge.getHttpClient().put<MappedHueLight>(`/lights/${lightId}/state`, {
      bri,
      hue,
      sat,
      effect,
      ct,
      colormode,
      xy,
    });
  }
})();

export default Lights;
