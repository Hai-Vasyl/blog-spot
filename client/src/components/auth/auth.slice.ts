import { PayloadAction } from '@reduxjs/toolkit';
import { IError } from '../../common/interfaces/main';
import { RequestMethodEnum } from '../../enums/request-method.enum';
import { SliceFactory } from '../../redux/slice-factory.class';

interface IUser {
  _id: string;
}

interface IClearMessage {
  field: string;
}

interface AuthState {
  isAuth: boolean;
  user: IUser | undefined;
  errors: IError[];
}

const state: AuthState = {
  isAuth: false,
  user: undefined,
  errors: [],
};

const fetchFullfilled = (state: AuthState, { payload }: any) => {
  localStorage.setItem('token', payload.accessToken);
  Object.assign(state, {
    isAuth: true,
  });
};

const fetchRejected = (state: AuthState, { payload }: any) => {
  Object.assign(state, {
    errors: payload,
  });
};

export default new SliceFactory({
  name: 'auth',
  state,
  reducers: {
    clearMessage: (
      state: AuthState,
      { payload }: PayloadAction<IClearMessage>,
    ) => {
      state.errors = state.errors.map((error) => {
        console.log(error.field, payload.field);
        if (error.field === payload.field) {
          error = { ...error, message: '' };
        }

        return error;
      });
      console.log('sdfsdf', payload);
      // state.errors = [...state.errors].map((err) => ({ ...err }));
    },
  },
  thunks: [
    {
      name: 'login',
      payload: { url: '/users/login', method: RequestMethodEnum.POST },
      fetchFullfilled,
      fetchRejected,
    },
    {
      name: 'register',
      payload: { url: '/users/register', method: RequestMethodEnum.POST },
      fetchFullfilled,
      fetchRejected,
    },
  ],
}).init();
