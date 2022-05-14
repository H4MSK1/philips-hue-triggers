import { LightSwitchState } from './Hue/API';

enum SupportedArgument {
  state = 'state',
  // @todo: nightmodeEnabled = 'nightmodeEnabled',
}

type ArgumentsDictionary = {
  [SupportedArgument.state]?: LightSwitchState;
  // [SupportedArgument.nightmodeEnabled]?: boolean;
};

export const parseArguments = (): ArgumentsDictionary => {
  const args = process.argv.filter((arg) => arg.startsWith('--'));
  if (!args.length) {
    throw new Error('No arguments supplied.');
  }

  const parsedArguments: ArgumentsDictionary = {};
  args.forEach((rawArgument) => {
    const [key, value]: string[] = rawArgument.substring(2).split('=');

    switch (key) {
      case SupportedArgument.state:
        parsedArguments.state = value as LightSwitchState;
        break;

      // case SupportedArgument.nightmodeEnabled:
      //   parsedArguments.nightmodeEnabled = value === 'true';
      //   break;

      default:
        throw new Error(`Unsupported argument supplied: ${rawArgument}`);
    }
  });

  return parsedArguments;
};
