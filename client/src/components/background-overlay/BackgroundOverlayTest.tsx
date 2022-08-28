import { CascadeStyle } from '../../helpers/cascade-style.class';
import BackgroundOverlay from './BackgroundOverlay';

import style from './background-overlay-test.module.scss';

const BackgroundOverlayTest = () => {
  const s = new CascadeStyle(style);

  return (
    <div className={s.getClass('overlay-test')}>
      <span className={s.getClass('overlay-test__name')}>
        BackgroundOverlayTest
      </span>
      <BackgroundOverlay styles={s.getCascade()} />
    </div>
  );
};

export default BackgroundOverlayTest;
