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
      <Content>
      <ContentHeader title="Dashboard">
        <h1>Dashboard</h1>
      </ContentHeader>
      </Content>
    </Container>
  )
}