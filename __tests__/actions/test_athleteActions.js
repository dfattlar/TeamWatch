import * as actions from "../../app/actions/athleteActions";
import * as types from "../../app/actions/ActionTypes";

describe("Athlete Actions", () => {
  it("should create an action to update first name input of a new athlete", () => {
    const newAthleteInputFirst = "AthleteFirst";
    const expectedAction = {
      type: types.NEW_ATHLETE_INPUT_FIRST,
      newAthleteInputFirst
    };
    expect(actions.newAthleteInputFirst(newAthleteInputFirst)).toEqual(
      expectedAction
    );
  });

  it("should create an action to update first last input of a new athlete", () => {
    const newAthleteInputLast = "AthleteLast";
    const expectedAction = {
      type: types.NEW_ATHLETE_INPUT_LAST,
      newAthleteInputLast
    };
    expect(actions.newAthleteInputLast(newAthleteInputLast)).toEqual(
      expectedAction
    );
  });

  it("should create an action to add an athlete", () => {
    const expectedAction = {
      type: types.ADD_ATHLETE
    };
    expect(actions.addAthlete()).toEqual(expectedAction);
  });

  it("should create an action to add an athlete error", () => {
    const expectedAction = {
      type: types.ADD_ATHLETE_ERROR
    };
    expect(actions.addAthleteError()).toEqual(expectedAction);
  });

  it("should create an action to add an athlete to the watch", () => {
    const id = "id_123";
    const name = "Athlete1";
    const expectedAction = {
      type: types.ADD_ATHLETE_TO_WATCH,
      payload: {
        id,
        name
      }
    };
    expect(actions.addAthleteToWatch(id, name)).toEqual(expectedAction);
  });

  it("should create an action to remove an athlete from the watch", () => {
    const id = "id_123";
    const expectedAction = {
      type: types.REMOVE_ATHLETE_FROM_WATCH,
      id
    };
    expect(actions.removeAthleteFromWatch(id)).toEqual(expectedAction);
  });

  it("should create an action to delete an athlete", () => {
    const id = "id_123";
    const expectedAction = {
      type: types.DELETE_ATHLETE,
      id
    };
    expect(actions.deleteAthlete(id)).toEqual(expectedAction);
  });
});
