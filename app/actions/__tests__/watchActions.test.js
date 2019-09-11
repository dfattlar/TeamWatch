import * as actions from '../watchActions';

describe('Watch Actions', () => {
  it('should create an action to start the watch', () => {
    Date.now = jest.fn().mockReturnValue(10);
    expect(actions.startWatch()).toMatchSnapshot();
    jest.resetAllMocks();
  });

  it('should create an action to stop the watch', () => {
    expect(actions.stopWatch()).toMatchSnapshot();
  });

  it('should create an action to reset all values on watch', () => {
    expect(actions.resetAll()).toMatchSnapshot();
  });

  it('should create an action to reset time values on watch', () => {
    expect(actions.resetTime()).toMatchSnapshot();
  });

  it('should create an action to reset time values on watch', () => {
    expect(actions.resetAthleteList()).toMatchSnapshot();
  });

  it('should create an action to open the modal', () => {
    expect(actions.closeModal()).toMatchSnapshot();
  });

  it('should create an action to add a split', () => {
    Date.now = jest.fn().mockReturnValue(10);
    const id = 'id_123';
    expect(actions.addSplit(id)).toMatchSnapshot();
    jest.resetAllMocks();
  });

  it('should create an action to change the mode (race,relay)', () => {
    const timerMode = 'MODE';
    expect(actions.modeChange(timerMode)).toMatchSnapshot();
  });

  it('should create an action to add history', () => {
    const watchData = {time: 0};
    expect(actions.addHistory(watchData)).toMatchSnapshot();
  });
});
