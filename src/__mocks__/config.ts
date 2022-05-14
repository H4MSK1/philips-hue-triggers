import { HueConfig } from '@/Hue';

export default {
  cachePath: 'lights_state.json',
  bridge: {
    network: '0.0.0.0',
    username: 'api-user',
  },
  excludedLightIds: [],
  state: {
    dimmed: {
      sat: 199,
      bri: 90,
      hue: 7676,
    },
  },
} as HueConfig;
