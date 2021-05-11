import { combineReducers } from '@reduxjs/toolkit';
import certificate from './certificateSlice'
import dialog from './dialogSlice';

const reducer = combineReducers({
	certificate,
	dialog
});

export default reducer;