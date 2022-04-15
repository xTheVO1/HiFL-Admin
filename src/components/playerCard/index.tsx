import {  useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import { Content, Card, Div, ImgCard, CardText, Btn, Small, SideText } from "./style";
import Modal from "../DeleteModal";
import PlayerImage from "../../assests/dashboard .png";

interface PropsType {
  _id: string;
status: boolean;
playerName: string;
age: string;
position: string;
approval: boolean;
type: string;
PlayerLogo: string;
}

export const PlayerCard = ({_id, age, type, PlayerLogo, position,approval, status, playerName}: PropsType) => {

  const navigate = useNavigate();
  const [modal, setModal] =useState(false);

  const editPlayer = () => {
    navigate(`/player/${_id}`)
  }

  const editOfficial = () => {
    navigate(`/official/${_id}`)
  }

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }
  
  return (
    <>
    <Modal modal={modal} toggle={toggleModal} id={_id} />
      <Card key={playerName}>
        <Content >
          <Div onClick={type === "OFFICIALS" ? editOfficial :editPlayer}>
            <ImgCard>
            <img src={!PlayerLogo ? PlayerImage : PlayerLogo} alt={playerName} />
            </ImgCard>
            <SideText>
              <CardText>{playerName}</CardText>
              <Small><strong>AGE:</strong> {age} | <strong>POSITION:</strong> {!position ? "Player" : position}</Small>
            </SideText>
          </Div>
          <div onClick={type === "OFFICIALS" ? editOfficial :editPlayer}>
            <Btn className={status === true ? "complete" : "incomplete"}>
             {status === true ? "COMPLETE" : "INCOMPLETE"}
            </Btn>
          </div>
          <div  onClick={type === "OFFICIALS" ? editOfficial :editPlayer}>
            <Btn className={approval === false ? "incomplete" : "complete"}>
            {approval ? "APPROVAL" : "PENDING"}
            </Btn>
          </div>
          <div>
            <Btn className="red" onClick={toggleModal}>
            DELETE
            </Btn>
          </div>
        </Content>
      </Card>
        </>
  )
}