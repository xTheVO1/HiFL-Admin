import { Routes, Route } from "react-router-dom";
import Login from "../views/Login";
import {Dashboard} from "../views/dashboard";
import { PrivateRoute } from "./privateRoutes";
import TeamManager from "../views/team-manager";
import { Players } from "../views/players";
function AppRoutes() {

    return (
        <Routes>
               <Route element={<PrivateRoute />} >
                <Route path="/players" element={<Players/>} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/team-manager" element={<TeamManager/>} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;