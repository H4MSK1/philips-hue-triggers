import { HueConfig } from './Hue';

export default {
  cachePath: `${__dirname}/cache/lights.json`,
  bridge: {
    network: '',
    username: '',
  },
  excludedLightIds: ['7', '8'],
  state: {
    dimmed: {
      sat: 199,
      bri: 90,
      hue: 7676,
    },
  },
} as HueConfig;
