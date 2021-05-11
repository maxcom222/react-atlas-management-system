import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCertCategs = createAsyncThunk('crew/certificates/getCertCategs', async params => {
	const response = await axios.get('/api/crew/cert-categs', { params });
	const data = await response.data;

	return data;
});

export const getCertificates = createAsyncThunk('crew/certificates/getCertificates', async (category) => {
	const params = {
		'cert-categ-id': category.id
	};
	const response = await axios.get('/api/crew/certs', { params });
	const data = await response.data;

	return data;
});

export const addCertificate = createAsyncThunk('crew/certificates/addCertificate', async ({certificate, category}, {dispatch}) => {
	certificate.PCC_CODE = category.id;
	const response = await axios.post('/api/crew/certs', certificate);
	const data = await response.data;

	dispatch(getCertificates(category));
	return data;
});

export const updateCertificate = createAsyncThunk('crew/certificate/updateCertificate', async ({certificate, category}, { dispatch }) => {
	const response = await axios.put(`/api/crew/certs/${certificate.id}`, certificate);
	const data = await response.data;

	dispatch(getCertificates(category));
	return data;
});

export const deleteCertificate = createAsyncThunk('crew/certificate/deleteCertificate', async ({certificate, category}, { dispatch }) => {
	const response = await axios.delete(`/api/crew/certs/${certificate.id}`, certificate);
	const data = await response.data;

	dispatch(getCertificates(category));
	return data;
});


const certificateSlice = createSlice({
	name: 'crew/certificates',
	initialState: {
		category: {
			list: [],
			recent: null,
		},
		list: [],
		recent: null,
	},
	reducers: {
		setCertCateg: (state, action) => {
			state.category.recent = action.payload;
		},
		setCertificate: (state, action) => {
			state.recent = action.payload;
		},
	},
	extraReducers: {
		[getCertCategs.fulfilled]: (state, action) => {
			state.category.list = action.payload;
		},
		[getCertificates.fulfilled]: (state, action) => {
			state.list = action.payload;
		},
	}
});

export const { setCertCateg, setCertificate } = certificateSlice.actions;

export default certificateSlice.reducer;
