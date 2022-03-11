import * as React from "react"
// import { useDispatch } from "react-redux"
// import { Dispatch } from "redux"
import { useNavigate } from "react-router-dom";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, CreateBtn, Content, Table} from "./style";
import { PlayerCard} from "../../components/playerCard";

export const Players: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();

  const addPlayer = () => {
    navigate("/add-player")
  }

  return (
    <Container>
      <Content>
      <ContentHeader title="Players">
        <CreateBtn onClick={addPlayer}>Create Player</CreateBtn>
      </ContentHeader>
       <Table>
         <h4>DETAILS</h4>
         <div>
         <h4>PROFILE STATUS</h4>
         <h4>APPROVAL</h4>
         </div>
       </Table>
      </Content>
     <PlayerCard/>
    </Container>
  )
}