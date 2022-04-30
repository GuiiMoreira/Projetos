import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import PesquisarPaciente from "./pages/PesquisarPaciente/PesquisarPaciente";
import Signup from "./pages/Signup/Signup";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default function RoutesWay() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />

        <Route
          path="*"
          element={
            <RequireAuth redirectTo="/sign-in">
              <Routes>
                <Route path="/" element={< Dashboard />}>
                  <Route path="/pesquisar-consulta" element={<PesquisarPaciente />} />
                </Route>
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </ BrowserRouter>
  );
};
