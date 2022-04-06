import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { getTeams } from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";

function User() {
  const dispatch: Dispatch<any> = useDispatch();

  React.useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  //    /teams
  // sending User ID
  return (
    <Container>
      <ContentHeader title="Teams" children={""}></ContentHeader>
      <Content></Content>
    </Container>
  );
}

export default User;
