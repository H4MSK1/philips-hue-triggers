export enum LightSwitchState {
  ON = 'on',
  OFF = 'off',
}

export type HueLightState = {
  on?: boolean;
  bri?: number;
  hue?: number;
  sat?: number;
  effect?: string;
  xy?: number[];
  ct?: number;
  alert?: string;
  colormode?: string;
  mode?: string;
  reachable?: boolean;
};

export type MappedHueLight = {
  lightId: string;
  state: HueLightState;
};

export type HueLights = {
  [key: string]: {
    state: HueLightState;
  };
};

export interface LightsInterface {
  fetchAll(): Promise<MappedHueLight[]>;
  update(light: MappedHueLight): Promise<void>;
  isLightUpdateable({ lightId, state }: MappedHueLight): boolean;
}
