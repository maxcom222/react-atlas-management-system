import { combineReducers } from '@reduxjs/toolkit';
import rank from './rankSlice';
import dialog from './dialogSlice';

const reducer = combineReducers({
	rank,
	dialog
});

export default reducer;