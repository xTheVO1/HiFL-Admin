import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../../redux/reducers';
import { Container } from './styles';
import { getSeason} from "../../redux/actions/seasons";
import { CreateBtn } from '../players/style';
import ContentHeader from '../../components/ContentHeader';
import { Content, H2 } from '../institutions/styles';
import Loader from "../../components/Loader";
import { Table } from "reactstrap";
import {getleagues} from "../../redux/actions/leagues";

function ViewSeason() {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const items = useSelector((state: RootState) => state.seasons.season);
    // const loading = useSelector((state: any) => state.seasons.loading)
    const mainDataResult = items && items ? items.season : {};
    const leagues = useSelector((state: any) => state.leagues)
    const leagueLoader = useSelector((state: any) => state.leagues.loading)
    const dataResult = leagues && leagues ? leagues.leagues: []

    useEffect(() => {
        dispatch(getSeason(id))
        dispatch(getleagues(id))
      }, [dispatch])
    const back = ( ) => {
        navigate("/seasons")
    }

    const viewStage = (id: any) => {
        navigate(`/leagues/${id}`)
    }

    const addLeague = () => {
        navigate(`/create-league/${id}`)
    }

return (
    <Container >
        <ContentHeader title="Season">
        <CreateBtn onClick={addLeague}>CREATE LEAGUE</CreateBtn>
        <CreateBtn onClick={back}>Go Back</CreateBtn>
        </ContentHeader>
            <Content>
                {leagueLoader ? <Loader/> :
                dataResult.length === 0 ? <H2>NO LEAGUE FOUND</H2> :
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>League Name</th>
                            <th>Abbreviation</th>
                        </tr>
                    </thead>
                    <tbody>
                    {dataResult && dataResult?.map((item: any, index: any) => (
                        <tr key={index} onClick={() => viewStage(item._id)}>
                            <th scope="row">{index + 1}</th>
                            <td>{item?.LeagueName}</td>
                            <td>{item?.Abbreviation}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                }
            </Content>
    </Container>
);
}

export default ViewSeason;