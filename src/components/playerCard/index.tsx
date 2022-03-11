import * as React from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { MdMenu } from 'react-icons/md';

// components
import ContentHeader from "../ContentHeader";
import { Content, Card, Div, ImgCard, CardText, Btn, Icon, Small, SideText } from "./style";

export const PlayerCard: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch()

  return (
      <Card>
        <Content>
          <Div>
            <ImgCard>
            </ImgCard>
            <SideText>
              <CardText>Title</CardText>
              <Small>Title of player and details shown below</Small>
            </SideText>
          </Div>
          <div>
            <Btn>
              PROFILE STATUS
            </Btn>
          </div>
          <div>
            <Btn>
              APPROVAL
            </Btn>
          </div>
        </Content>
      </Card>
  )
}