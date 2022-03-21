import React, { useState } from "react";
// import { useDispatch } from "react-redux"
// import { Dispatch } from "redux"
import { useNavigate } from "react-router-dom";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content, Table } from "./style";
import { PlayerCard } from "../../components/playerCard";

export const Players: React.FC = () => {
  const [activeTab, setActiveTab] = useState("OFFICIALS");

  // const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const addPlayer = () => {
    navigate("/add-player");
  };

  const addOfficial = () => {

    navigate("/add-official")
  }
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
          approval={false}
          status={true}
          playerName={"Sanmi James"}
          age={24}
          position={"FW"}
        />
      ) : (
        <>
          <PlayerCard
            approval={false}
            status={true}
            playerName={"Chukwu Emmannuel"}
            age={22}
            position={"GK"}
          />
          <PlayerCard
            approval={true}
            status={false}
            playerName={"Abdulahi Wahab"}
            age={19}
            position={"MD"}
          />
        </>
      )}
    </Container>
  );
};
