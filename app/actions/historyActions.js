'use strict';

import * as types from './actionTypes';

export function deleteHistory(id) {
    return {
        type: types.DELETE_HISTORY,
        id
    }
}
