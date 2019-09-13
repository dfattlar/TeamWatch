import reducer from '../watchReducer';
import * as types from '../../actions/actionTypes';
import {RACE, RELAY} from '../../constants';

const initialState = {
  watchRunning: false,
  startTime: null,
  stopTime: null,
  id: 0,
  currentColorId: 0,
  modalVisible: false,
  newAthlete: '',
  athletesArray: [],
  timerMode: RACE,
  lastRelaySplit: null,
  relayFinishTime: null,
  bestTime: 0,
  watchReset: false,
};

describe('watch reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle START_WATCH with no athletes', () => {
    expect(
      reducer(undefined, {
        type: types.START_WATCH,
      }),
    ).toMatchSnapshot();
  });

  it('should handle START_WATCH with athletes (clear total time)', () => {
    expect(
      reducer(
        {
          ...initialState,
          watchRunning: true,
          startTime: 999,
          athletesArray: [
            {name: 'ath1', totalTime: '111'},
            {name: 'ath2', totalTime: '222'},
          ],
          lastRelaySplit: undefined,
        },
        {
          type: types.START_WATCH,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle STOP_WATCH', () => {
    const stop = new Date('2019-05-14T11:01:58.135Z').valueOf();
    expect(
      reducer(undefined, {
        type: types.STOP_WATCH,
        stopTime: stop,
      }),
    ).toMatchSnapshot();
  });

  it('should handle STOP_WATCH and set athlete totalTime', () => {
    const stop = new Date('2019-05-14T11:01:58.135Z').valueOf();
    expect(
      reducer(
        {
          ...initialState,
          athletesArray: [
            {name: 'ath1', totalTime: 6, splits: [1, 2, 3]},
            {name: 'ath2', totalTime: 15, splits: [4, 5, 6]},
          ],
          startTime: 100,
          time: 22,
        },
        {
          type: types.STOP_WATCH,
          stopTime: stop,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle STOP_WATCH in Relay Mode', () => {
    const stop = new Date('2019-05-14T11:01:58.135Z').valueOf();
    expect(
      reducer(
        {
          ...initialState,
          timerMode: RELAY,
          startTime: 100,
          time: 25,
          athletesArray: [
            {name: 'ath1', totalTime: 6, splits: [1, 2, 3]},
            {name: 'ath2', totalTime: 15, splits: [4, 5, 6]},
            {name: 'ath3', totalTime: '', splits: []},
          ],
        },
        {
          type: types.STOP_WATCH,
          stopTime: stop,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle RESET_ALL', () => {
    expect(
      reducer(
        {
          ...initialState,
          watchRunning: true,
          athletesArray: [1, 2, 3],
          id: 10,
          startTime: 10,
          relayFinishTime: 100,
        },
        {type: types.RESET_ALL},
      ),
    ).toMatchSnapshot();
  });

  it('should handle RESET_TIME', () => {
    expect(
      reducer(
        {
          ...initialState,
          watchRunning: true,
          athletesArray: [
            {splits: [1, 2, 3], totalTime: 6},
            {splits: [4, 5, 6], totalTime: 15},
          ],
          startTime: 10,
          relayFinishTime: 10,
        },
        {type: types.RESET_TIME},
      ),
    ).toMatchSnapshot();
  });

  it('should handle OPEN_MODAL', () => {
    expect(reducer(initialState, {type: types.OPEN_MODAL})).toMatchSnapshot();
  });

  it('should handle CLOSE_MODAL', () => {
    expect(
      reducer(
        {
          ...initialState,
          modalVisible: true,
        },
        {type: types.CLOSE_MODAL},
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_ATHLETE_TO_WATCH', () => {
    expect(
      reducer(
        {
          ...initialState,
          modalVisible: true,
          addAthleteError: true,
          athletesArray: [
            {
              id: 'id_000',
              name: 'athlete1',
              splits: [],
              colorId: 5,
              totalTime: '',
            },
          ],
          id: 2,
          currentColorId: 5,
        },
        {
          type: types.ADD_ATHLETE_TO_WATCH,
          payload: {id: 'id_123', name: 'athlete2'},
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle REMOVE_ATHLETE_FROM_WATCH', () => {
    expect(
      reducer(
        {
          ...initialState,
          athletesArray: [{id: 1}, {id: 2}, {id: 3}],
        },
        {type: types.REMOVE_ATHLETE_FROM_WATCH, id: 2},
      ),
    ).toMatchSnapshot();
  });

  it('should handle DELETE_ATHLETE', () => {
    expect(
      reducer(
        {
          ...initialState,
          athletesArray: [{id: 1}, {id: 2}, {id: 3}],
        },
        {type: types.DELETE_ATHLETE, id: 2},
      ),
    ).toMatchSnapshot();
  });

  it('should handle DELETE_ATHLETE - athlete not on watch', () => {
    expect(
      reducer(
        {
          ...initialState,
          athletesArray: [{id: 1}, {id: 2}, {id: 3}],
        },
        {type: types.DELETE_ATHLETE, id: 4},
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_SPLIT - No start time', () => {
    expect(
      reducer({initialState}, {type: types.ADD_SPLIT, id: 1, splitTime: 10}),
    ).toMatchSnapshot();
  });

  it('should handle ADD_SPLIT - RACE, First Split', () => {
    expect(
      reducer(
        {
          ...initialState,
          startTime: 1,
          athletesArray: [{id: 'id_123', splits: []}],
        },
        {type: types.ADD_SPLIT, id: 'id_123', splitTime: 10},
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_SPLIT - RACE, Multiple Athletes', () => {
    expect(
      reducer(
        {
          ...initialState,
          startTime: 1,
          athletesArray: [
            {id: 'id_123', splits: [1, 2], totalTime: 3},
            {id: 'id_456', splits: [1, 2]},
          ],
          lastRelaySplit: 5,
        },
        {type: types.ADD_SPLIT, id: 'id_456', splitTime: 10},
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_SPLIT - RELAY, Second Athlete', () => {
    expect(
      reducer(
        {
          ...initialState,
          startTime: 1,
          athletesArray: [
            {id: 'id_123', splits: [1, 2], totalTime: 3},
            {id: 'id_456', splits: [], totalTime: ''},
          ],
          lastRelaySplit: 2,
          timerMode: RELAY,
        },
        {type: types.ADD_SPLIT, id: 'id_456', splitTime: 10},
      ),
    ).toMatchSnapshot();
  });

  it('should handle MODE_CHANGE', () => {
    expect(
      reducer(
        {
          ...initialState,
          timerMode: RELAY,
        },
        {type: types.MODE_CHANGE, timerMode: RACE},
      ),
    ).toMatchSnapshot();
  });
});
