import React from 'react';
import { Link } from 'react-router-dom';
import { RoleEnum } from '../../enums/role.enum';

import logotype from '../../images/blog-spot-logotype.svg';
import NavBtnUserProfile from './components/nav-btn-user-profile/NavBtnUserProfile';
import NavButton from './components/nav-button/NavButton';
import NavDropdownButton from './components/nav-dropdown-button/NavDropdownButton';
import NavDropdownLink from './components/nav-dropdown-link/NavDropdownLink';
import NavDropdown from './components/nav-dropdown/NavDropdown';
import NavLink from './components/nav-link/NavLink';
import useFormAuth from '../form-auth/hooks/useFormAuth';
import NavBtnIcon from './components/nav-btn-icon/NavBtnIcon';

import { CascadeStyle } from '../../helpers/cascade-style.class';
import style from './navbar.module.scss';

const Navbar: React.FC = () => {
  const s = new CascadeStyle(style);

  const { handleActivateAuthForm } = useFormAuth();

  const isAuth = false;
  const user = {
    color: 'coral',
    avatar: '',
    _id: String(Date.now()),
    role: RoleEnum.ADMIN,
  };

  return (
    <div className={s.getClass('nav')}>
      <Link to="/" className={s.getClass('nav__logo')}>
        <img src={logotype} alt="Blog-Spot logotype" />
      </Link>

      <div className={s.getClass('nav__main')}>
        <NavLink to="/search" icon="search" name="Search" />
        <NavLink to="/categories" icon="grid_view" name="Categories" />
        {isAuth && (
          <NavLink to="/content" icon="add_circle" name="Create Content" />
        )}
        <NavDropdown button={<NavBtnIcon icon="more_horiz" />}>
          {isAuth && (
            <NavDropdownLink
              to="/settings"
              icon="manage_accounts"
              name="Settings"
            />
          )}
          <NavDropdownLink to="/about" icon="contact_support" name="About US" />
          <NavDropdownLink
            to="/tips"
            icon="tips_and_updates"
            name="Tips & Tricks"
          />
        </NavDropdown>
      </div>

      {isAuth ? (
        <NavDropdown
          button={<NavBtnUserProfile avatar={user.avatar} color={user.color} />}
        >
          <NavDropdownLink
            to={`/${user._id}`}
            icon="account_circle"
            name="Profile"
            end
          />
          <NavDropdownLink
            to={`/${user._id}/contents`}
            icon="newspaper"
            name="Contents"
          />
          <NavDropdownLink
            to={`/${user._id}/files`}
            icon="home_storage"
            name="Files"
          />
          <NavDropdownLink
            to={`/${user._id}/bookmarks`}
            icon="bookmarks"
            name="Bookmarks"
          />
          <NavDropdownLink
            to={`/${user._id}/followers`}
            icon="group_add"
            name="Followers"
          />
          <NavDropdownLink
            to={`/${user._id}/who-follow`}
            icon="group"
            name="Following Users"
          />
          {[RoleEnum.ADMIN, RoleEnum.MODERATOR].includes(user.role) && (
            <NavDropdownLink
              to={`/category`}
              icon="library_add"
              name="Create Category"
            />
          )}
          <NavDropdownButton icon="logout" name="Log Out" onClick={() => {}} />
        </NavDropdown>
      ) : (
        <NavButton
          icon="login"
          name="Log In"
          onClick={handleActivateAuthForm}
        />
      )}
    </div>
  );
};

export default Navbar;
