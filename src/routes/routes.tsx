import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import { Dashboard } from "../views/dashboard";
import { PrivateRoute } from "./privateRoutes";
import TeamManager from "../views/teams";
import { Players } from "../views/players";
import { AddPlayer } from "../views/players/createPlayer";
import { UpdatePlayer } from "../views/players/editPlayer";
import {Guidelines} from "../views/guidelines";

function AppRoutes() {

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/register-player" element={<AddPlayer />} />
        <Route path="/register-official" element={<AddPlayer />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/player/:id" element={<UpdatePlayer />} />
        <Route path="/players" element={<Players />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teams" element={<TeamManager />} />
      </Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
