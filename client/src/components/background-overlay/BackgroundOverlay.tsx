import React from 'react';
import useStore from '../../hooks/useStore';
import { deactivatePopup } from '../popup/popup.slice';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';

import style from './background-overlay.module.scss';

interface IBackgroundOverlayProps {
  styles?: IStyle[];
}

const BackgroundOverlay: React.FC<IBackgroundOverlayProps> = ({ styles }) => {
  const s = new CascadeStyle(style, styles);

  const { state, dispatch } = useStore();

  return (
    <div
      onClick={() => dispatch(deactivatePopup())}
      className={s.getClass(
        'overlay',
        state.popup.active ? 'overlay--active' : '',
      )}
    >
      <div className={s.getClass('overlay__title')}>Lorem</div>
    </div>
    // <div
    //   onClick={() => dispatch(deactivatePopup())}
    //   className={`overlay ${state.popup.active && 'overlay--active'}`}
    // ></div>
  );
};

export default BackgroundOverlay;
