import reducer from "../../app/reducers/eventReducer";
import * as types from "../../app/actions/actionTypes";

const initialState = {
  eventStore: []
};

describe("event reducer", () => {
  it("should handle ADD_EVENT", () => {
    Math.random = () => 0.36232365838707015;
    expect(
      reducer(undefined, {
        type: types.ADD_EVENT,
        payload: { watch: "ok" }
      })
    ).toEqual({
      ...initialState,
      eventStore: [
        {
          watch: "ok",
          id: "211879173a863"
        }
      ]
    });
  });

  it("should handle ADD_EVENT test2", () => {
    Math.random = () => 0.36232365838707015;
    expect(
      reducer(
        {
          ...initialState,
          eventStore: [
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
          type: types.ADD_EVENT,
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
      eventStore: [
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

  it("should handle DELETE_EVENT", () => {
    expect(
      reducer(
        {
          ...initialState,
          eventStore: [
            {
              watch: "ok",
              id: "211879173a8639"
            }
          ]
        },
        {
          type: types.DELETE_EVENT,
          id: "211879173a8639"
        }
      )
    ).toEqual({
      ...initialState,
      eventStore: []
    });
  });

  it("should handle DELETE_EVENT test2", () => {
    expect(
      reducer(
        {
          ...initialState,
          eventStore: [
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
          type: types.DELETE_EVENT,
          id: "211879173a8638"
        }
      )
    ).toEqual({
      ...initialState,
      eventStore: [
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

  it("should handle DELETE_EVENT test3", () => {
    expect(
      reducer(
        {
          ...initialState,
          eventStore: [
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
          type: types.DELETE_EVENT,
          id: "211879173a8637"
        }
      )
    ).toEqual({
      ...initialState,
      eventStore: [
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
