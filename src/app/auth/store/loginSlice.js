import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitLogin = ({ email, password }) => async dispatch => {
	return jwtService
		.signInWithEmailAndPassword(email, password)
		.then(user => {		
			
			const user_data = {
				uuid: user.uuid,
				from: 'custom-db',
				// password: 'admin',
				role: 'admin',
				data: {
					displayName: '',
					photoURL: '',
					email: user.email,
					settings: {
						layout: {
							style: 'layout1',
							config: {
								scroll: 'content',
								navbar: {
									display: true,
									folded: false,
									position: 'left'
								},
								toolbar: {
									display: true,
									style: 'fixed',
									position: 'below'
								},
								footer: {
									display: true,
									style: 'fixed',
									position: 'below'
								},
								mode: 'fullwidth'
							}
						},
						customScrollbars: true,
						theme: {
							main: 'light5',
							navbar: 'light5',
							toolbar: 'light5',
							footer: 'light5'
						}
					},
					shortcuts: ['calendar', 'mail', 'contacts']
				}
			}
			dispatch(setUserData(user_data));

			return dispatch(loginSuccess());
		})
		.catch(error => {
			return dispatch(loginError(error));
		});
};

export const submitLoginWithFireBase = ({ username, password }) => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	return firebaseService.auth
		.signInWithEmailAndPassword(username, password)
		.then(() => {
			return dispatch(loginSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				username: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(loginError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const loginSlice = createSlice({
	name: 'auth/login',
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.success = true;
		},
		loginError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
