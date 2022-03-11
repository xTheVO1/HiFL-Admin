import React from "react";
import { Container, Content, Loader } from "./styles";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import {getTeams} from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";
import TeamCard from "../../components/TeamCards";
import FUTMINNA from "../../assests/FUTMINNA.png";

function TeamManager() {
    const dispatch: Dispatch<any> = useDispatch()

    const items = useSelector((state: any) => state.team)
    const loading = useSelector((state: any) => state.team.loading)
    const mainDataResult = items && items ? items.team: [];

    React.useEffect(() => {
      dispatch(getTeams())
    }, [dispatch])

    //    /teams
// sending User ID
    return (
        <Container>
           <ContentHeader title="Team(s)">
            </ContentHeader>
            <Content>
            {!mainDataResult ? <h2>No Data found</h2> :
            loading ? <Loader>Loading.....</Loader> :
                mainDataResult && mainDataResult.map((item: any) => (
                <TeamCard title={item.TeamName} teamLogo={FUTMINNA} key={item._id}/>
                ))
            }
            </Content>
        </Container>
    );
}

export default TeamManager;