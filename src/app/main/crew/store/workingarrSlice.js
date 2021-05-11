import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCrewTransRH = createAsyncThunk('crew/getCrewTransRH', async (params) => {
	const response = await axios.get(`/api/crew/crew-trans-rh`, { params });
	const data = await response.data;	

	return data;
});

export const updateCrewTransRHValue = createAsyncThunk('crew/updateCrewTransRHValue', async (params) => {
	const response = await axios.put(`/api/crew/crew-trans-rh/${params.id}`, params);
	const data = await response.data;

	return data;
});

const crewSlice = createSlice({
	name: 'crew/crews',
	initialState: {
		list: [],
		recent: null,
		filteredList: [],
	},
	reducers: {
		setCrew: (state, action) => {
			state.recent = action.payload;
		},
		filterCrewTransRH: (state, action) => {
			const {vessel} = action.payload;
			const data = state.list;
			var res;
			if(vessel) {
				res = data.filter(d => d.crew_trans.vessel.id == vessel )
			} else {
				res = data;
			}
			state.filteredList = res
		}
	},
	extraReducers: {
		[getCrewTransRH.fulfilled]: (state, action) => {
			state.list = action.payload;
		}
	}
});

export const { setCrew, filterCrewTransRH } = crewSlice.actions;

export default crewSlice.reducer;
