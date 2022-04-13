import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import CadastroConsulta from "./pages/CadastroConsulta/CadastroConsulta";
import CadastroPaciente from "./pages/CadastroPaciente/CadastroPaciente";
import ListarConsultas from "./pages/ListarConsultas/ListarConsultas";
import ListarPacientes from "./pages/ListarPacientes/ListarPacientes";
import Dashboard from "./components/Dashboard/Dashboard";
import PesquisarPaciente from "./pages/PesquisarPaciente/PesquisarPaciente";
import PesquisarConsulta from "./pages/PesquisarConsulta/PesquisarConsulta";

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = true;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default function RoutesWay() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="*"
          element={
            <RequireAuth redirectTo="/">
              <Routes>
                <Route path="/" element={< Dashboard />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/cadastrar-consulta" element={<CadastroConsulta />} />
                  <Route path="/cadastrar-paciente" element={<CadastroPaciente />} />
                  <Route path="/listar-consultas" element={<ListarConsultas />} />
                  <Route path="/listar-pacientes" element={<ListarPacientes />} />
                  <Route path="/pesquisar-paciente" element={<PesquisarPaciente />} />
                  <Route path="/pesquisar-consulta" element={<PesquisarConsulta />} />
                </Route>
              </Routes>
            </RequireAuth>
          }
        />
      </Routes>
    </ BrowserRouter>
  );
};
