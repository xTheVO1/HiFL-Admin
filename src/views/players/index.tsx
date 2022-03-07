import * as React from "react"
import {  useDispatch } from "react-redux"
import { Dispatch } from "redux"
import { MdMenu } from 'react-icons/md';

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Card, Div, ImgCard,CardText, Btn, Icon, Small } from "./style";

export const Players: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch()

  return (
    <Container>
      <ContentHeader title="Players" lineColor="#0013FF">
      </ContentHeader>
      <Card>
      <Content>
          <Div>
        <ImgCard>
        </ImgCard>
        <div>
            <CardText>Title</CardText>
            <Small>Title of player and details shown below</Small>
        </div>
          </Div>
        <div>
        <Btn>
          Status
        </Btn>
        </div>
        <div>
        <Btn>
          Download
        </Btn>
        </div>
        
        <Icon><MdMenu/></Icon>
      </Content> 
    </Card>
    </Container>
  )
}