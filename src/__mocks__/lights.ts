import { HueLights, MappedHueLight } from '@/Hue/API';

export const mockLightsApiResponse: HueLights = {
  'lamp-1': {
    state: {
      on: true,
      sat: 1,
      bri: 1,
      hue: 1,
    },
  },
  'lamp-2': {
    state: {
      on: false,
      sat: 0,
      bri: 0,
      hue: 0,
    },
  },
};

export const mockMappedLights: MappedHueLight[] = [
  {
    lightId: 'lamp-1',
    state: {
      on: true,
      sat: 1,
      bri: 1,
      hue: 1,
    },
  },
  {
    lightId: 'lamp-2',
    state: {
      on: false,
      sat: 0,
      bri: 0,
      hue: 0,
    },
  },
];
