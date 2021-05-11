import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// crews....
export const getCrews = createAsyncThunk('crew/getCrews', async (params) => {
	const response = await axios.get(`/api/crew/crews`, { params });
	const data = await response.data;

	return data;
});

export const getCrew = createAsyncThunk('crew/getCrew', async (crewId) => {
	const response = await axios.get(`/api/crew/crews/${crewId}`, {
		headers: {
			'content-type': 'multipart/form-data'
		}
	});
	const data = await response.data;

	return data;
});

export const addCrew = createAsyncThunk('crew/addCrew', async (crew, {dispatch}) => {	
	const response = await axios.post('/api/crew/crews', crew);
	const data = await response.data;

	dispatch(getCrews());
	return data;
});

export const updateCrew = createAsyncThunk('crew/updateCrew', async (crew, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crews/${crew.id}`, crew.data);
	const data = await response.data;

	dispatch(getCrew(crew.id));
	return data;
});

export const deleteCrew = createAsyncThunk('crew/deleteCrew', async (crew, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crews/${crew.id}`);
	const data = await response.data;

	dispatch(getCrews());
	dispatch(setCrew(null));
	return data;
});

// Search....
export const getSearchCrews = createAsyncThunk('crew/getSearchCrews', async (params) => {
	const response = await axios.get(`/api/crew/crew-search`, { 
		params
	 });
	const data = await response.data;

	return data;
});

// Crew List....
export const getCrewTrans = createAsyncThunk('crew/getCrewTrans', async (params) => {
	const response = await axios.get(`/api/crew/crew-trans`, { 
		params
	 });
	const data = await response.data;

	return data;
});

const crewSlice = createSlice({
	name: 'crew/crews',
	initialState: {
		list: [],
		recent: null,
		searchlist: [],
		crew_trans_list: [],
	},
	reducers: {
		setCrew: (state, action) => {
			state.recent = action.payload;
		}
	},
	extraReducers: {
		[getCrews.fulfilled]: (state, action) => {
			state.list = action.payload;
		},
		[getCrew.fulfilled]: (state, action) => {
			state.recent = action.payload;
		},
		[addCrew.fulfilled]: (state, action) => {
			state.recent = action.payload;
		},
		[getSearchCrews.fulfilled]: (state, action) => {
			state.searchlist = action.payload;
		},
		[getCrewTrans.fulfilled]: (state, action) => {
			state.crew_trans_list = action.payload;
		}
	}
});

export const { setCrew } = crewSlice.actions;

export default crewSlice.reducer;
