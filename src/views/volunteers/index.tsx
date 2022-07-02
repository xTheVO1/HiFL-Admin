import React from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {getVolunteers} from "../../redux/actions/volunteer";

import { Table } from "reactstrap";
import { Container, Content } from "../seasons/styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
// import { CreateBtn } from "../players/style";
import { H2 } from "../institutions/styles";


const Volunteers = () => {
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate()

    const items = useSelector((state: any) => state.volunteers)
    const loading = useSelector((state: any) => state.volunteers.loading)
    const mainDataResult = items && items ? items.volunteers: [];

    React.useEffect(() => {
        dispatch(getVolunteers())
      }, [dispatch])

      const viewVolunteer = (id: any) => {
        navigate(`/volunteer/edit/${id}`)
      }

    return(
        <Container>
        <ContentHeader title="Volunteer">
             {/* <CreateBtn>CREATE VOLUNTEER</CreateBtn> */}
         </ContentHeader>
         <Content>
         {loading ? <Loader/>:
            mainDataResult.length === 0 ? <H2>NO VOLUNTEER FOUND</H2> :
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fisrt Name</th>
                        <th>Last Name</th>
                        <th>Program</th>
                    </tr>
                </thead>
                <tbody>
                { mainDataResult && mainDataResult?.data?.map((item: any, index: any) => (
                    <tr key={index} onClick={() => viewVolunteer(item._id)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.User?.Firstname}</td>
                        <td>{item?.User?.Lastname}</td>
                        <td>{item.Program}</td>
                    </tr>
              )) }
                </tbody>
            </Table>
            }
        </Content>
        </Container>
    )
}

export default Volunteers;