import React from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { Table } from "reactstrap";
import {getSeasons} from "../../redux/actions/seasons";

// components
import ContentHeader from "../../components/ContentHeader";
import TeamCard from "../../components/TeamCards";
import FUTMINNA from "../../assests/FUTMINNA.png";
import Loader from "../../components/Loader";
import { H2 } from "../institutions/styles";
import { CreateBtn } from "../players/style";

function Seasons() {
    const dispatch: Dispatch<any> = useDispatch()

    const items = useSelector((state: any) => state.seasons)
    const loading = useSelector((state: any) => state.seasons.loading)
    const mainDataResult = items && items ? items.seasons: [];

    React.useEffect(() => {
      dispatch(getSeasons())
    }, [dispatch])

   const addSeason = () => {

   }
// sending User ID
    return (
        <Container>
           <ContentHeader title="Season">
            <CreateBtn onClick={addSeason}>CREATE SEASON</CreateBtn>
            </ContentHeader>
            <Content>
            {loading ? <Loader/>:
            mainDataResult.length === 0 ? <H2>NO DATA FOUND</H2> :
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
                    { mainDataResult && mainDataResult?.map((item: any, index: any) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.InstitutionName}</td>
                            <td>{item.Abbreviation}</td>
                            <td>{item.InstitutionType}</td>
                        </tr>
)) }
                    </tbody>
                </Table>
}
            </Content>
        </Container>
    );
}

export default Seasons;