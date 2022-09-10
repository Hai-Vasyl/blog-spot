import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RequestMethodEnum } from '../enums/request-method.enum';
import { alterData, fetchData, IFetchProps } from './fetch-data';

interface ICreateAsyncThunk {
  name: string;
  payload: IFetchProps;
}

export interface IAddThunkInput<S> extends ICreateAsyncThunk {
  fetchFullfilled: (state: S, payload: any) => void;
  fetchRejected: (state: S, payload: any) => void;
}

interface IThunkInput<S> {
  name: string;
  handler: AsyncThunk<any, any, {}>;
  fetchFullfilled: (state: S, payload: any) => void;
  fetchRejected: (state: S, payload: any) => void;
}

class Thunk<S> {
  handler: AsyncThunk<any, any, {}>;
  fetchFullfilled: (state: S, payload: any) => void;
  fetchRejected: (state: S, payload: any) => void;
  name: string;

  public constructor({
    name,
    handler,
    fetchFullfilled,
    fetchRejected,
  }: IThunkInput<S>) {
    this.name = name;
    this.handler = handler;
    this.fetchFullfilled = fetchFullfilled;
    this.fetchRejected = fetchRejected;
  }
}

class DefaultThunkState {
  public loading = false;
}

export class Slice<T> {
  name: string;
  state: T & DefaultThunkState & any;
  reducers: any;
  thunks: Thunk<any>[];
  slice: any;

  public constructor(name: string, state: T, reducers?: any) {
    this.name = name;
    this.state = { ...new DefaultThunkState(), ...state };
    this.reducers = reducers || {};
    this.thunks = [];
  }

  private createAsyncThunk({
    name,
    payload: { url, isFormData, method },
  }: ICreateAsyncThunk) {
    return createAsyncThunk(
      `${this.name}/${name}`,
      async (body: any, { rejectWithValue, fulfillWithValue }) => {
        try {
          let res: any;

          if (method === RequestMethodEnum.GET) {
            res = await fetchData(url);
          } else {
            res = await alterData({
              url,
              method,
              body,
              isFormData,
            });
          }

          return fulfillWithValue(res);
        } catch (errors) {
          return rejectWithValue(errors);
        }
      },
    );
  }

  public addThunk({
    name,
    payload,
    fetchFullfilled,
    fetchRejected,
  }: IAddThunkInput<typeof this.state>) {
    const handler = this.createAsyncThunk({ name, payload });

    const thunk = new Thunk<typeof this.state>({
      name,
      handler,
      fetchFullfilled,
      fetchRejected,
    });

    this.thunks.push(thunk);
  }

  private fetchPending(state: typeof this.state) {
    Object.assign(state, {
      loading: true,
    });
  }

  private fetchSealing(state: typeof this.state) {
    Object.assign(state, {
      loading: false,
    });
  }

  public createSlice() {
    const slice = {
      name: this.name,
      initialState: this.state,
      reducers: this.reducers,
    };

    if (this.thunks?.length) {
      Object.assign(slice, {
        extraReducers: (builder: any) => {
          this.thunks.forEach((thunk) => {
            builder.addCase(thunk.handler.pending, this.fetchPending);

            builder.addCase(
              thunk.handler.fulfilled,
              (state: typeof this.state, payload: any) => {
                this.fetchSealing(state);

                thunk.fetchFullfilled(state, payload);
              },
            );

            builder.addCase(
              thunk.handler.rejected,
              (state: typeof this.state, payload: any) => {
                this.fetchSealing(state);

                thunk.fetchRejected(state, payload);
              },
            );
          });
        },
      });
    }

    return createSlice(slice);
  }

  public getThunks() {
    return this.thunks.reduce((accumulator: any, thunk) => {
      accumulator[thunk.name] = thunk.handler;

      return accumulator;
    }, {});
  }
}
