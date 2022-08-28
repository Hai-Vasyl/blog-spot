import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  active: boolean;
  element: any;
}

interface IActivatePayload {
  element: any;
}

const initialState: PopupState = {
  active: false,
  element: () => null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    activatePopup: (state, action: PayloadAction<IActivatePayload>) => {
      state.active = true;
      state.element = action.payload.element;
    },
    deactivatePopup: (state) => {
      state.active = false;
      state.element = () => null;
    },
  },
});

export const { activatePopup, deactivatePopup } = popupSlice.actions;
export default popupSlice.reducer;
