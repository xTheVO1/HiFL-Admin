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

function ViewSeason() {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const store = useSelector((state: RootState) => state.player);
    const { loading, singlePlayer } = store;


    useEffect(() => {
        dispatch(getSeason(id))
      }, [dispatch])

    const back = ( ) => {
        navigate("/seasons")
    }
return (
    <Container >
        <ContentHeader title="Season">
            <CreateBtn onClick={back}>Go Back</CreateBtn>
            </ContentHeader>
            <Content></Content>
    </Container>
);
}

export default ViewSeason;