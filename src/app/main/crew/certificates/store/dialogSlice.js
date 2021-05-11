import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';

const dialogSlice = createSlice({
	name: 'crew/rank/dialog',
	initialState: {
		open: false,
		type: "New"
	},
	reducers: {
		newRank: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					id: FuseUtils.generateGUID(),
					name: '',
					handle: '',
					description: '',
					categories: [],
					tags: [],
					images: [],
					priceTaxExcl: 0,
					priceTaxIncl: 0,
					taxRate: 0,
					comparedPrice: 0,
					quantity: 0,
					sku: '',
					width: '',
					height: '',
					depth: '',
					weight: '',
					extraShippingFee: 0,
					active: true
				}
			})
		},
		openDialog: (state, action) => {
			state.open = true;
			state.type = action.payload.type;
		},
		closeDialog: (state, action) => {
			state.open = false;
		}
	}
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
