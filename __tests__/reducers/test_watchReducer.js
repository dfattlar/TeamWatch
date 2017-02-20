import reducer from '../../app/reducers/watchReducer'
import * as types from '../../app/actions/actionTypes'
import { RACE, RELAY } from '../../app/constants'
import { ListView } from 'react-native'

jest.mock('ListView', () => {
  return require('react').createClass({
    statics: {
      DataSource: require.requireActual('ListView').DataSource,
    },
    render() {
      return require('react').createElement('ListView', this.props, this.props.children);
    }
  });
});

const initialState = {
    watchRunning: false,
    startTime: null,
    time: 0,
    id: 0,
    currentColorId: 0,
    modalVisible: false,
    newAthlete: '',
    athletesArray: [],
    timerMode: RACE,
    lastRelaySplit: null,
    relayFinishTime: null
}


describe('watch reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual(initialState)
    })

    it('should handle START_WATCH with no athletes', () => {
        expect(
            reducer(undefined, {
                type: types.START_WATCH,
                intervalId: 'id_123'
            })
        ).toEqual(
            {
                ...initialState,
                watchRunning: true,
                startTime: undefined,
                lastRelaySplit: undefined,
                intervalId: 'id_123'
            }
        )
    })

    it('should handle START_WATCH with athletes (clear total time)', () => {
        expect(
            reducer({
                ...initialState,
                watchRunning: true,
                startTime: 999,
                athletesArray: [{name:'ath1',totalTime:'111'},{name:'ath2',totalTime:'222'}],
                lastRelaySplit: undefined,
                intervalId: 'id_123'
            }, {
                type: types.START_WATCH,
                intervalId: 'id_123'
            })
        ).toEqual(
            {
                ...initialState,
                watchRunning: true,
                startTime: 999,
                athletesArray: [{name:'ath1',totalTime:''},{name:'ath2',totalTime:''}],
                lastRelaySplit: undefined,
                intervalId: 'id_123'
            }
        )
    })

    it('should handle STOP_WATCH', () => {
        expect(
            reducer(undefined, {
                type: types.STOP_WATCH
            })
        ).toEqual(
            {
                ...initialState,
                watchRunning: false,
                relayFinishTime: 0
            }
        )
    })

    it('should handle STOP_WATCH and set athlete totalTime', () => {
        expect(
            reducer({
                ...initialState,
                athletesArray: [{name:'ath1',totalTime:'',splits:[1,2,3]},
                    {name:'ath2',totalTime:'',splits:[4,5,6]}],
            }, {
                type: types.STOP_WATCH
            })
        ).toEqual(
            {
                ...initialState,
                watchRunning: false,
                relayFinishTime: 21,
                athletesArray: [{name:'ath1',totalTime:6,splits:[1,2,3]},
                    {name:'ath2',totalTime:15,splits:[4,5,6]}],
            }
        )
    })

    it('should handle STOP_WATCH in Relay Mode', () => {
        expect(
            reducer({
                ...initialState,
                timerMode: RELAY,
                athletesArray: [{name:'ath1',totalTime:'',splits:[1,2,3]},
                    {name:'ath2',totalTime:'',splits:[4,5,6]},{name:'ath3',totalTime:'',splits:[]}],
            }, {
                type: types.STOP_WATCH
            })
        ).toEqual(
            {
                ...initialState,
                watchRunning: false,
                timerMode: RELAY,
                relayFinishTime: 21,
                athletesArray: [{name:'ath1',totalTime:6,splits:[1,2,3]},
                    {name:'ath2',totalTime:15,splits:[4,5,6]},
                    {name:'ath3',totalTime:'',splits:[]}]
            }
        )
    })

    it('should handle TICK', () => {
        expect(
            reducer({
                ...initialState,
                startTime: 1
            }, {
                type: types.TICK,
                time:10
            })
        ).toEqual({
            ...initialState,
            startTime: 1,
            time: 9
        })
    })

    it('should handle RESET_ALL', () => {
        expect(
            reducer({
                ...initialState,
                time: 10,
                watchRunning: true,
                athletesArray: [1,2,3],
                id: 10,
                startTime: 10,
                relayFinishTime: 100
            }, { type: types.RESET_ALL })
        ).toEqual({
            ...initialState,
            time: 0,
            watchRunning: false,
            athletesArray: [],
            id: 0,
            startTime: null,
            relayFinishTime: null
        })
    })

    it('should handle RESET_TIME', () => {
        expect(
            reducer({
                ...initialState,
                time: 10,
                watchRunning: true,
                athletesArray: [{'splits':[1,2,3],totalTime:6},{'splits':[4,5,6],totalTime:15}],
                startTime: 10,
                relayFinishTime: 10
            }, { type: types.RESET_TIME })
        ).toEqual({
            ...initialState,
            time: 0,
            watchRunning: false,
            athletesArray: [{'splits':[],totalTime:''},{'splits':[],totalTime:''}],
            startTime: null,
            relayFinishTime: null
        })
    })

    it('should handle OPEN_MODAL', () => {
        expect(
            reducer(initialState, { type: types.OPEN_MODAL })
        ).toEqual({
            ...initialState,
            modalVisible: true,
            addAthleteError: false,
            newAthleteInput: ''
        })
    })

    it('should handle CLOSE_MODAL', () => {
        expect(
            reducer({
                ...initialState,
                modalVisible: true
            }, { type: types.CLOSE_MODAL })
        ).toEqual({
            ...initialState,
            modalVisible: false
        })
    })

    it('should handle ADD_ATHLETE_TO_WATCH', () => {
        expect(
            reducer({
                ...initialState,
                modalVisible: true,
                addAthleteError: true,
                athletesArray: [{
                    id:'id_000',
                    name: 'athlete1',
                    splits: [],
                    colorId: 5,
                    totalTime: ''
                }],
                id: 2,
                currentColorId: 5
            }, {
                type: types.ADD_ATHLETE_TO_WATCH,
                payload: { id: 'id_123', name: 'athlete2' }
            })
        ).toEqual({
            ...initialState,
            modalVisible: false,
            addAthleteError: false,
            athletesArray: [{
                id:'id_000',
                name: 'athlete1',
                splits: [],
                colorId: 5,
                totalTime: ''
            }, {
                id: 'id_123',
                name: 'athlete2',
                splits: [],
                colorId: 0,
                totalTime: ''
            }],
            id: 3,
            currentColorId: 0
        })
    })

    it('should handle REMOVE_ATHLETE_FROM_WATCH', () => {
        expect(
            reducer({
                ...initialState,
                athletesArray: [{ id:1 }, { id: 2 }, { id: 3 }]
            }, { type: types.REMOVE_ATHLETE_FROM_WATCH, id: 2 })
        ).toEqual({
            ...initialState,
            athletesArray: [{ id:1 }, { id: 3 }]
        })
    })

    it('should handle DELETE_ATHLETE', () => {
        expect(
            reducer({
                ...initialState,
                athletesArray: [{ id:1 }, { id: 2 }, { id: 3 }]
            }, { type: types.DELETE_ATHLETE, id: 2 })
        ).toEqual({
            ...initialState,
            athletesArray: [{ id:1 }, { id: 3 }]
        })
    })

    it('should handle ADD_SPLIT - No start time', () => {
        expect(
            reducer({ initialState }, { type: types.ADD_SPLIT, id: 1, splitTime: 10 })
        ).toEqual({ initialState })
    })

    it('should handle ADD_SPLIT - RACE, First Split', () => {
        expect(
            reducer({
                ...initialState,
                startTime: 1,
                athletesArray: [{ id:'id_123', splits:[] }]
            }, { type: types.ADD_SPLIT, id: 'id_123', splitTime: 10 })
        ).toEqual({
            ...initialState,
            athletesArray: [{ id:'id_123', splits:[9] }],
            lastRelaySplit: 10,
            startTime: 1
        })
    })

    it('should handle ADD_SPLIT - RACE, Multiple Athletes', () => {
        expect(
            reducer({
                ...initialState,
                startTime: 1,
                athletesArray: [{ id:'id_123', splits:[1,2] }, { id:'id_456', splits:[1,2] }],
                lastRelaySplit: 5
            }, { type: types.ADD_SPLIT, id: 'id_456', splitTime: 10 })
        ).toEqual({
            ...initialState,
            athletesArray: [{ id:'id_123', splits:[1,2] }, { id:'id_456', splits:[1,2,6] }],
            lastRelaySplit: 10,
            startTime: 1
        })
    })

    it('should handle ADD_SPLIT - RELAY, Second Athlete', () => {
        expect(
            reducer({
                ...initialState,
                startTime: 1,
                athletesArray: [{ id:'id_123', splits:[1,2], totalTime: '' }, { id:'id_456', splits:[], totalTime: '' }],
                lastRelaySplit: 2,
                timerMode: RELAY
            }, { type: types.ADD_SPLIT, id: 'id_456', splitTime: 10 })
        ).toEqual({
            ...initialState,
            athletesArray: [{ id:'id_123', splits:[1,2], totalTime: 3 }, { id:'id_456', splits:[8], totalTime: '' }],
            lastRelaySplit: 10,
            startTime: 1,
            timerMode: RELAY
        })
    })

    it('should handle MODE_CHANGE', () => {
        expect(
            reducer({
                ...initialState,
                timerMode: RELAY
            }, { type: types.MODE_CHANGE, timerMode: RACE })
        ).toEqual({
            ...initialState,
            timerMode: RACE
        })
    })
})
