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
          id: "211879173a863"
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
          id: "211879173a863"
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
              id: "211879173a8639"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "211879173a8639"
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
              id: "211879173a8639"
            },
            {
              watch: "ok",
              id: "211879173a8638"
            },
            {
              watch: "ok",
              id: "211879173a8637"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "211879173a8638"
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          watch: "ok",
          id: "211879173a8639"
        },
        {
          watch: "ok",
          id: "211879173a8637"
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
              id: "211879173a8639"
            },
            {
              watch: "ok",
              id: "211879173a8638"
            },
            {
              watch: "ok",
              id: "211879173a8637"
            }
          ]
        },
        {
          type: types.DELETE_HISTORY,
          id: "211879173a8637"
        }
      )
    ).toEqual({
      ...initialState,
      historyStore: [
        {
          watch: "ok",
          id: "211879173a8639"
        },
        {
          watch: "ok",
          id: "211879173a8638"
        }
      ]
    });
  });
});
