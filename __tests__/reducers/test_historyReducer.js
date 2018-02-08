import reducer from "../../app/reducers/historyReducer";
import * as types from "../../app/actions/actionTypes";

const initialState = {
  historyStore: []
};

describe("history reducer", () => {
  it("should handle ADD_HISTORY", () => {
    Math.random = () => 0.36232365838707015;
    expect(
      reducer(undefined, {
        type: types.ADD_HISTORY,
        payload: { watch: "ok" }
      })
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          watch: "ok",
          id: "d1kkm3hpgszxil9rin0ugcik9"
        }
      ]
    });
  });

  it("should handle ADD_HISTORY test2", () => {
    Math.random = () => 0.36232365838707015;
    expect(
      reducer(
        {
          ...initialState,
          historyStore: [
            {
              athletesArray: [
                {
                  colorId: 1,
                  id: "hfz5yu",
                  name: "name1",
                  splits: [1, 2, 3],
                  totalTime: 6
                }
              ],
              name: "test1",
              relayFinishTime: 4122,
              startTime: 1499014397509
            }
          ]
        },
        {
          type: types.ADD_HISTORY,
          payload: {
            athletesArray: [
              {
                colorId: 2,
                id: "hfz5yu2",
                name: "name2",
                splits: [1, 2, 3],
                totalTime: 6
              }
            ],
            name: "test2",
            relayFinishTime: 4122,
            startTime: 1499014397509
          }
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          athletesArray: [
            {
              colorId: 1,
              id: "hfz5yu",
              name: "name1",
              splits: [1, 2, 3],
              totalTime: 6
            }
          ],
          name: "test1",
          relayFinishTime: 4122,
          startTime: 1499014397509
        },
        {
          athletesArray: [
            {
              colorId: 2,
              id: "hfz5yu2",
              name: "name2",
              splits: [1, 2, 3],
              totalTime: 6
            }
          ],
          name: "test2",
          relayFinishTime: 4122,
          startTime: 1499014397509,
          id: "d1kkm3hpgszxil9rin0ugcik9"
        }
      ]
    });
  });

  it("should handle DELETE_HISTORY", () => {
    expect(
      reducer(
        {
          ...initialState,
          historyStore: [
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik9"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "d1kkm3hpgszxil9rin0ugcik9"
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: []
    });
  });

  it("should handle DELETE_HISTORY test2", () => {
    expect(
      reducer(
        {
          ...initialState,
          historyStore: [
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik9"
            },
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik8"
            },
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik7"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "d1kkm3hpgszxil9rin0ugcik8"
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          watch: "ok",
          id: "d1kkm3hpgszxil9rin0ugcik9"
        },
        {
          watch: "ok",
          id: "d1kkm3hpgszxil9rin0ugcik7"
        }
      ]
    });
  });

  it("should handle DELETE_HISTORY test3", () => {
    expect(
      reducer(
        {
          ...initialState,
          historyStore: [
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik9"
            },
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik8"
            },
            {
              watch: "ok",
              id: "d1kkm3hpgszxil9rin0ugcik7"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "d1kkm3hpgszxil9rin0ugcik7"
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          watch: "ok",
          id: "d1kkm3hpgszxil9rin0ugcik9"
        },
        {
          watch: "ok",
          id: "d1kkm3hpgszxil9rin0ugcik8"
        }
      ]
    });
  });
});
