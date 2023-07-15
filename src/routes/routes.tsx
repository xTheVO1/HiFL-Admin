import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import { PrivateRoute } from "./privateRoutes";
import TeamManager from "../views/teams";
import { Players } from "../views/players";
import { UpdateOfficial } from "../views/players/editOfficial";
import { AddPlayer } from "../views/players/createPlayer";
import { UpdatePlayer } from "../views/players/editPlayer";
import { PlayersV2 } from "../views/players_v2";
import { AddPlayerV2 } from "../views/players_v2/createPlayer_v2";
import { UpdatePlayerV2 } from "../views/players_v2/editPlayer_v2";
import { Guidelines } from "../views/guidelines";
import Institution from "../views/institutions";
import Leagues from "../views/leagues";
import Season from "../views/seasons";
import CreateSetting from "../views/settings";
import Setting from "../views/settings/viewSettings";
import EditSetting from "../views/settings/editSetting";
import User from "../views/user";
import { AddInstitution } from "../views/institutions/createInstitution";
import { AddLeague } from "../views/leagues/createLeague";
import { AddSeason } from "../views/seasons/createSeason";
import ViewSeason from "../views/seasons/viewSeason";
import { AddLeagueStage } from "../views/leagues/createLeagueStage";
import Store from "../views/store";
import Volunteers from "../views/volunteers";
import EditVolunteer from "../views/volunteers/editVolunteer";
import EditOrder from "../views/store/editOrder";
import ViewUser from "../views/user/viewUser";
import Fans from "../views/fans";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/register-player" element={<AddPlayer />} />
        <Route path="/register-official" element={<AddPlayer />} />
        <Route path="/user/:id" element={<ViewUser />} />
        <Route path="/users" element={<User />} />
        <Route path="/seasons" element={<Season />} />
        <Route path="/seasons/:id" element={<ViewSeason />} />
        <Route path="/leagues/:id" element={<Leagues />} />
        <Route path="/institutions" element={<Institution />} />
        <Route path="/create-institution" element={<AddInstitution />} />
        <Route path="/create-league/:id" element={<AddLeague />} />
        <Route path="/create-league-stage/:id" element={<AddLeagueStage />} />
        <Route path="/create-season" element={<AddSeason />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/create-setting" element={<CreateSetting />} />
        <Route path="/edit-setting/:id" element={<EditSetting />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/official/:id" element={<UpdateOfficial />} />
        <Route path="/player/:id" element={<UpdatePlayer />} />
        <Route path="/players" element={<Players />} />
        <Route path="/register-player" element={<AddPlayerV2 />} />
        <Route path="/players_v2" element={<PlayersV2 />} />
        <Route path="/player_v2/:id" element={<UpdatePlayerV2 />} />
        <Route path="/dashboard" element={<Guidelines />} />
        <Route path="/teams" element={<TeamManager />} />
        <Route path="/order/edit/:id" element={<EditOrder />} />
        <Route path="/store" element={<Store />} />
        <Route path="/volunteer/edit/:id" element={<EditVolunteer />} />
        <Route path="/volunteer" element={<Volunteers />} />
        <Route path="/fans" element={<Fans />} />
      </Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
