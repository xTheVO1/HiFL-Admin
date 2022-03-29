import React from "react";
import { Container, Content } from "./styles";
import { Table } from 'reactstrap';
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { getTeams } from "../../redux/actions/teams";

// components
import ContentHeader from "../../components/ContentHeader";
// import Loader from "../../components/Loader";

function Institutions() {
    const dispatch: Dispatch<any> = useDispatch()

    const items = useSelector((state: any) => state.team)
    const loading = useSelector((state: any) => state.team.loading)
    const mainDataResult = items && items ? items.team : [];

    React.useEffect(() => {
        dispatch(getTeams())
    }, [dispatch])

    //    /teams
    // sending User ID
    return (
        <Container>
            <ContentHeader title="Institution(s)">
            </ContentHeader>
            <Content>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Institution Name</th>
                            <th>Abbreviation</th>
                            <th>Institution Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </Table>
                {/* {(mainDataResult.length === 0) && loading ? <Loader/>:
            mainDataResult.length === 0 ? <h2 className="no-data">NO DATA FOUND</h2> :
                mainDataResult && mainDataResult?.map((item: any) => (
                <TeamCard title={item.TeamName} teamLogo={FUTMINNA} teamId={item._id} TeamName={item.TeamName} key={item._id}/>
                )) */}
                {/* } */}
            </Content>
        </Container>
    );
}

export default Institutions;