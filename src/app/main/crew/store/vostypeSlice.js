import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVostypes = createAsyncThunk('crew/getVostypes', async (params) => {
    const response = await axios.get(`/api/crew/prm-vos-types`, {params});
    const data = await response.data;
    return data;
})

export const updateVostypes = createAsyncThunk('crew/updateVostypes', async (vostype, {dispatch}) => {
    const response = await axios.put(`/api/crew/prm-vos-types/${vostype.id}`, vostype);
    const data = await response.data;

    dispatch(getVostypes());
    return data;
})

export const addVostypes = createAsyncThunk('crew/addVostypes', async (vostype, {dispatch}) => {
    const response = await axios.post(`/api/crew/prm-vos-types`, vostype);
    const data = await response.data;

    dispatch(getVostypes());
    return data;
})

export const deleteVostypes = createAsyncThunk('crew/deleteVostypes', async (vostype, {dispatch}) => {
    const response = await axios.delete(`/api/crew/prm-vos-types/${vostype.id}`, vostype);
    const data = await response.data;

    dispatch(getVostypes());
    return data;
})


export const getAssignedRanksByVosTypeID = createAsyncThunk('crew/getAssignedRanks', async (params) => {
    const response = await axios.get(`/api/crew/prm-vos-type-ranks`, {params});
    const data = await response.data;
    return data;
})

export const assignRank2VosType = createAsyncThunk('crew/assignRank2VosType', async (params, { state, dispatch }) => {
    const response = await axios.post(`/api/crew/prm-vos-type-ranks`, params);
    const data = await response.data;

    const vostypeId = params.VOST_CODE;
    dispatch(getAssignedRanksByVosTypeID({
        vostypeId
    }))
    return data;
})

export const removeAssignedRanks = createAsyncThunk('crew/removeAssignedRanks', async (params, { getState, dispatch }) => {
    const response = await axios.delete(`/api/crew/prm-vos-type-ranks`, {
        data: params
    });
    const data = await response.data;
    const state = getState();
    const vostype = state.crewApp.vostype.recent;

    const vostypeId = vostype.id;
    dispatch(getAssignedRanksByVosTypeID({
        vostypeId
    }))
    return data;
})

const vostypeSlice = createSlice({
    name: 'crew/vostype',
    initialState: {
        list: [],
        recent: null,
        assigned_ranks: []
    },
    reducers: {
        setVostype: (state, action) => {
            state.recent = action.payload;
        }
    },
    extraReducers: {
        [getVostypes.fulfilled]: (state, action) => {
            state.list = action.payload;
        },
        [getAssignedRanksByVosTypeID.fulfilled]: (state, action) => {
            state.assigned_ranks = action.payload;
        }
        
    }
});

export const { setVostype } = vostypeSlice.actions;
export default vostypeSlice.reducer;