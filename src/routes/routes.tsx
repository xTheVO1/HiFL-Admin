import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import { Dashboard } from "../views/dashboard";
import { PrivateRoute } from "./privateRoutes";
import TeamManager from "../views/teams";
import { Players } from "../views/players";
import { UpdateOfficial } from "../views/players/editOfficial";
import { AddPlayer } from "../views/players/createPlayer";
import { UpdatePlayer } from "../views/players/editPlayer";
import {Guidelines} from "../views/guidelines";
import Institution from "../views/institutions";
import Leagues from "../views/leagues";
import Season from "../views/seasons";
import Setting from "../views/settings";
import User from "../views/user";
import { AddInstitution } from "../views/institutions/createInstitution";
import { AddLeague } from "../views/leagues/createLeague";
import { AddSeason } from "../views/seasons/createSeason";
function AppRoutes() {

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/register-player" element={<AddPlayer />} />
        <Route path="/register-official" element={<AddPlayer />} />
        <Route path="/users" element={<User />} />
        <Route path="/seasons" element={<Season />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/institutions" element={<Institution />} />
        <Route path="/create-institution" element={<AddInstitution />} />
        <Route path="/create-league" element={<AddLeague />} />
        <Route path="/create-season" element={<AddSeason />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/official/:id" element={<UpdateOfficial />} />
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
