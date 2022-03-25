import * as React from "react"
// import {  useDispatch } from "react-redux"
// import { Dispatch } from "redux"

// components
import ContentHeader from "../../components/ContentHeader";
import { Card, Container, Content, Row } from "./styles";
import DashboardCard from "../../components/dasboardCard";

export const Dashboard: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch()
  const data:any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);
  return (
    <Container>
      <Content>
      <ContentHeader title={"Hello" + " " + user.Firstname + ","}>
        <h6>Here is your account overview</h6>
      </ContentHeader>
      <Row>
      <DashboardCard title="TEAM" figure={45}/>
      <DashboardCard title="OFFICIALS" figure={45}/>
      <DashboardCard title="PLAYERS" figure={45}/>
      </Row>
      <Card>
        
      </Card>
      </Content>
    </Container>
  )
}