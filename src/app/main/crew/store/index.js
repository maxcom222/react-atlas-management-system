import { combineReducers } from '@reduxjs/toolkit';
import crew from './crewSlice';
import crew_details from "../details/store";
import vostype from "./vostypeSlice";
import working_arrangements from "./workingarrSlice";

const reducer = combineReducers({
	crew,
	crew_details,
	vostype,
	working_arrangements
});

export default reducer;