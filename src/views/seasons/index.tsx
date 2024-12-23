import React from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {getSeasons} from "../../redux/actions/seasons";

// components
import { Container, Content } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { CreateBtn } from "../players/style";
import { H2 } from "../institutions/styles";
import { Table } from "reactstrap";

function Seasons() {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.seasons)
    const loading = useSelector((state: any) => state.seasons.loading)
    const mainDataResult = items && items ? items.seasons: [];

    React.useEffect(() => {
      dispatch(getSeasons())
    }, [dispatch])

   const addSeason = () => {
    navigate("/create-season");
   }

   const viewSeason = (id:any) => {
    sessionStorage.removeItem("Seasonid");
    sessionStorage.setItem("Seasonid", id);
    navigate(`/seasons/${id}`);
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
                        <th>Season Name</th>
                        <th>Season Year</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                { mainDataResult && mainDataResult?.data?.map((item: any, index: any) => (
                    <tr key={index} onClick={() => viewSeason(item._id)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.SeasonName}</td>
                        <td>{item.SeasonYear}</td>
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