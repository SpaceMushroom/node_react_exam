import { useContext } from "react";
import { Routes as RoutesWrapper, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { loginRoutes, authenticatedRoutes } from "../routes/const";

const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { Layout, routes } = isLoggedIn ? authenticatedRoutes : loginRoutes;

  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
              <Component />
            </Layout>
          }
        />
      ))}
    </RoutesWrapper>
  );
};

export default Routes;
