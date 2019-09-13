import reducer from '../athletesReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  newAthleteInput: '',
  addAthleteError: false,
  athleteStore: [],
};

describe('athlete reducer', () => {
  it('should handle NEW_ATHLETE_INPUT', () => {
    const newAthleteInput = 'zzz';
    expect(
      reducer(undefined, {
        type: types.NEW_ATHLETE_INPUT,
        newAthleteInput: newAthleteInput,
      }),
    ).toMatchSnapshot();
  });

  it('should handle ADD_ATHLETE first athlete', () => {
    Math.random = () => 0.36232365838707015;

    const newAthleteInput = 'zzz';
    expect(
      reducer(
        {
          ...initialState,
          newAthleteInput: newAthleteInput,
        },
        {
          type: types.ADD_ATHLETE,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_ATHLETE additional athletes', () => {
    Math.random = () => 0.36232365838707015;

    const newAthleteInput = 'zzz';
    expect(
      reducer(
        {
          ...initialState,
          newAthleteInput: newAthleteInput,
          athleteStore: [
            {id: 'id_123', name: 'yyy', onWatch: true},
            {id: 'id_456', name: 'xxx', onWatch: false},
          ],
        },
        {
          type: types.ADD_ATHLETE,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle ADD_ATHLETE_ERROR', () => {
    expect(
      reducer(undefined, {
        type: types.ADD_ATHLETE_ERROR,
      }),
    ).toMatchSnapshot();
  });

  it('should handle ADD_ATHLETE_TO_WATCH', () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            {id: 'id_123', name: 'yyy', onWatch: true},
            {id: 'id_456', name: 'xxx', onWatch: false},
            {id: 'id_789', name: 'zzz', onWatch: false},
          ],
        },
        {
          type: types.ADD_ATHLETE_TO_WATCH,
          payload: {
            id: 'id_456',
            name: 'xxx',
          },
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle REMOVE_ATHLETE_FROM_WATCH', () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            {id: 'id_123', name: 'yyy', onWatch: true},
            {id: 'id_456', name: 'xxx', onWatch: true},
            {id: 'id_789', name: 'zzz', onWatch: false},
          ],
        },
        {
          type: types.REMOVE_ATHLETE_FROM_WATCH,
          id: 'id_456',
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle RESET_ATHLETE_LIST', () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            {id: 'id_123', name: 'yyy', onWatch: true},
            {id: 'id_456', name: 'xxx', onWatch: false},
            {id: 'id_789', name: 'zzz', onWatch: true},
          ],
        },
        {
          type: types.RESET_ATHLETE_LIST,
        },
      ),
    ).toMatchSnapshot();
  });

  it('should handle DELETE_ATHLETE', () => {
    const id = 'id_456';
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            {id: 'id_123', name: 'yyy', onWatch: true},
            {id: 'id_456', name: 'xxx', onWatch: false},
            {id: 'id_789', name: 'zzz', onWatch: true},
          ],
        },
        {
          type: types.DELETE_ATHLETE,
          id,
        },
      ),
    ).toMatchSnapshot();
  });
});
