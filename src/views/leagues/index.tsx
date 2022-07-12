import React, { useState, useEffect, useRef } from "react";
import { Container, Content } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getleague, getleagueStage, getleagueStages, updateLeague, updateLeagueStage } from "../../redux/actions/leagues";
import Input from "../../components/Input";
import Accordion from 'react-bootstrap/Accordion'
import {
  Modal,
  ModalHeader, ModalBody
} from "reactstrap";

// components
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { H2 } from "../institutions/styles";
import { Tab, Nav, List } from "../../components/tab/style";
import {
  Label,
  Form,
  FormHolder,
  CreateBtn,
  BtnDiv,
  Outlet,
  Section,
  Select
} from "../players/style";
import { getTeams } from "../../redux/actions/teams";
import Fixture from "./fixture";
import { getFixtures } from "../../redux/actions/fixtures";

function Leagues() {
  const [activeTab, setActiveTab] = useState("tab1");
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate();
  const items = useSelector((state: any) => state.leagues);
  const loading = useSelector((state: any) => state.leagues.loading);
  const teamsData = useSelector((state: any) => state.team);
  const teamsLoader = useSelector((state: any) => state.team.loading);
  const mainDataResult = teamsData && teamsData ? teamsData.team : [];
  const stagesResult = items && items ? items.leagueStages : [];
  const singleStage = items && items ? items.leagueStage : {};
  const singleLeagueResult = items && items ? items.league : {};
  const { leagueStageLoading,
    leagueStagesLoading,
    leagueLoading } = items;
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTeam, setDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [stageId, setStageId] = useState();
  const [activeStage, setActiveStageItem]:any = useState();
  const [stageTeams, setStageTeams]: any = useState([]);
  const [inputObject, setObject] = useState({
    Abbreviation: "",
    LeagueName: "",
    RegistrationOpen: "",
    Winner: "",
    SecondPlace: "",
    ThirdPlace: "",
    FourthPlace: "",
    LeagueStatus: ""

  })
  const [stageItems, setStageItem]: any = useState({
    NoOfTeams: "",
    OrderNumber: "",
    StageName: "",
    Teams: [],
    Fixtures: [],
    ActiveStage: false,
  })

  useEffect(() => {
    dispatch(getleague(id));
    dispatch(getleagueStages(id));
    dispatch(getTeams());
  }, [dispatch]);

  useEffect(() => {
    // dispatch(getFixtures(id));
   
  }, [dispatch]);

  useEffect(() => {
    const { Settings, LeagueName, Abbreviation, Finalists } = singleLeagueResult;
    setObject({
      Abbreviation: Abbreviation,
      LeagueName: LeagueName,
      RegistrationOpen: !Settings?.RegistrationOpen ? "OPEN" : "CLOSED",
      Winner: Finalists?.Winner,
      SecondPlace: Finalists?.SecondPlace,
      ThirdPlace: Finalists?.ThirdPlace,
      FourthPlace: Finalists?.FourthPlace,
      LeagueStatus: singleLeagueResult?.LeagueStatus
    })
  }, [singleLeagueResult, singleStage]);

  useEffect(() => {
    setStageItem({
      StageName: activeStage?.StageName,
      NoOfTeams: activeStage?.NoOfTeams,
      OrderNumber: activeStage?.OrderNumber,
      ActiveStage: activeStage?.ActiveStage === true ? "Active" : "Inactive",
      StageTeams: activeStage?.Teams
    })
  }, [ activeStage]);

  const addLeague = () => {
    navigate(`/create-league-stage/${id}`)
  }

  const changeTab = (tab: any) => {
    setActiveTab(tab)
    dispatch(getleague(id));
    dispatch(getleagueStages(id));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  
  };

  const handChange = (e: any) => {
    e.preventDefault();
    setStageItem({
      ...stageItems,
      [e.target.name]: e.target.value,
    });
  };

  const editLeague = () => {
    const payload = {
      _id: id,
      params: {
        Abbreviation: inputObject.Abbreviation,
        LeagueName: inputObject.LeagueName,
        Settings: {
          RegistrationOpen: inputObject.RegistrationOpen === "OPEN" ? true : false,
          LeagueStatus: inputObject.LeagueStatus
        },
        Finalists: {
          Winner: inputObject.Winner,
          SecondPlace: inputObject.SecondPlace,
          ThirdPlace: inputObject.ThirdPlace,
          FourthPlace: inputObject.FourthPlace
        }
      }
    }
    dispatch(updateLeague(payload))
  }
  // Toggle for Modal
  const toggleModal = (item: any) => {
    setModal(!modal);
    setStageId(item._id);
    setStageTeams(item.Teams);
    dispatch(getleagueStage(item._id));
  }

  // Toggle for Modal
  const toggleDeleteModal = (item: any) => {
    setDeleteModal(!deleteModal);
    setStageTeams(item.Teams);
  }


  // Toggle for Modal
  const setActiveStage = (stage: any) => {
    dispatch(getleagueStage(stage._id));
    setDeleteItem(stage._id);
    setStageTeams(stage.Teams);
    setActiveStageItem(stage)
  }

  // delete & add team to league stage
  const addDeleteTeam = (e: any) => {
    e.preventDefault();
    // if delete is true update league stage 
    if (deleteTeam === true) {
      const details = {
        _id: deleteItem,
        params: {
          Teams: stageTeams
        }
      }
      dispatch(updateLeagueStage(details));
      dispatch(getleagueStage(deleteItem));
      setDelete(false);
      setDeleteModal(!deleteModal);
    } 
    else {
      // add teams then update league stage
      const details = {
        _id: stageId,
        params: {
          Teams: [...stageTeams, stageItems.Teams]
        }
      }
      dispatch(updateLeagueStage(details))
      setModal(!modal);
      dispatch(getleagueStage(stageId));
      dispatch(getleagueStages(id));
    }
  }

  const updateStage = (e: any) => {
    e.preventDefault();
    const details = {
      _id: deleteItem,
      params: {
        StageName: stageItems?.StageName,
        NoOfTeams: stageItems?.NoOfTeams,
        OrderNumber: stageItems?.OrderNumber,
        ActiveStage: stageItems?.ActiveStage === "Active" ? true : false
      }
    }
    dispatch(updateLeagueStage(details));
    dispatch(getleagueStage(activeStage._id));

  }

  const removeTeam = (id: any) => {
    setDeleteModal(!deleteModal);
    setDelete(true)
    let newTeams = stageTeams?.splice(id, 1)
    // const filteredArray = singleStage?.Teams?.filter((role: any) => role.id != id)
    setStageTeams(newTeams)
  }

  // sending User ID
  return (
    <Container>
      <ContentHeader title="LEAGUE">
      {activeTab === "tab2" ? 
        <CreateBtn onClick={addLeague}>CREATE STAGE</CreateBtn>
      : ""}
      </ContentHeader>
      <Content>
        {leagueLoading ? <Loader /> :
          <Tab>
            <Nav>
              <List
                className={activeTab === "tab1" ? "active" : ""}
                onClick={() => changeTab("tab1")}
              >
                SETTINGS
              </List>
              <List
                className={activeTab === "tab2" ? "active" : ""}
                onClick={() => changeTab("tab2")}
              >
                STAGES
              </List>
              <List
                className={activeTab === "tab3" ? "active" : ""}
                onClick={() => changeTab("tab3")}
              >
                FIXTURES
              </List>
            </Nav>
            <Outlet>
              {activeTab === "tab1" ? (
                loading ? <Loader /> :
                  !singleLeagueResult ? <H2>NO DATA FOUND</H2> :
                    <>
                      <Form onSubmit={editLeague} className="white">
                        <Section >
                          <FormHolder>
                            <Label>LEAGUE NAME</Label>
                            <Input type="text"
                              name="LeagueName"
                              onChange={(e) => handleChange(e)}
                              value={inputObject.LeagueName?.toUpperCase()} />
                          </FormHolder>
                          <FormHolder>
                            <Label>ABBREVIATION</Label>
                            <Input type="text"
                              name="Abbreviation"
                              onChange={(e) => handleChange(e)}
                              value={inputObject?.Abbreviation?.toUpperCase()} />
                          </FormHolder>
                        </Section>
                        <Section className="form-header">
                          <h5 >SETTINGS</h5>
                        </Section>
                        <FormHolder>
                          <Label>REGISTRATION STATUS</Label>
                          <Select
                            name="RegistrationOpen"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.RegistrationOpen?.toUpperCase()} >
                            <option value="OPENED">OPENED</option>
                            <option value="CLOSED">CLOSED</option>
                          </Select>
                        </FormHolder>
                        <FormHolder>
                          <Label>LEAGUE STATUS</Label>
                          <Select
                            name="LeagueStatus"
                            onChange={(e) => handleChange(e)}
                            value={inputObject?.LeagueStatus?.toUpperCase()} >
                            <option value="OPENED">OPENED</option>
                            <option value="CLOSED">CLOSED</option>
                          </Select>
                        </FormHolder>
                        <Section className="form-header">
                          <h5>FINALIST</h5>
                        </Section>

                        <FormHolder>
                          <Label>WINNER</Label>
                          <Select
                            name="Winner"
                            value={inputObject.Winner?.toUpperCase()}
                            onChange={(e) => handleChange(e)}
                          >
                            <option>Select a Position</option>
                            {teamsLoader ? Loader :
                              mainDataResult && mainDataResult.map((item: any) => (
                                <option value={item._id} key={item._id}>{item.TeamName}</option>
                              ))}
                          </Select>
                        </FormHolder>
                        <FormHolder>
                          <Label>SECOND POSITION</Label>
                          <Select
                            name="SecondPlace"
                            value={inputObject.Winner?.toUpperCase()}
                            onChange={(e) => handleChange(e)}
                          >
                            <option>Select a Position</option>
                            {teamsLoader ? Loader :
                              mainDataResult && mainDataResult.map((item: any) => (
                                <option value={item._id} key={item._id}>{item.TeamName}</option>
                              ))}
                          </Select>
                        </FormHolder>
                        <FormHolder>
                          <Label>THIRD POSITION</Label>
                          <Select
                            name="ThirdPlace"
                            value={inputObject.Winner?.toUpperCase()}
                            onChange={(e) => handleChange(e)}
                          >
                            <option>Select a Position</option>
                            {teamsLoader ? Loader :
                              mainDataResult && mainDataResult.map((item: any) => (
                                <option value={item._id} key={item._id}>{item.TeamName}</option>
                              ))}
                          </Select>
                        </FormHolder>
                        <FormHolder>
                          <Label>FOURTH POSITION</Label>
                          <Select
                            name="FourthPlace"
                            value={inputObject.Winner?.toUpperCase()}
                            onChange={(e) => handleChange(e)}
                          >
                            <option>Select a Position</option>
                            {teamsLoader ? Loader :
                              mainDataResult && mainDataResult.map((item: any) => (
                                <option value={item._id} key={item._id}>{item.TeamName}</option>
                              ))}
                          </Select>
                        </FormHolder>
                        <BtnDiv>
                          <CreateBtn type="submit">{loading ? <Loader /> : "UPDATE"}</CreateBtn>
                        </BtnDiv>
                      </Form>
                    </>
              )
                :
                ""}

              {activeTab === "tab2" ?
                (
                  leagueStagesLoading ? <Loader /> :
                    stagesResult.length === 0 ? <H2>NO DATA FOUND</H2> :
                      <>
                        <Accordion>
                          {loading ? Loader :
                            stagesResult && stagesResult?.map((item: any, index: any) => (
                              <Accordion.Item eventKey={index} key={index} onClick={() => setActiveStage(item)}>
                                <Accordion.Header >
                                  <div className='user-table-head' >
                                    <h6>{item?.StageName}</h6>
                                    <h6>{item.ActiveStage === true ? <span className="active">Active </span> : <span className="inactive" > In-Active</span>}</h6>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div >
                                    <Form onSubmit={(e) => updateStage(e)} className="white" style={{ marginBottom: "1.5rem" }}>
                                      <Section>
                                        <FormHolder>
                                          <Label>STAGE </Label>
                                          <Input type="text"
                                            name="StageName"
                                            onChange={(e) => handChange(e)}
                                            value={stageItems?.StageName?.toUpperCase()} />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>NO OF TEAMS <span>{stageItems?.NoOfTeams}</span></Label>
                                          <Input type="number"
                                            name="NoOfTeams"
                                            onChange={(e) => handChange(e)}
                                          />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>ORDER NUMBER</Label>
                                          <Input type="number"
                                            name="OrderNumber"
                                            onChange={(e) => handChange(e)}
                                            value={stageItems?.OrderNumber}
                                          />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>STATUS <span>{stageItems?.ActiveStage === true ? "Active" : "Inactive"}</span></Label>
                                          <Select
                                            name="ActiveStage"
                                            onChange={(e) => handChange(e)}
                                          >
                                            <option>Select Status</option>
                                            <option value="Active">ACTIVE</option>
                                            <option value="Inactive">INACTIVE</option>
                                          </Select>
                                        </FormHolder>
                                      </Section>
                                      <BtnDiv style={{ marginBottom: "2rem" }}>
                                        <CreateBtn className="red" type="submit"
                                        >
                                          UPDATE
                                        </CreateBtn>
                                      </BtnDiv>
                                    </Form>
                                    <div className=" stage-header">
                                      <p>TEAMS</p>
                                      <div>
                                        {console.log(item.NoOfTeams, item?.Teams?.length)}
                                        <span>{item.NoOfTeams - item?.Teams?.length} Teams Left</span>
                                        <button onClick={() => toggleModal(item)} disabled={item.NoOfTeams === item?.Teams?.length ? true : false}>+ Add Team</button>
                                      </div>
                                    </div>
                                    {leagueStageLoading ? <Loader /> :
                                      singleStage.length === 0 ? <H2>NO TEAMS ADDED</H2> :
                                        singleStage?.Teams?.map((item: any, i: any) => (
                                          <div className="stage-body">
                                            <p>{item.TeamName}</p>
                                            <p className="remove" onClick={() => removeTeam(i)}></p>
                                          </div>
                                        ))
                                    }
                                  </div>
                                </Accordion.Body>

                              </Accordion.Item>
                            ))}
                        </Accordion>
                        <Modal isOpen={modal}
                          toggle={toggleModal}
                          modalTransition={{ timeout: 200 }}
                          size="md" contentClassName="modal-box">
                          <ModalHeader>
                            ADD UPDATE
                          </ModalHeader>
                          <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                            <Form>
                              <Section>
                                <Label>TEAMS</Label>
                                <Select
                                  name="Teams"
                                  onChange={(e) => handChange(e)}
                                >
                                  <option>Select a Position</option>
                                  {teamsLoader ? Loader :
                                    mainDataResult && mainDataResult.map((item: any) => (
                                      <option value={item._id} key={item._id}>{item.TeamName}</option>
                                    ))}
                                </Select>
                              </Section>
                            </Form>
                            <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                              <CreateBtn className="red" onClick={(e) => addDeleteTeam(e)}
                                style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                                ADD
                              </CreateBtn>
                              <CreateBtn className="green"
                                onClick={toggleModal}
                                style={{ background: "red", color: "white", marginRight: "1rem", }}>
                                CANCEL
                              </CreateBtn>
                            </div>
                          </ModalBody>
                        </Modal>
                        <Modal isOpen={deleteModal}
                          toggle={toggleDeleteModal}
                          modalTransition={{ timeout: 200 }}
                          size="md" contentClassName="modal-box">
                          <ModalHeader>
                            DELETE TEAM
                          </ModalHeader>
                          <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                              <CreateBtn className="red" onClick={(e) => addDeleteTeam(e)}
                                style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                                CONFIRM
                              </CreateBtn>
                              <CreateBtn className="green"
                                onClick={toggleDeleteModal}
                                style={{ background: "red", color: "white", marginRight: "1rem", }}>
                                CANCEL
                              </CreateBtn>
                            </div>
                          </ModalBody>
                        </Modal>
                     
                      </>

                )
                : ""}
              {activeTab === "tab3" ?
                (
                  leagueStagesLoading ? <Loader /> :
                    stagesResult.length === 0 ? <H2>NO DATA FOUND</H2> :
                      <>
                        <Fixture  team={mainDataResult} teamLoader={teamsLoader}/>
                        <Modal isOpen={deleteModal}
                          toggle={toggleDeleteModal}
                          modalTransition={{ timeout: 200 }}
                          size="md" contentClassName="modal-box">
                          <ModalHeader>
                            DELETE TEAM
                          </ModalHeader>
                          <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                            <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                              <CreateBtn className="red" onClick={(e) => addDeleteTeam(e)}
                                style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                                CONFIRM
                              </CreateBtn>
                              <CreateBtn className="green"
                                onClick={toggleDeleteModal}
                                style={{ background: "red", color: "white", marginRight: "1rem", }}>
                                CANCEL
                              </CreateBtn>
                            </div>
                          </ModalBody>
                        </Modal>
                        
                      </>
                )
                : ""}
            </Outlet>
          </Tab>
        }
      </Content>
    </Container>
  );
}

export default Leagues;