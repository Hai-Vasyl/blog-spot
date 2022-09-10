import React from 'react';

import useStore from '../../hooks/useStore';
import ButtonAction from '../button-action/ButtonAction';
import popupSlice from './popup.slice';
import { CascadeStyle } from '../../helpers/cascade-style.class';
import style from './popup.module.scss';

const { act } = popupSlice;

const Popup: React.FC = () => {
  const s = new CascadeStyle(style);

  const { state, call } = useStore();
  return (
    <div className={s.getClass('popup', state.popup.active && 'popup--active')}>
      <ButtonAction
        icon="close"
        onClick={() => call(act.deactivatePopup())}
        styles={s.getCascade()}
      />
      {<state.popup.element />}
    </div>
  );
};

export default Popup;
