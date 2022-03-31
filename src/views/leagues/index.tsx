import React from "react";
import { Container, Content } from "./styles";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import {getleagues} from "../../redux/actions/leagues";

// components
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { Table } from "reactstrap";
import { H2 } from "../institutions/styles";
import { CreateBtn } from "../players/style";

function Leagues() {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.leagues)
    const loading = useSelector((state: any) => state.leagues.loading)
    const mainDataResult = items && items ? items.leagues: [];

    React.useEffect(() => {
      dispatch(getleagues())
    }, [dispatch])

    const addLeague = ( ) => {
        navigate("/create-league")
    }
// sending User ID
    return (
        <Container>
           <ContentHeader title="League">
               <CreateBtn onClick={addLeague}>CREATE LEAGUE</CreateBtn>
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
                    {mainDataResult && mainDataResult?.map((item: any, index: any) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.InstitutionName}</td>
                            <td>{item.Abbreviation}</td>
                            <td>{item.InstitutionType}</td>
                        </tr>
                    ))}
                    </tbody>
             </Table>
                }
            </Content>
        </Container>
    );
}

export default Leagues;