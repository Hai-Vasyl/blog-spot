import React from 'react';
import { CascadeStyle, IStyle } from '../../helpers/cascade-style.class';

import style from './user-avatar.module.scss';

interface IUserAvatarProp {
  avatar: string;
  color: string;
  styles?: IStyle[];
}

const UserAvatar: React.FC<IUserAvatarProp> = ({ avatar, color, styles }) => {
  const s = new CascadeStyle(style, styles);

  return avatar.length ? (
    <img src={avatar} alt="User avatar" className={s.getClass('avatar')} />
  ) : (
    <span data-color={color} className={s.getClass('avatar')}></span>
  );
};

export default UserAvatar;
