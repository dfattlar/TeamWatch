import * as actions from '../../app/actions/watchActions'
import * as types from '../../app/actions/ActionTypes'

describe('Watch Actions', () => {
    it('should create an action to start the watch', () => {
        Date.now = jest.genMockFunction().mockReturnValue(0);
        const startTime = Date.now()
        const watchRunning = true
        const intervalId = 'id_123'
        const expectedAction = {
            type: types.START_WATCH,
            startTime,
            intervalId
        }
        expect(actions.startWatch(intervalId)).toEqual(expectedAction)
        jest.resetAllMocks()
    })

    it('should create an action to stop the watch', () => {
        const expectedAction = {
            type: types.STOP_WATCH
        }
        expect(actions.stopWatch()).toEqual(expectedAction)
    })

    it('should create an action to reset all values on watch', () => {
        const expectedAction = {
            type: types.RESET_ALL
        }
        expect(actions.resetAll()).toEqual(expectedAction)
    })

    it('should create an action to reset time values on watch', () => {
        const expectedAction = {
            type: types.RESET_TIME
        }
        expect(actions.resetTime()).toEqual(expectedAction)
    })

    // it('should create an action to reset time values on watch', () => {
    //     const expectedAction = {
    //         type: types.RESET_ATHLETE_LIST
    //     }
    //     expect(actions.resetAthleteList()).toEqual(expectedAction)
    // })

    it('should create an action to trigger a tick', () => {
        Date.now = jest.genMockFunction().mockReturnValue(0);
        const date = Date.now()
        const expectedAction = {
            type: types.TICK,
            time: date
        }
        expect(actions.tick()).toEqual(expectedAction)
        jest.resetAllMocks()
    })

    it('should create an action to open the modal', () => {
        const expectedAction = {
            type: types.CLOSE_MODAL
        }
        expect(actions.closeModal()).toEqual(expectedAction)
    })

    it('should create an action to add a split', () => {
        Date.now = jest.genMockFunction().mockReturnValue(0);
        const time = Date.now()
        const id = 'id_123'
        const expectedAction = {
            type: types.ADD_SPLIT,
            splitTime: time,
            id
        }
        expect(actions.addSplit(id)).toEqual(expectedAction)
        jest.resetAllMocks()
    })

    it('should create an action to change the mode (race,relay)', () => {
        const timerMode = 'MODE'
        const expectedAction = {
            type: types.MODE_CHANGE,
            timerMode
        }
        expect(actions.modeChange(timerMode)).toEqual(expectedAction)
    })

    it('should create an action to add history', () => {
        const watchData = {time:0}
        const expectedAction = {
            type: types.ADD_HISTORY,
            payload: watchData
        }
        expect(actions.addHistory(watchData)).toEqual(expectedAction)
    })
})
