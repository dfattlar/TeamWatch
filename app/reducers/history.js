import * as types from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/constants';
import React from 'react';
import { ListView } from 'react-native';


let ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
let initHistoryStore = [];

const initialState = {
    historyStore: initHistoryStore,
    historyDS: ds.cloneWithRows(initHistoryStore)
};

export default function addAthlete(state = initialState, action = {}) {
    switch (action.type) {
        case REHYDRATE:
            if (!action.payload.hasOwnProperty('history')) {
                return state;
            }
            return {
                ...action.payload.history,
                historyDS: ds.cloneWithRows(action.payload.history.historyStore)
            }
        case types.ADD_HISTORY:
            const updatedHistory = [...state.historyStore, [action.payload]];
            return {
                ...state,
                historyStore: updatedHistory,
                historyDS: ds.cloneWithRows(updatedHistory)
            }
        default:
            return state;
    }
}
