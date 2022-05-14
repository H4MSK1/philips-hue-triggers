import { parseArguments } from './ArgumentParser';
import { LightSwitchState } from './Hue/API';

describe('ArgumentParser', () => {
  let originalArgv: string[];

  beforeAll(() => {
    originalArgv = process.argv;
  });

  afterEach(() => {
    process.argv = originalArgv;
  });

  test('should raise an exception when given no arguments', () => {
    // Given
    process.argv = [];
    // Then, When
    expect(parseArguments).toThrow('No arguments supplied.');
  });

  test('should raise an exception when given invalid arguments', () => {
    // Given
    process.argv = ['my arg'];
    // Then, When
    expect(parseArguments).toThrow('No arguments supplied.');
  });

  test('should raise an exception when given unsupported arguments', () => {
    // Given
    process.argv = ['--something=value'];
    // Then, When
    expect(parseArguments).toThrow('Unsupported argument supplied: --something=value');
  });

  test('should successfully parse supported arguments', () => {
    // Given
    process.argv = ['--state=on'];
    // When
    const args = parseArguments();
    // Then
    expect(args.state).toEqual(LightSwitchState.ON);
  });
});
