import * as React from "react"
// import { useDispatch } from "react-redux"
// import { Dispatch } from "redux"
import { useNavigate } from "react-router-dom";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content} from "./style";
import { PlayerCard} from "../../components/playerCard";

export const Players: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const addPlayer = () => {
    navigate("/add-player")
  }

  return (
    <Container>
      <ContentHeader title="Players" lineColor="#0013FF">
        <CreateBtn onClick={addPlayer}>Create Player</CreateBtn>
      </ContentHeader>
      <Content>
       
      </Content>
     <PlayerCard/>
    </Container>
  )
}