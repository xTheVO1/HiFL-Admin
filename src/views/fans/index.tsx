import React, { useState } from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {getFans} from "../../redux/actions/fans";

import { Spinner, Table } from "reactstrap";
import { Container, Content } from "../seasons/styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { H2 } from "../institutions/styles";
import { getInstitutions} from "../../redux/actions/institutions";

const Fans = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.volunteers)
    const loading = useSelector((state: any) => state.volunteers.fansLoading)
    const mainDataResult = items && items ? items.fans: [];
  

    React.useEffect(() => {
        dispatch(getFans());
        dispatch(getInstitutions());
      }, [dispatch])

      const viewVolunteer = (id: any) => {
        navigate(`/fans/edit/${id}`)
      }

    return(
        <Container>
        <ContentHeader title={`Fans ${" "}(${mainDataResult?.length})`}>

         </ContentHeader>
         <Content>
         {loading ? <Loader/> :
            mainDataResult?.data?.length === 0 ? <H2>NO FAN FOUND</H2> :
            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fisrt Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                 
                 {mainDataResult && mainDataResult?.map((item: any, index: any) => (
                    <tr key={index} onClick={() => viewVolunteer(item._id)}>
                        <th scope="row">{index + 1}</th>
                        <td>{item?.FirstName}</td>
                        <td>{item?.LastName}</td>
                        <td>{item.Email}</td>
                        <td>{item.PhoneNumber}</td>
                    </tr>
              )) }
                </tbody>
            </Table>
            }
        </Content>
        </Container>
    )
}

export default Fans;