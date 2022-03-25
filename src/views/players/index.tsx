import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MdSchool } from "react-icons/md";

// componentsBiBuildings
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content, Table } from "./style";
import { PlayerCard } from "../../components/playerCard";
import { getPlayers } from "../../redux/actions/players";
import { getOfficials } from "../../redux/actions/officials";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import moment from "moment";

export const Players: React.FC = () => {
  const [activeTab, setActiveTab] = useState("PLAYERS");
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const teamId = sessionStorage.getItem('Teamid');
  const teamName = sessionStorage.getItem('Teamname');
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
  useEffect(() => {
    if (teamId === "") {
      navigate("/dashboard");
    }
    dispatch(getPlayers(teamId));
    dispatch(getOfficials(teamId));
  }, [dispatch, teamId, navigate])
  return (
    <Container>
      <Content>
        <Table className="padding">
          <div className="flex-start"> 
          <p onClick={() => navigate("/teams")}><MdSchool /> ALL TEAMS </p>
          <p>|</p> 
          <p className="active"> <MdSchool />{teamName}</p></div>
          <div className="flex-header">
            <p
              className={activeTab === "PLAYERS" ? "active" : ""}
              onClick={() => setActiveTab("PLAYERS")}
            >
              MANAGE PLAYERS
            </p>{" "}
            |
            <p
              className={activeTab === "OFFICIAL" ? "active" : ""}
              onClick={() => setActiveTab("OFFICIAL")}
            >
              {" "}
              MANAGE OFFICIALS
            </p>
          </div>
        </Table>
        <ContentHeader title={activeTab === "OFFICIAL" ? "OFFICIAL" : "PLAYER"} >
          <CreateBtn onClick={activeTab === "OFFICIAL" ? addOfficial : addPlayer}>REGISTER {activeTab === "OFFICIAL" ? "OFFICIAL" : "PLAYER"}</CreateBtn>
        </ContentHeader>
        <Table>
          <div className="header">
            <p className="">DETAILS</p>
            <div className="flex">
              <p>PROFILE STATUS</p>
              <p>APPROVAL</p>
            </div>
          </div>
        </Table>
      </Content>
      {activeTab === "OFFICIAL" ? (
        (!officialData) && loading ? <Loader /> :
          (officialData.length === 0) ? <NoData text="NO DATA FOUND" /> :
            (officialData && officialData?.map((item: any) => (
              <PlayerCard
              key={item._id}
                type="OFFICIAL"
                _id={item._id}
                approval={false}
                status={!item.isCompleted ? "" : item.isCompleted}
                playerName={item.User.Firstname + " " + item.User.Lastname}
                age={moment(item.DateOfBirth).fromNow(true) }
                position={!item.SportRecord ? "" : item.SportRecord.Position}
              />
            )))
      ) : (
        <>
          {loading && !mainData ? <Loader /> :
            (mainData.length === 0 ? <NoData text="NO DATA FOUND" /> :
              mainData && mainData?.map((item: any) => (
                <>
                
               
                <PlayerCard
                  type="PLAYER"
                  _id={item._id}
                  age={moment(item.DateOfBirth).fromNow(true)}
                  approval={false}
                  status={!item.isCompleted ? "" : item.isCompleted}
                  playerName={item.User.Firstname + " " + item.User.Lastname}
                  position={!item.SportRecord ? "" : item.SportRecord.Position}
                />
                </>
              )))
          }
        </>

      )}
    </Container>
  );
};
