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

export const Players: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const [activeTab, setActiveTab] = useState("PLAYERS");

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
  }, [dispatch, teamId, navigate]);


  return (
    <Container>
      <Content>
        <Table className="padding">
          <div className="players-flex-start">
            <p onClick={viewTeams}><MdSchool /> ALL TEAMS </p>
            <p>|</p>
            <p className="active"> <MdSchool />{teamName}</p></div>
          <div className="players-flex-header">
            <p className={activeTab === "PLAYERS" ? "active" : ""} onClick={() => setActiveTab("PLAYERS")} >
              MANAGE PLAYERS </p>{" "}
            |
            <p className={activeTab === "OFFICIAL" ? "active" : ""} onClick={() => setActiveTab("OFFICIAL")}>
              {" "}MANAGE OFFICIALS</p>
          </div>
        </Table>
        <ContentHeader title={activeTab === "OFFICIAL" ? "OFFICIAL" : "PLAYER"} >
          <CreateBtn onClick={activeTab === "OFFICIAL" ? addOfficial : addPlayer}>REGISTER {activeTab === "OFFICIAL" ? "OFFICIAL" : "PLAYER"}</CreateBtn>
        </ContentHeader>
        <Table>
          <div className="players-header">
            <p className="">DETAILS</p>
            <div className="players-header-flex">
              <p>PROFILE STATUS</p>
              <p>APPROVAL</p>
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
                type="OFFICIAL"
                _id={item._id}
                approval={false}
                status={!item.isCompleted ? "" : item.isCompleted}
                playerName={item.User.Firstname + " " + item.User.Lastname}
                age={moment(item.DateOfBirth).fromNow(true)}
                position={!item.SportRecord ? "" : item.SportRecord.Position}
              />
            )))
      ) : (
        <>
          {loading ? <Loader /> :
            (mainData.length === 0 ? <NoData text="NO DATA FOUND" /> :
              mainData && mainData?.map((item: any) => (
                <PlayerCard
                  type="PLAYER"
                  _id={item._id}
                  age={!item.DateOfBirth ? "" :moment(item.DateOfBirth).fromNow(true)}
                  approval={false}
                  status={!item.isCompleted ? "" : item.isCompleted}
                  playerName={item.User.Firstname + " " + item.User.Lastname}
                  position={!item.SportRecord ? "" : item.SportRecord.Position}
                />
              )))
          }
        </>

      )}
    </Container>
  );
};
