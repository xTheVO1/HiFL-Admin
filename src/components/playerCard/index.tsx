// import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
// import { Dispatch } from "redux"

// components
import { Content, Card, Div, ImgCard, CardText, Btn, Small, SideText } from "./style";

interface PropsType {
  _id: string;
status: boolean;
playerName: string;
age: number;
position: string;
approval: boolean
}
export const PlayerCard = ({_id, age, position,approval, status, playerName}: PropsType) => {
  // const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate();

  const editPlayer = () => {
    navigate(`/player/${_id}`)
  }
  return (
      <Card>
        <Content onClick={editPlayer}>
          <Div>
            <ImgCard>
            </ImgCard>
            <SideText>
              <CardText>{playerName}</CardText>
              <Small>AGE: {age}yrs | POSITION: {position}</Small>
            </SideText>
          </Div>
          <div>
            <Btn className={status === true ? "complete" : "incomplete"}>
             {status === true ? "COMPLETE" : "INCOMPLETE"}
            </Btn>
          </div>
          <div>
            <Btn className={approval === false ? "incomplete" : "complete"}>
            {approval ? "COMPLETE" : "INCOMPLETE"}
            </Btn>
          </div>
        </Content>
      </Card>
  )
}