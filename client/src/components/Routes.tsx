import AboutUsPage from '../pages/about-us/AboutUsPage';
import BookmarksPage from '../pages/bookmarks/BookmarksPage';
import CategoryCreatePage from '../pages/category-create/CategoryCreatePage';
import CategoryEditPage from '../pages/category-edit/CategoryEditPage';
import ContentCategoriesPage from '../pages/content-categories/ContentCategoriesPage';
import ContentCreatePage from '../pages/content-create/ContentCreatePage';
import ContentEditPage from '../pages/content-edit/ContentEditPage';
import ContentPage from '../pages/content/ContentPage';
import ContentsPage from '../pages/contents/ContentsPage';
import FileCreatePage from '../pages/file-create/FileCreatePage';
import FileEditPage from '../pages/file-edit/FileEditPage';
import FilePage from '../pages/file/FilePage';
import FilesPage from '../pages/files/FilesPage';
import FollowersPage from '../pages/followers/FollowersPage';
import HomePage from '../pages/home/HomePage';
import SearchPage from '../pages/search/SearchPage';
import SettingsPage from '../pages/settings/SettingsPage';
import UserProfilePage from '../pages/user-profile/UserProfilePage';
import WhoFollowPage from '../pages/who-follow/WhoFollowPage';
import NotFoundPage from '../pages/not-found/NotFoundPage';

import { RoleEnum } from '../enums/role.enum';
import { Route } from '../common/classes/route.class';
import { renderRoutes } from '../helpers/render-routes';
import { Routes as WrapperRoutes } from 'react-router-dom';

const Routes: React.FC = () => {
  const userRole: RoleEnum = RoleEnum.ADMIN;

  const routes = [
    new Route('/', HomePage, 'Home Page'),
    new Route('/search', SearchPage, 'Search for Content, Files or User Page'),
    new Route('/categories', ContentCategoriesPage, 'Content Categories Page'),
    new Route('/about', AboutUsPage, 'About Us Page'),
    new Route('/settings', SettingsPage, 'Settings Page', [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.USER,
    ]),
    new Route(
      '/category',
      CategoryCreatePage,
      'Create new Content or File Category Page',
      [RoleEnum.ADMIN, RoleEnum.MODERATOR],
    ),
    new Route(
      '/category/:id',
      CategoryEditPage,
      'Category Editing of Content or File Page',
      [RoleEnum.ADMIN],
    ),
    new Route('/content', ContentCreatePage, 'Create new Content Page', [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.USER,
    ]),
    new Route('/content/:id', ContentPage, 'Content Page'),
    new Route('/content/:id/edit', ContentEditPage, 'Content Editing Page', [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.USER,
    ]),
    new Route('/file', FileCreatePage, 'Create new File Page', [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.USER,
    ]),
    new Route('/file/:id', FilePage, 'File Page'),
    new Route('/file/:id/edit', FileEditPage, 'Editing File Page', [
      RoleEnum.ADMIN,
      RoleEnum.MODERATOR,
      RoleEnum.USER,
    ]),
    new Route('/:id', UserProfilePage, 'User Profile Page'),
    new Route('/:id/followers', FollowersPage, 'User Followers Page'),
    new Route('/:id/who-follow', WhoFollowPage, 'Who Follow User Page'),
    new Route('/:id/bookmarks', BookmarksPage, 'User Bookmarks Page'),
    new Route('/:id/contents', ContentsPage, 'User Contents Page'),
    new Route('/:id/files', FilesPage, 'User Files Page'),
    new Route('*', NotFoundPage, 'Page not found (404)'),
  ];

  return <WrapperRoutes>{renderRoutes(userRole, routes)}</WrapperRoutes>;
};

export default Routes;
