import { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routes } from "../routeConfig";
import Loading from "../components/Loading";

const Router = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loading />}>
      <Routes location={location}>
        {routes.map(({ path, element: Component, title }) => (
          <Route
            key={path}
            path={path}
            element={
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                <Component />
              </div>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Router;
