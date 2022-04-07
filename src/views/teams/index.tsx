import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getTeamsByQuery } from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";
import TeamCard from "../../components/TeamCards";
import Loader from "../../components/Loader";

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
        ) : (
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
          ))
        )}
      </Content>
    </Container>
  );
}

export default TeamManager;
