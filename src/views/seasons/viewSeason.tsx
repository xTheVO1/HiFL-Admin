import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';

import { RootState } from '../../redux/reducers';
import { Container } from './styles';
import { getSeason} from "../../redux/actions/seasons";
import { CreateBtn } from '../players/style';
import ContentHeader from '../../components/ContentHeader';
import { Content } from '../institutions/styles';
import {Card} from "../guidelines/styles"
function ViewSeason() {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const items = useSelector((state: RootState) => state.seasons.season);
    const loading = useSelector((state: any) => state.seasons.loading)
    const mainDataResult = items && items ? items.season : {};

    useEffect(() => {
        dispatch(getSeason(id))
      }, [dispatch])
console.log(mainDataResult)
    const back = ( ) => {
        navigate("/seasons")
    }
return (
    <Container >
        <ContentHeader title="Season">
            <CreateBtn onClick={back}>Go Back</CreateBtn>
            </ContentHeader>
            <Content>
                <Card>
                    <h4>{mainDataResult?.SeasonName}</h4>
                    <p>{mainDataResult?.SeasonYear}</p>
                </Card>
            </Content>
    </Container>
);
}

export default ViewSeason;