import React from 'react';
import useStore from '../../hooks/useStore';
import popupSlice from '../popup/popup.slice';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';

import style from './background-overlay.module.scss';

const { act } = popupSlice;

interface IBackgroundOverlayProps {
  styles?: IStyle[];
}

const BackgroundOverlay: React.FC<IBackgroundOverlayProps> = ({ styles }) => {
  const s = new CascadeStyle(style, styles);

  const { state, call } = useStore();

  return (
    <div
      onClick={() => call(act.deactivatePopup())}
      className={s.getClass(
        'overlay',
        state.popup.active ? 'overlay--active' : '',
      )}
    ></div>
  );
};

export default BackgroundOverlay;
