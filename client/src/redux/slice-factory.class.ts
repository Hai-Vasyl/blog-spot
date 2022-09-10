import { IAddThunkInput, Slice } from './redux-slice.class';

interface ISliceFactoryInput {
  name: string;
  state: any;
  reducers?: any;
  thunks?: IAddThunkInput<any>[];
}

export class SliceFactory {
  slice: Slice<any>;
  thunks: IAddThunkInput<any>[] | undefined;

  public constructor({ name, state, reducers, thunks }: ISliceFactoryInput) {
    this.slice = new Slice<any>(name, state, reducers);
    this.thunks = thunks;
  }

  private addThunks() {
    this.thunks?.forEach((thunk: IAddThunkInput<any>) => {
      this.slice.addThunk(thunk);
    });
  }

  public init() {
    this.addThunks();

    const slice = this.slice.createSlice();
    const api = this.slice.getThunks();

    const reducer = slice.reducer;
    const act = slice.actions as any;

    return {
      reducer,
      act,
      api,
    };
  }
}
