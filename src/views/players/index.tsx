import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MdSchool } from "react-icons/md";
import moment from "moment";

// components and styles
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content, Table } from "./style";
import { PlayerCard } from "../../components/playerCard";
import { getPlayers } from "../../redux/actions/players";
import { getOfficials } from "../../redux/actions/officials";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import { getleagues } from "../../redux/actions/leagues";
const data: any = sessionStorage.getItem("userData");
const user = JSON.parse(data);

export const Players: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [activeTab, setActiveTab] = useState("PLAYERS");
  const [disable, setDisable] = useState(false);
  // Getting the team name and id
  const teamId = sessionStorage.getItem('Teamid');
  const teamName = sessionStorage.getItem('Teamname');


  // getting players and officials from redux store
  const store = useSelector((state: RootState) => state.player)
  const officialStore = useSelector((state: RootState) => state.officials)
  const { loading, players } = store;
  const { officials } = officialStore;
  const mainData = players && players ? players : [];
  const officialData = officials && officials ? officials : [];
  const items = useSelector((state: any) => state.leagues)
  const leaguesLoading = useSelector((state: any) => state.leagues.loading)
  const mainDataResult = items && items ? items.leagues: [];

  const addPlayer = () => {
    navigate("/register-player");
  };

  const addOfficial = () => {
    navigate("/register-official");
  }

  const viewTeams = () => {
    navigate("/teams");
  }

  useEffect(() => {
    if (teamId === "") {
      navigate("/dashboard");
    }

    dispatch(getPlayers(teamId));
    dispatch(getOfficials(teamId));
    dispatch(getleagues());
    
  }, [dispatch, teamId, navigate]);


  return (
    <>

        {loading ? <Loader /> :
      <Container>
        <Content>
          <Table className="padding">
            <div className="players-flex-start">
              <p onClick={viewTeams}><MdSchool /> ALL TEAMS </p>
              <p>|</p>
              <p className="active"> <MdSchool />{teamName}</p></div>
            <div className="players-flex-header">
              <p
               className={activeTab === "PLAYERS" ? "active" : ""} 
               onClick={() => setActiveTab("PLAYERS")} >
                MANAGE PLAYERS </p>{" "}
              |
              <p className={activeTab === "OFFICIAL" ? "active" : ""} onClick={() => setActiveTab("OFFICIAL")}>
                {" "}MANAGE OFFICIALS</p>
            </div>
          </Table>
          <ContentHeader title={activeTab === "OFFICIAL" ? `OFFICIALS (${officialData.length})` : `PLAYERS (${mainData.length})`} >
          {user.Role === "Accreditor" ?  "" :
          <> 
          {activeTab === "OFFICIAL" ?
           <CreateBtn 
           onClick={addOfficial} 
           className={mainDataResult[0]?.Settings?.RegistrationOpen !== true ? "disabled" : "submit"}
           disabled={mainDataResult[0]?.Settings?.RegistrationOpen !== true ? true : false}
           >REGISTER OFFICIAL</CreateBtn> 
           : ""}
            {activeTab === "PLAYERS" ? 
            <CreateBtn 
            onClick={addPlayer} 
            className={mainDataResult[0]?.Settings?.RegistrationOpen !== true ? "disabled" : "submit"}
           disabled={mainDataResult[0]?.Settings?.RegistrationOpen !== true ||  mainData?.length === 30 ? true : false}
            
            >REGISTER PLAYER</CreateBtn> : ""}
          </>}
          </ContentHeader>
          <Table>
            <div className="players-header">
              <p className="">DETAILS</p>
              <div className="players-header-flex">
                <p >SUBMITTED</p>
                <p>APPROVAL</p>
                <p>ACTION</p>
              </div>
            </div>
          </Table>
        </Content>
        {activeTab === "OFFICIAL" ? (
          loading ? <Loader /> :
            (officialData.length === 0) ? <NoData text="NO DATA FOUND" /> :
              (officialData && officialData?.map((item: any) => (
                <PlayerCard
                  key={item._id}
                  PlayerLogo={item?.DocumentUploads?.PassportPhotograph}
                  type="OFFICIALS"
                  _id={item._id}
                  approval={!item?.AccreditationHistories ? "PENDING" : item?.AccreditationHistories[0]?.Approval}
                  status={!item?.isCompleted ? "" : item?.isCompleted}
                  playerName={item?.User?.Firstname + " " + item?.User?.Lastname}
                  age={moment(item?.DateOfBirth).fromNow(true)}
                  position={!item?.SportRecord ? "" : item?.SportRecord?.Position}
                />
              )))
        ) : (
          <>
            {loading ? <Loader /> :
              (mainData.length === 0 ? <NoData text="NO DATA FOUND" /> :
                mainData && mainData?.map((item: any) => (
                  <PlayerCard
                    type="PLAYER"
                    PlayerLogo={item?.DocumentUploads?.PassportPhotograph}
                    _id={item._id}
                    age={!item?.Age ? "" : item?.Age}
                    approval={item?.AccreditationHistories === [] ? "PENDING" : item?.AccreditationHistories[0]?.Approval}
                    status={!item?.isCompleted ? "" : item?.isCompleted}
                    playerName={item?.User?.Firstname + " " + item?.User?.Lastname}
                    position={!item?.SportRecord ? "" : item?.SportRecord?.Position}
                  />
                )))
            }
          </>

        )}
      </Container>
}
    </>
  );
};
