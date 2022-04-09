import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getTeamsByQuery } from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";
import TeamCard from "../../components/TeamCards";
import Loader from "../../components/Loader";
import { Table } from "reactstrap";

function TeamManager() {
  const dispatch: Dispatch<any> = useDispatch();

  const items = useSelector((state: any) => state.team);
  const loading = useSelector((state: any) => state.team.loading);
  const mainDataResult = items && items ? items.team : [];
  const data:any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);

  // TeamManager
  React.useEffect(() => {
    if(user.Role === "TeamManager"){
      const id = user._id;
      dispatch(getTeamsByQuery(id));
    }
    else{
      dispatch(getTeams());
    }
    // eslint-disable-next-line
  }, [dispatch]);

  //    /teams
  // sending User ID
  return (
    <Container>
      <ContentHeader title="Teams" children={""}></ContentHeader>
      <Content>
        {mainDataResult.length === 0 && loading ? (
          <Loader />
        ) : mainDataResult.length === 0 ? (
          <h2 className="no-data">NO DATA FOUND</h2>
        ) : 
        user.Role === "TeamManager" ? (
          mainDataResult &&
          mainDataResult?.map((item: any) => (
            <TeamCard
              title={item.TeamName}
              TeamLogo={item.TeamLogo}
              teamId={item._id}
              TeamName={item.TeamName}
              Institution={item.Institution?.InstitutionName}
              Category={item.Category}
              key={item._id}
            />
          )))
          : 
          loading ? <Loader/> :(
            <Table hover>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Team Name</th>
                      <th>Abbreviation</th>
                      <th>Institution Type</th>
                  </tr>
              </thead>
              <tbody>
              {mainDataResult && mainDataResult?.map((item: any, index: any) => (
                  <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.TeamName}</td>
                      <td>{item.TeamAbbreviation}</td>
                      <td>{item.Institution?.InstitutionName}</td>
                  </tr>
                  )) }
              </tbody>
            </Table>
         )
        }
      </Content>
    </Container>
  );
}

export default TeamManager;
