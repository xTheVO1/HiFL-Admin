import * as React from "react"
// import {  useDispatch } from "react-redux"
// import { Dispatch } from "redux"

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Content } from "./styles";

export const Dashboard: React.FC = () => {
  // const dispatch: Dispatch<any> = useDispatch()

  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#0013FF">
        <h1>Dashboard</h1>
      </ContentHeader>
      <Content>
      </Content>
    </Container>
  )
}