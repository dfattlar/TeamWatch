import * as actions from '../../app/actions/athleteActions';
import * as types from '../../app/actions/ActionTypes';

describe('Athlete Actions', () => {
  it('should create an action to input a new athlete', () => {
    const newAthleteInput = 'Athlete1';
    const expectedAction = {
      type: types.NEW_ATHLETE_INPUT,
      newAthleteInput,
    };

    expect(actions.newAthleteInput(newAthleteInput)).toMatchSnapshot();
  });

  it('should create an action to add an athlete', () => {
    const expectedAction = {
      type: types.ADD_ATHLETE,
    };
    expect(actions.addAthlete()).toEqual(expectedAction);
  });

  it('should create an action to add an athlete error', () => {
    const expectedAction = {
      type: types.ADD_ATHLETE_ERROR,
    };
    expect(actions.addAthleteError()).toEqual(expectedAction);
  });

  it('should create an action to add an athlete to the watch', () => {
    const id = 'id_123';
    const name = 'Athlete1';
    const expectedAction = {
      type: types.ADD_ATHLETE_TO_WATCH,
      payload: {
        id,
        name,
      },
    };
    expect(actions.addAthleteToWatch(id, name)).toEqual(expectedAction);
  });

  it('should create an action to remove an athlete from the watch', () => {
    const id = 'id_123';
    const expectedAction = {
      type: types.REMOVE_ATHLETE_FROM_WATCH,
      id,
    };
    expect(actions.removeAthleteFromWatch(id)).toEqual(expectedAction);
  });

  it('should create an action to delete an athlete', () => {
    const id = 'id_123';
    const expectedAction = {
      type: types.DELETE_ATHLETE,
      id,
    };
    expect(actions.deleteAthlete(id)).toEqual(expectedAction);
  });
});
