import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

const rankAdapter = createEntityAdapter({});

export const getRanks = createAsyncThunk('crew/rank/getRanks', async params => {
	const response = await axios.get('/api/crew/ranks', { params });
	const data = await response.data;

	return data;
});

export const getProduct = createAsyncThunk('eCommerceApp/product/getProduct', async params => {
	const response = await axios.get('/api/e-commerce-app/product', { params });
	const data = await response.data;

	return data;
});

// export const saveRank = createAsyncThunk('crew/rank/saveRank', async (rank, { dispatch, getState }) => {
// 	const response = await axios.post('/api/crew/ranks', rank);
// 	const data = await response.data;

// 	dispatch(getRanks());
// 	return data;
// });

export const addRank = createAsyncThunk('crew/rank/addRank', async (rank, { dispatch, getState }) => {
	const response = await axios.post('/api/crew/ranks', rank);
	const data = await response.data;

	dispatch(getRanks());
	return data;
});

export const updateRank = createAsyncThunk('crew/rank/updateRank', async (rank, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/ranks/${rank.id}`, rank);
	const data = await response.data;

	dispatch(getRanks());
	return data;
});

export const deleteRank = createAsyncThunk('crew/rank/deleteRank', async (rank, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/ranks/${rank.id}`, rank);
	const data = await response.data;

	dispatch(getRanks());
	return data;
});

const rankSlice = createSlice({
	name: 'crew/rank/rank',
	initialState: {
		list: [],
		recent: null,
	},
	reducers: {
		newRank: {
			reducer: (state, action) => {
				state.recent = action.payload;
			},			
		},
		setRank: (state, action) => {
			state.recent = action.payload;
		},
	},
	extraReducers: {
		[getRanks.fulfilled]: (state, action) => {
			state.list = action.payload;
		},
		// [saveRank.fulfilled]: (state, action) => {
		// 	state.recent = action.payload;
		// },
		[addRank.fulfilled]: (state, action) => {
			state.recent = action.payload;
		}
	}
});

export const { newRank, setRank } = rankSlice.actions;

export default rankSlice.reducer;
