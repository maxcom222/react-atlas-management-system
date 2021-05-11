import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// values for dialog.... 
export const getVesselTypes = createAsyncThunk('crew/getVesselTypes', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/vessel-types`, { params });
	const data = await response.data;
	return data;
});

export const getEngTypes = createAsyncThunk('crew/getEngTypes', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/eng-types`, { params });
	const data = await response.data;
	return data;
});

export const getNationalities = createAsyncThunk('crew/getNationalities', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/nationalities`, { params });
	const data = await response.data;
	return data;
});

export const getSoffReasons = createAsyncThunk('crew/getSoffReasons', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/soff-reasons`, { params });
	const data = await response.data;
	return data;
});

export const getVessels = createAsyncThunk('crew/getVessels', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/vessels`, { params });
	const data = await response.data;
	return data;
});

export const getMngAgents = createAsyncThunk('crew/getMngAgents', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/mng-agents`, { params });
	const data = await response.data;
	return data;
});

export const getCurrencies = createAsyncThunk('crew/getCurrencies', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-currencies`, { params });
	const data = await response.data;
	return data;
});

export const getRelations = createAsyncThunk('crew/getRelations', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-relations`, { params });
	const data = await response.data;
	return data;
});

export const getEmpStatus = createAsyncThunk('crew/getEmpStatus', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-empstatus`, { params });
	const data = await response.data;
	return data;
});

export const getReligions = createAsyncThunk('crew/getReligions', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-religions`, { params });
	const data = await response.data;
	return data;
});

export const getSexTypes = createAsyncThunk('crew/getSexTypes', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-sextypes`, { params });
	const data = await response.data;
	return data;
});

export const getMaritalStatus = createAsyncThunk('crew/getMaritalStatus', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-maritalstatus`, { params });
	const data = await response.data;
	return data;
});

export const getManagers = createAsyncThunk('crew/getManagers', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/managers`, { params });
	const data = await response.data;
	return data;
});

export const getPort = createAsyncThunk('crew/getPort', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/prm-port`, { params });
	const data = await response.data;
	return data;
});



//////////////

export const getCrewCerts = createAsyncThunk('crew/getCrewCerts', async (params, {dispatch, getState}) => {
    const curState = getState();
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-certs`, { params });
	const data = await response.data;

	return data;
});

export const getCountries = createAsyncThunk('crew/getCountries', async (params, {dispatch, getState}) => {
	const response = await axios.get(`/api/crew/countries`, { params });
	const data = await response.data;

	return data;
});

export const updateCertificate = createAsyncThunk('crew/updateCrewCerts', async (cert, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-certs/${cert.id}`, cert.data);
	const data = await response.data;

	dispatch(getCrewCerts());
	return data;
});

export const deleteCertificate = createAsyncThunk('crew/deleteCrewCerts', async (cert, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-certs/${cert.id}`, cert);
	const data = await response.data;

	dispatch(getCrewCerts());
	return data;
});

//  previous services
export const getPrevServs = createAsyncThunk('crew/getPrevServs', async (params, {dispatch, getState}) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-pr-servs`, { params });
	const data = await response.data;

	return data;
});

export const addPrevServ = createAsyncThunk('crew/addPrevServ', async (prev_serv, { dispatch, getState }) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    prev_serv = {
		...prev_serv,
        crew_id: crewId
	};
	
	const response = await axios.post(`/api/crew/crew-pr-servs`, prev_serv);
	const data = await response.data;
	dispatch(getPrevServs());
	return data;
});

export const updatePrevServ = createAsyncThunk('crew/updatePrevServ', async (prev_serv, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-pr-serv/${prev_serv.id}`, prev_serv);
	const data = await response.data;
	dispatch(getPrevServs());
	return data;
});


export const deletePrevServ = createAsyncThunk('crew/deletePrevServ', async (prev_serv, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-pr-serv/${prev_serv.id}`);
	const data = await response.data;

	dispatch(getPrevServs());
	return data;
});

// company previous services...
export const getCPrevServs = createAsyncThunk('crew/getCPrevServs', async (params, {dispatch, getState}) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-trans`, { params });
	const data = await response.data;
	return data;
});

export const addCPrevServ = createAsyncThunk('crew/addCPrevServ', async (cprev_serv, { dispatch, getState }) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    cprev_serv = {
		...cprev_serv,
        crew_id: crewId
	};
	
	const response = await axios.post(`/api/crew/crew-trans`, cprev_serv);
	const data = await response.data;
	dispatch(getCPrevServs());
	return data;
});

export const updateCPrevServ = createAsyncThunk('crew/updateCPrevServ', async (cprev_serv, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-trans/${cprev_serv.id}`, cprev_serv);
	const data = await response.data;
	dispatch(getCPrevServs());
	return data;
});

export const deleteCPrevServ = createAsyncThunk('crew/deleteCPrevServ', async (cprev_serv, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-trans/${cprev_serv.id}`);
	const data = await response.data;

	dispatch(getCPrevServs());
	return data;
});

// Allottees...
export const getAllottees = createAsyncThunk('crew/getAllottees', async (params, {dispatch, getState}) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-allottees`, { params });
	const data = await response.data;
	return data;
});

export const addAllottee = createAsyncThunk('crew/addAllottee', async (params, { dispatch, getState }) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
		...params,
        crew_id: crewId
	};
	
	const response = await axios.post(`/api/crew/crew-allottees`, params);
	const data = await response.data;
	dispatch(getAllottees());
	return data;
});


export const updateAllottee = createAsyncThunk('crew/updateAllottee', async (param, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-allottees/${param.id}`, param);
	const data = await response.data;
	dispatch(getAllottees());
	return data;
});

export const deleteAllottee = createAsyncThunk('crew/deleteAllottee', async (params, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-allottees/${params.id}`);
	const data = await response.data;

	dispatch(getAllottees());
	return data;
});

// Appraisals...
export const getAppraisals = createAsyncThunk('crew/getAppraisals', async (params, {dispatch, getState}) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-appraisals`, { params });
	const data = await response.data;
	return data;
});

export const addAppraisals = createAsyncThunk('crew/addAppraisals', async (appraisal, { dispatch, getState }) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
	const crewId = curCrew.id;
	
	const params = {
		crewId: crewId
	}
	
	const response = await axios.post(`/api/crew/crew-appraisals`, appraisal, {
		params: params
	});
	const data = await response.data;
	dispatch(getAppraisals());
	return data;
});


export const updateAppraisals = createAsyncThunk('crew/updateAppraisals', async (param, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-appraisals/${param.id}`, param.data);
	const data = await response.data;
	dispatch(getAppraisals());
	return data;
});

export const deleteAppraisals = createAsyncThunk('crew/deleteAppraisals', async (params, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-appraisals/${params.id}`);
	const data = await response.data;

	dispatch(getAppraisals());
	return data;
});


// Crew NOK...
export const getNOK = createAsyncThunk('crew/getNOK', async (params, {dispatch, getState}) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
        crewId: crewId
    };
	const response = await axios.get(`/api/crew/crew-nok`, { params });
	const data = await response.data;
	return data;
});

export const addNOK = createAsyncThunk('crew/addNOK', async (params, { dispatch, getState }) => {
	const curState = getState();	
    const curCrew = curState.crewApp.crew.recent;
    const crewId = curCrew.id;
    
    params = {
		...params,
        crew_id: crewId
	};
	
	const response = await axios.post(`/api/crew/crew-nok`, params);
	const data = await response.data;
	dispatch(getNOK());
	return data;
});


export const updateNOK = createAsyncThunk('crew/updateNOK', async (param, { dispatch, getState }) => {
	const response = await axios.put(`/api/crew/crew-nok/${param.id}`, param);
	const data = await response.data;
	dispatch(getNOK());
	return data;
});

export const deleteNOK = createAsyncThunk('crew/deleteNOK', async (params, { dispatch, getState }) => {
	const response = await axios.delete(`/api/crew/crew-nok/${params.id}`);
	const data = await response.data;

	dispatch(getNOK());
	return data;
});


const detailsSlice = createSlice({
	name: 'crew/crewDetails',
	initialState: {
		certificates: {
			list: [],
			recent: null
		},
		countries: [],
		prev_services: {
			list: [],
			recent: null
		},
		vessel_types: {
			list: []
		},
		eng_types: {
			list: []
		},
		nationalities: {
			list: []
		},
		soff_reasons: {
			list: []
		},
		cprev_services: {
			list: [],
			recent: null
		},
		vessels: {
			list: []
		},
		mng_agents : {
			list: []
		},
		prm_currencies: {
			list: []
		},
		relations: {
			list: []
		},
		allottees: {
			list: [],
			recent: null,
		},
		appraisals: {
			list: [],
			recent: null
		},
		employ_status: {
			list: []
		},
		nok: {
			list: [],
			recent: null
		},
		religions: {
			list: []
		},
		sextypes: {
			list: []
		},
		marital_status: {
			list: []
		},
		managers: {
			list: []
		},
		port: {
			list: []
		}
	},
	reducers: {
		setCertificate: (state, action) => {
			state.certificates.recent = action.payload;
		},
		setPrevServ: (state, action) => {
			state.prev_services.recent = action.payload;
		},
		setCPrevServ: (state, action) => {
			state.cprev_services.recent = action.payload;
		},
		setAllottee: (state, action) => {
			state.allottees.recent = action.payload;
		},
		setAppraisals: (state, action) => {
			state.appraisals.recent = action.payload;
		},
		setNOK: (state, action) => {
			state.nok.recent = action.payload;
		},
	},
	extraReducers: {
		[getCrewCerts.fulfilled]: (state, action) => {
			state.certificates.list = action.payload;
		},
		[getCountries.fulfilled]: (state, action) => {
			state.countries = action.payload
		},
		[getPrevServs.fulfilled]: (state, action) => {
			state.prev_services.list = action.payload
		},		
		[getCPrevServs.fulfilled]: (state, action) => {
			state.cprev_services.list = action.payload;
		},
		[getAllottees.fulfilled]: (state, action) => {
			state.allottees.list = action.payload
		},
		[getAppraisals.fulfilled]: (state, action) => {
			state.appraisals.list = action.payload
		},
		[getNOK.fulfilled]: (state, action) => {
			state.nok.list = action.payload
		},


		[getVesselTypes.fulfilled]: (state, action) => {
			state.vessel_types.list = action.payload
		},
		[getEngTypes.fulfilled]: (state, action) => {
			state.eng_types.list = action.payload
		},
		[getNationalities.fulfilled]: (state, action) => {
			state.nationalities.list = action.payload
		},
		[getSoffReasons.fulfilled]: (state, action) => {
			state.soff_reasons.list = action.payload
		},
		[getVessels.fulfilled]: (state, action) => {
			state.vessels.list = action.payload
		},
		[getMngAgents.fulfilled]: (state, action) => {
			state.mng_agents.list = action.payload
		},
		[getCurrencies.fulfilled]: (state, action) => {
			state.prm_currencies.list = action.payload
		},
		[getRelations.fulfilled]: (state, action) => {
			state.relations.list = action.payload
		},
		[getEmpStatus.fulfilled]: (state, action) => {
			state.employ_status.list = action.payload
		},
		[getReligions.fulfilled]: (state, action) => {
			state.religions.list = action.payload
		},	
		[getSexTypes.fulfilled]: (state, action) => {
			state.sextypes.list = action.payload
		},	
		[getMaritalStatus.fulfilled]: (state, action) => {
			state.marital_status.list = action.payload
		},	
		[getManagers.fulfilled]: (state, action) => {
			state.managers.list = action.payload
		},	
		[getPort.fulfilled]: (state, action) => {
			state.port.list = action.payload
		},	
	}
});

export const { setCertificate, setPrevServ, setCPrevServ, setAllottee, setAppraisals, setNOK } = detailsSlice.actions;

export default detailsSlice.reducer;
