import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import {getTeams} from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";
// import TeamCard from "../../components/TeamCards";
// import FUTMINNA from "../../assests/FUTMINNA.png";
// import Loader from "../../components/Loader";

function Setting() {
    const dispatch: Dispatch<any> = useDispatch()

    // const items = useSelector((state: any) => state.team)
    // const loading = useSelector((state: any) => state.team.loading)
    // const mainDataResult = items && items ? items.team: [];

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
            </Content>
        </Container>
    );
}

export default Setting;