import { parseArguments } from './ArgumentParser';
import Hue from './Hue';
import { LightSwitchState } from './Hue/API';

(async () => {
  const { state } = parseArguments();
  switch (state) {
    case LightSwitchState.ON:
      await Hue.restoreLights();
      break;

    case LightSwitchState.OFF:
      await Hue.dimLights();
      break;

    default:
      console.error('Switch state is not one of', Object.values(LightSwitchState));
  }

  process.exit();
})();
