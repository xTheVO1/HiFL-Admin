import React, { useState } from "react";
import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import {getVolunteers, getVolunteersByInstitution} from "../../redux/actions/volunteer";

import { Spinner, Table } from "reactstrap";
import { Container, Content } from "../seasons/styles";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { H2 } from "../institutions/styles";
import { getInstitutions} from "../../redux/actions/institutions";

const Volunteers = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    const [inputObject, setInputObject] = useState({search: ""});
    const items = useSelector((state: any) => state.volunteers)
    const loading = useSelector((state: any) => state.volunteers.loading)
    const mainDataResult = items && items ? items.volunteers: [];
    const instituionItems = useSelector((state: any) => state.institution)
    const instituionLoading = useSelector((state: any) => state.institution.loading)
    const instituionResult = instituionItems && instituionItems ? instituionItems.institutions : [];

    React.useEffect(() => {
        dispatch(getVolunteers());
        dispatch(getInstitutions());
      }, [dispatch])

      const viewVolunteer = (id: any) => {
        navigate(`/volunteer/edit/${id}`)
      }

      const handleChange = (e: any) => {
        e.preventDefault();
        setInputObject({
            ...inputObject,
            [e.target.name]: e.target.value,
          });
      }

      const searchItem = (e: any) => {
        e.preventDefault();
        dispatch(getVolunteersByInstitution(inputObject.search))
      }

    return(
        <Container>
        <ContentHeader title="Volunteer">
             <div style={{display: "flex"}}>
                    <select 
                    className="search-input" 
                    name="search"
                    onChange={(e) => handleChange(e)}>
                    <option>Select Institution name</option>
                    {instituionLoading ? <Spinner/> : 
                    instituionResult.map(({_id, InstitutionName}:any) => (
                        <option value={_id}>{InstitutionName}</option>
                    ))}
                    </select>
                <button className="search-btn" onClick={(e) => searchItem(e)}>Filter</button>
             </div>
         </ContentHeader>
         <Content>
         {loading ? <Loader/> :
            mainDataResult?.data?.length === 0 ? <H2>NO VOLUNTEER FOUND</H2> :
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
                 
                 {mainDataResult && mainDataResult?.data?.map((item: any, index: any) => (
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