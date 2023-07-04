import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import LoginLayout from "../layouts/LoginLayout";
import Main from "../pages/Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import NewQuestion from "../pages/NewQuestion/NewQuestion";
import Comments from "../pages/Comments/Comments"; // fix this

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/login";
export const MAIN_ROUTE = "/";
export const PROFILE_ROUTE = "/profile";
export const COMMENTS_ROUTE = "/questions/:id/comments"; //fix this
export const NEW_QUESTION_ROUTE = "/new";

export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
  ],
};

export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: NEW_QUESTION_ROUTE,
      Component: NewQuestion,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
    },
  ],
};
