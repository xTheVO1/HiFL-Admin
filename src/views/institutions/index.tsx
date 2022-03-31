import React from "react";
import { Container, Content, H2 } from "./styles";
import { Table } from 'reactstrap';
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { getInstitutions} from "../../redux/actions/institutions";
import { useNavigate } from "react-router-dom";


// components
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { CreateBtn } from "../players/style";

function Institutions() {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.institution)
    const loading = useSelector((state: any) => state.institution.loading)
    const mainDataResult = items && items ? items.institutions : [];

    React.useEffect(() => {
        dispatch(getInstitutions())
    }, [dispatch])

    const addInstitution = () => {
        navigate("/create-institution")
    }
    
    // sending User ID
    return (
        <Container>
            <ContentHeader title="Institution">
            <CreateBtn onClick={addInstitution}>CREATE INSTITUTION</CreateBtn>
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
)) }
                    </tbody>
                </Table>
            }
            </Content>
        </Container>
    );
}

export default Institutions;