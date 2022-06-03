import React, {useState} from "react";
import { Container, Content } from "./styles";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getTeams, getTeamsByQuery, postTeam } from "../../redux/actions/teams";
import {
  Modal,
  ModalHeader, ModalBody,
} from "reactstrap";
import { getInstitutions} from "../../redux/actions/institutions";
import { getSports} from "../../redux/actions/sport";

// components
import ContentHeader from "../../components/ContentHeader";
import TeamCard from "../../components/TeamCards";
import Loader from "../../components/Loader";
import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Btn } from "../../components/playerCard/style";
import {
  Label,
  Form,
  CreateBtn,
  Section,
  Input,
  Select
} from "../players/style";

function TeamManager() {
  const dispatch: Dispatch<any> = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state: any) => state.team);
  const loading = useSelector((state: any) => state.team.loading);
  const mainDataResult = items && items ? items.team : [];
  const institutionData = useSelector((state: any) => state.institution)
  const sportData = useSelector((state: any) => state.sports)
  const sportLoading = useSelector((state: any) => state.sports.loading)
  const sportResult = sportData && sportData ? sportData.sports : [];
  const institutionLoading = useSelector((state: any) => state.institution.loading)
  const institutionResult = institutionData && institutionData ? institutionData.institutions : [];
  const data:any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);

  const [modal, setModal] = useState(false);
  const [inputObject, setObject] = useState({
     TeamName: "", 
     Overview: "", 
     Category: '', 
     Sport: "", 
     InstitutionName: ""})
  // TeamManager

  React.useEffect(() => {
    if(user.Role === "TeamManager"){
      const id = user._id;
      dispatch(getTeamsByQuery(id));
    }
    else{
      dispatch(getTeams());
    }
    dispatch(getInstitutions());
    dispatch(getSports());
    // eslint-disable-next-line
  }, [dispatch]);

  const viewPlayers = ({name, id}: any) => {
    sessionStorage.removeItem("Teamid");
    sessionStorage.removeItem("Teamname");
    sessionStorage.setItem("Teamid", id);
    sessionStorage.setItem("Teamname", name);
    navigate("/players");
  };
  
  //   // Toggle for Modal
  const toggleModal = (data: any) => {
    setModal(!modal);
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const create = (e: any) => {
    const details = {
      TeamName: inputObject.TeamName, 
      Overview: inputObject.Overview, 
      Category: inputObject.Category, 
      Sport: inputObject.Sport, 
      Institution: inputObject.InstitutionName
    }
    dispatch(postTeam(details))
  }

  const category = [
    {name: "Men"},
    {name: "Women"}
  ]
    
  
  return (
    <Container>
      <ContentHeader title="Teams" >
      <CreateBtn onClick={toggleModal}>CREATE TEAM</CreateBtn>
      </ContentHeader>
      <Content>
        {mainDataResult.length === 0 && loading ? (
          <Loader />
        ) : mainDataResult.length === 0 ? (
          <h2 className="no-data">NO DATA FOUND</h2>
        ) : 
        user.Role === "TeamManager" ? (
          mainDataResult &&
          mainDataResult?.map((item: any) => (
            <TeamCard
              title={item.TeamName}
              TeamLogo={item.TeamLogo}
              teamId={item._id}
              TeamName={item.TeamName}
              Institution={item.Institution?.InstitutionName}
              Category={item.Category}
              key={item._id}
            />
          )))
          : 
          loading ? <Loader/> :(
            <Table hover>
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Team Name</th>
                      <th>Abbreviation</th>
                      <th>Institution Type</th>
                  </tr>
              </thead>
              <tbody>
              {mainDataResult && mainDataResult?.map((item: any, index: any) => (
                  <tr key={index} onClick={() => viewPlayers({name:item.TeamName, id:item._id})}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.TeamName}</td>
                      <td>{item.TeamAbbreviation}</td>
                      <td>{item.Institution?.InstitutionName}</td>
                  </tr>
                  )) }
              </tbody>
            </Table>
         )
        }
      </Content>
      <Modal isOpen={modal}
                  toggle={toggleModal}
                  modalTransition={{ timeout: 200 }}
                  size="md" contentClassName="modal-box">
                <ModalHeader>
                  ACCREDITATION
                </ModalHeader>
                <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                  <Form>
                  <Section>
                        <Label>TEAM NAME</Label>
                        <Input
                          name="TeamName"
                          onChange={(e) => handleChange(e)}
                        />
                    </Section>
                    <Section>
                        <Label>OVERVIEW</Label>
                        <Input
                          name="Overview"
                          onChange={(e) => handleChange(e)}
                        />
                    </Section>
                    <Section>
                        <Label>CATEGORY</Label>
                        <Select
                          name="Category"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select a Category</option>
                          {category.map((item: any) => (
                            <option value={item.name} key={item.name}>{item?.name}</option>
                          ))}
                        </Select>
                    </Section>
                    <Section>
                        <Label>SPORT</Label>
                        <Select
                          name="Sport"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select a Sport</option>
                          {sportLoading ? Loader :
                           sportResult &&  sportResult.map((item: any) => (
                            <option value={item._id} key={item._id}>{item?.SportName}</option>
                          ))}
                        </Select>
                    </Section>
                    <Section>
                        <Label>INSTITUTION NAME</Label>
                        <Select
                          name="InstitutionName"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select an Institution</option>
                          {institutionLoading ? Loader :
                           institutionResult &&  institutionResult.map((item: any) => (
                            <option value={item._id} key={item._id}>{item?.InstitutionName}</option>
                          ))}
                        </Select>
                    </Section>
                  </Form>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Btn className="red" onClick={(e) => create(e)}
                      style={{ background: "green", color: "white", marginRight: "1rem" }} >
                      + ADD
                    </Btn>
                    <Btn className="green"
                    onClick={toggleModal}
                    style={{ background: "red", color: "white", marginRight: "1rem", }}>
                    CANCEL
                  </Btn>
          </div>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default TeamManager;
