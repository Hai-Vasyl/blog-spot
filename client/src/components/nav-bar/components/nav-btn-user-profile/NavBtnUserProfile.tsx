import React from 'react';

import UserAvatar from '../../../user-avatar/UserAvatar';
import { CascadeStyle, IStyle } from '../../../../helpers/cascade-style.class';
import style from './nav-btn-user-profile.module.scss';

interface INavBtnUserProfileProps {
  avatar: string;
  color: string;
  styles?: IStyle[];
}

const NavBtnUserProfile: React.FC<INavBtnUserProfileProps> = ({
  avatar,
  color,
  styles,
}) => {
  const s = new CascadeStyle(style, styles);

  return (
    <button className={s.getClass('btn-user-avatar')}>
      <UserAvatar avatar={avatar} color={color} styles={s.getCascade()} />
    </button>
  );
};

export default NavBtnUserProfile;
