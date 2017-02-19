import reducer from '../../app/reducers/athletesReducer'
import * as types from '../../app/actions/actionTypes'
import { ListView } from 'react-native'

const initialState = {
    newAthleteInput: '',
    addAthleteError: false,
    athleteStore: []
}


describe('watch reducer', () => {
    it('should handle NEW_ATHLETE_INPUT', () => {
        const newAthleteInput = 'zzz'
        expect(
            reducer(undefined, {
                type: types.NEW_ATHLETE_INPUT,
                newAthleteInput: newAthleteInput
            })
        ).toEqual(
            {
                ...initialState,
                newAthleteInput
            }
        )
    })

    it('should handle ADD_ATHLETE first athlete', () => {
        Math.random = () => 0.36232365838707015

        const newAthleteInput = 'zzz'
        expect(
            reducer({
                ...initialState,
                newAthleteInput: newAthleteInput
            }, {
                type: types.ADD_ATHLETE
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: false,
                newAthleteInput: '',
                athleteStore: [{
                    id: '3hpgszxil9rin0ugcik9',
                    name: newAthleteInput,
                    onWatch: false
                }]
            }
        )
    })

    it('should handle ADD_ATHLETE additional athletes', () => {
        Math.random = () => 0.36232365838707015

        const newAthleteInput = 'zzz'
        expect(
            reducer({
                ...initialState,
                newAthleteInput: newAthleteInput,
                athleteStore: [{id:'id_123',name:'yyy',onWatch:true},
                {id:'id_456',name:'xxx',onWatch:false}]
            }, {
                type: types.ADD_ATHLETE
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: false,
                newAthleteInput: '',
                athleteStore: [
                    {id:'id_123',name:'yyy',onWatch:true},
                    {id:'id_456',name:'xxx',onWatch:false},
                    {
                        id: '3hpgszxil9rin0ugcik9',
                        name: newAthleteInput,
                        onWatch: false
                    }
                ]
            }
        )
    })

    it('should handle ADD_ATHLETE_ERROR', () => {
        expect(
            reducer(undefined, {
                type: types.ADD_ATHLETE_ERROR
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: true
            }
        )
    })

    it('should handle ADD_ATHLETE_TO_WATCH', () => {
        expect(
            reducer({
                ...initialState,
                athleteStore: [{id:'id_123',name:'yyy',onWatch:true},
                {id:'id_456',name:'xxx',onWatch:false},
                {id:'id_789',name:'zzz',onWatch:false}]
            }, {
                type: types.ADD_ATHLETE_TO_WATCH,
                id: 'id_456'
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: false,
                newAthleteInput: '',
                athleteStore: [
                    {id:'id_123',name:'yyy',onWatch:true},
                    {id:'id_456',name:'xxx',onWatch:true},
                    {id:'id_789',name:'zzz',onWatch:false}
                ]
            }
        )
    })

    it('should handle REMOVE_ATHLETE_FROM_WATCH', () => {
        expect(
            reducer({
                ...initialState,
                athleteStore: [{id:'id_123',name:'yyy',onWatch:true},
                {id:'id_456',name:'xxx',onWatch:true},
                {id:'id_789',name:'zzz',onWatch:false}]
            }, {
                type: types.REMOVE_ATHLETE_FROM_WATCH,
                id: 'id_456'
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: false,
                newAthleteInput: '',
                athleteStore: [
                    {id:'id_123',name:'yyy',onWatch:true},
                    {id:'id_456',name:'xxx',onWatch:false},
                    {id:'id_789',name:'zzz',onWatch:false}
                ]
            }
        )
    })

    it('should handle RESET_ATHLETE_LIST', () => {
        expect(
            reducer({
                ...initialState,
                athleteStore: [{id:'id_123',name:'yyy',onWatch:true},
                {id:'id_456',name:'xxx',onWatch:false},
                {id:'id_789',name:'zzz',onWatch:true}]
            }, {
                type: types.RESET_ATHLETE_LIST
            })
        ).toEqual(
            {
                ...initialState,
                addAthleteError: false,
                newAthleteInput: '',
                athleteStore: [
                    {id:'id_123',name:'yyy',onWatch:false},
                    {id:'id_456',name:'xxx',onWatch:false},
                    {id:'id_789',name:'zzz',onWatch:false}
                ]
            }
        )
    })
})
