import React from 'react';
import useStore from '../../hooks/useStore';
import ButtonAction from '../button-action/ButtonAction';
import { deactivatePopup } from './popup.slice';

import style from './popup.module.scss';
import { CascadeStyle } from '../../helpers/cascade-style.class';

const Popup: React.FC = () => {
  const s = new CascadeStyle(style);

  const { state, dispatch } = useStore();

  return (
    <div className={s.getClass('popup', state.popup.active && 'popup--active')}>
      <ButtonAction
        icon="close"
        onClick={() => dispatch(deactivatePopup())}
        styles={s.getCascade()}
      />
      {<state.popup.element />}
    </div>
  );
};

export default Popup;
