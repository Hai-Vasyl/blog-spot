import { PayloadAction } from '@reduxjs/toolkit';
import { SliceFactory } from '../../redux/slice-factory.class';

interface IActivatePayload {
  element: any;
}

interface PopupState {
  active: boolean;
  element: any;
}

const state: PopupState = {
  active: false,
  element: () => null,
};

export default new SliceFactory({
  name: 'popup',
  state,
  reducers: {
    activatePopup: (
      state: PopupState,
      { payload }: PayloadAction<IActivatePayload>,
    ) => {
      state.active = true;
      state.element = payload.element;
    },
    deactivatePopup: (state: PopupState) => {
      state.active = false;
      state.element = () => null;
    },
  },
}).init();
