import reducer from "../../app/reducers/athletesReducer";
import * as types from "../../app/actions/actionTypes";

const initialState = {
  newAthleteInputFirst: "",
  newAthleteInputLast: "",
  addAthleteError: false,
  athleteStore: []
};

describe("athlete reducer", () => {
  it("should handle NEW_ATHLETE_INPUT_FIRST", () => {
    const newAthleteInputFirst = "firstName";
    expect(
      reducer(undefined, {
        type: types.NEW_ATHLETE_INPUT_FIRST,
        newAthleteInputFirst: newAthleteInputFirst
      })
    ).toEqual({
      ...initialState,
      newAthleteInputFirst
    });
  });

  it("should handle NEW_ATHLETE_INPUT_LAST", () => {
    const newAthleteInputLast = "lastName";
    expect(
      reducer(undefined, {
        type: types.NEW_ATHLETE_INPUT_LAST,
        newAthleteInputLast: newAthleteInputLast
      })
    ).toEqual({
      ...initialState,
      newAthleteInputLast
    });
  });

  it("should handle ADD_ATHLETE first athlete", () => {
    Math.random = () => 0.36232365838707015;

    const newAthleteInputFirst = "firstName";
    const newAthleteInputLast = "lastName";
    expect(
      reducer(
        {
          ...initialState,
          newAthleteInputFirst: newAthleteInputFirst,
          newAthleteInputLast: newAthleteInputLast
        },
        {
          type: types.ADD_ATHLETE
        }
      )
    ).toEqual({
      ...initialState,
      addAthleteError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: "",
      athleteStore: [
        {
          id: "879173a863",
          name: `${newAthleteInputFirst} ${newAthleteInputLast}`,
          onWatch: false
        }
      ]
    });
  });

  it("should handle ADD_ATHLETE additional athletes", () => {
    Math.random = () => 0.36232365838707015;

    const newAthleteInputFirst = "firstName";
    const newAthleteInputLast = "lastName";
    expect(
      reducer(
        {
          ...initialState,
          newAthleteInputFirst: newAthleteInputFirst,
          newAthleteInputLast: newAthleteInputLast,
          athleteStore: [
            { id: "id_123", name: "yyy", onWatch: true },
            { id: "id_456", name: "firstName lastName", onWatch: false }
          ]
        },
        {
          type: types.ADD_ATHLETE
        }
      )
    ).toEqual({
      ...initialState,
      addAthleteError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: "",
      athleteStore: [
        { id: "id_123", name: "yyy", onWatch: true },
        { id: "id_456", name: "firstName lastName", onWatch: false },
        {
          id: "879173a863",
          name: `${newAthleteInputFirst} ${newAthleteInputLast}`,
          onWatch: false
        }
      ]
    });
  });

  it("should handle ADD_ATHLETE_ERROR", () => {
    expect(
      reducer(undefined, {
        type: types.ADD_ATHLETE_ERROR
      })
    ).toEqual({
      ...initialState,
      addAthleteError: true
    });
  });

  it("should handle ADD_ATHLETE_TO_WATCH", () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            { id: "id_123", name: "yyy", onWatch: true },
            { id: "id_456", name: "xxx", onWatch: false },
            { id: "id_789", name: "zzz", onWatch: false }
          ]
        },
        {
          type: types.ADD_ATHLETE_TO_WATCH,
          payload: {
            id: "id_456",
            name: "xxx"
          }
        }
      )
    ).toEqual({
      ...initialState,
      addAthleteError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: "",
      athleteStore: [
        { id: "id_123", name: "yyy", onWatch: true },
        { id: "id_456", name: "xxx", onWatch: true },
        { id: "id_789", name: "zzz", onWatch: false }
      ]
    });
  });

  it("should handle REMOVE_ATHLETE_FROM_WATCH", () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            { id: "id_123", name: "yyy", onWatch: true },
            { id: "id_456", name: "xxx", onWatch: true },
            { id: "id_789", name: "zzz", onWatch: false }
          ]
        },
        {
          type: types.REMOVE_ATHLETE_FROM_WATCH,
          id: "id_456"
        }
      )
    ).toEqual({
      ...initialState,
      addAthleteError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: "",
      athleteStore: [
        { id: "id_123", name: "yyy", onWatch: true },
        { id: "id_456", name: "xxx", onWatch: false },
        { id: "id_789", name: "zzz", onWatch: false }
      ]
    });
  });

  it("should handle RESET_ATHLETE_LIST", () => {
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            { id: "id_123", name: "yyy", onWatch: true },
            { id: "id_456", name: "xxx", onWatch: false },
            { id: "id_789", name: "zzz", onWatch: true }
          ]
        },
        {
          type: types.RESET_ATHLETE_LIST
        }
      )
    ).toEqual({
      ...initialState,
      addAthleteError: false,
      newAthleteInputFirst: "",
      newAthleteInputLast: "",
      athleteStore: [
        { id: "id_123", name: "yyy", onWatch: false },
        { id: "id_456", name: "xxx", onWatch: false },
        { id: "id_789", name: "zzz", onWatch: false }
      ]
    });
  });

  it("should handle DELETE_ATHLETE", () => {
    const id = "id_456";
    expect(
      reducer(
        {
          ...initialState,
          athleteStore: [
            { id: "id_123", name: "yyy", onWatch: true },
            { id: "id_456", name: "xxx", onWatch: false },
            { id: "id_789", name: "zzz", onWatch: true }
          ]
        },
        {
          type: types.DELETE_ATHLETE,
          id
        }
      )
    ).toEqual({
      ...initialState,
      athleteStore: [
        { id: "id_123", name: "yyy", onWatch: true },
        { id: "id_789", name: "zzz", onWatch: true }
      ]
    });
  });
});
