import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content, Table } from "./style";
import { PlayerCard } from "../../components/playerCard";
import { getPlayers } from "../../redux/actions/players";
import { RootState } from "../../redux/reducers";
import { Loader } from "../teams/styles";

export const Players: React.FC = () => {
  const [activeTab, setActiveTab] = useState("PLAYERS");
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const teamId = sessionStorage.getItem('Teamid');
  const store = useSelector((state: RootState) => state.player)
  const {loading, players } = store;
  const mainData = players && players ? players : []; 

  const addPlayer = () => {
    navigate("/register-player");
  };

  const addOfficial = () => {
    navigate("/register-official");
  }
  useEffect(() => {
    if(teamId === ""){
      navigate("/dashboard");
    }
      dispatch(getPlayers(teamId));
  },[dispatch])
  return (
    <Container>
      <Content>
        <Table className="padding">
          <h6 className="">DETAILS</h6>
          <div className="flex-header">
            <p
              className={activeTab === "PLAYERS" ? "active" : ""}
              onClick={() => setActiveTab("PLAYERS")}
            >
              MANAGE PLAYERS
            </p>{" "}
            |
            <p
              className={activeTab === "OFFICIALS" ? "active" : ""}
              onClick={() => setActiveTab("OFFICIALS")}
            >
              {" "}
              MANAGE OFFICIALS
            </p>
          </div>
        </Table>
        <ContentHeader title={activeTab === "OFFICIALS" ? "OFFICIALS": "PLAYERS"} >
          <CreateBtn onClick={activeTab === "OFFICIALS"  ? addOfficial : addPlayer}>REGISTER {activeTab === "OFFICIALS" ? "OFFICIALS": "PLAYERS"}</CreateBtn>
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
      {activeTab === "OFFICIALS" ? (
        <PlayerCard
        _id={"7"}
          approval={false}
          status={true}
          playerName={"Sanmi James"}
          age={24}
          position={"FW"}
        />
      ) : (
        <>
        {players && players.length === 0 || !mainData ? <Loader>NO DATA FOUND</Loader> : 
        (loading ? <Loader>LOADING....</Loader> :
        mainData &&  mainData.map((item: any )=> (
          <PlayerCard
          _id={item._id}
            approval={false}
            status={!item.isCompleted ? "" : item.isCompleted}
            playerName={item.User.Firstname + " " + item.User.Lastname}
            age={22}
            position={!item.SportRecord ? "" : item.SportRecord.Position}
          />
          )))
        }
        </>

      )}
    </Container>
  );
};
