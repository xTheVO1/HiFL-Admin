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
import Inactive from "../../assests/inactive.svg";
import { getTeams } from "../../redux/actions/teams";

function Leagues() {
  const [activeTab, setActiveTab] = useState("tab1");
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate();
  const items = useSelector((state: any) => state.leagues)
  const loading = useSelector((state: any) => state.leagues.loading)
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
  const [stageTeams, setStageTeams]: any = useState([]);
  const [inputObject, setObject] = useState({
    Abbreviation: "",
    LeagueName: "",
    RegistrationOpen: "",
    Winner: "",
    SecondPlace: "",
    ThirdPlace: "",
    FourthPlace: "",
   

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
    const { Settings, LeagueName, Abbreviation, Finalists } = singleLeagueResult;
    setObject({
      Abbreviation: Abbreviation,
      LeagueName: LeagueName,
      RegistrationOpen: !Settings?.RegistrationOpen ? "OPEN" : "CLOSED",
      Winner: Finalists?.Winner,
      SecondPlace: Finalists?.SecondPlace,
      ThirdPlace: Finalists?.ThirdPlace,
      FourthPlace: Finalists?.FourthPlace
    })
  }, [singleLeagueResult, stagesResult]);

  const addLeague = () => {
    navigate(`/create-league-stage/${id}`)
  }

  const changeTab = (tab: any) => {
    setActiveTab(tab)
    // dispatch(getPlayerById(id));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
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
          RegistrationOpen: inputObject.RegistrationOpen === "OPEN" ? true : false
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
    setStageItem({
      NoOfTeams: stage.NoOfTeams,
      OrderNumber: stage.OrderNumber,
      StageName: stage.StageName,
      Teams: [],
      ActiveStage: stage?.ActiveStage === true ? "OPENED" : "CLOSED",
      Fixtures: [],

    })
  }


  const update = (e: any) => {
    e.preventDefault();
    if (deleteTeam === true) {
      const details = {
        _id: deleteItem,
        params: {
          Teams: stageTeams
        }
      }
      dispatch(updateLeagueStage(details));
      dispatch(getleagueStage(deleteItem));
      setDelete(false)
      setDeleteModal(!deleteModal);
    } else {
      const details = {
        _id: stageId,
        params: {
          Teams: stageTeams.concat(stageItems.Teams)
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
          StageName: stageItems.StageName,
          NoOfTeams : stageItems.NoOfTeams,
          OrderNumber: stageItems.OrderNumber,
          ActiveStage: stageItems?.ActiveStage === true ? "OPENED" : "CLOSED"
        }
      }
      // dispatch(updateLeagueStage(details));
      // dispatch(getleagueStage(deleteItem));
    
  }


  const removeTeam = (id: any) => {
    setDeleteModal(!deleteModal);
    setDelete(true)
    let newTeams = stageTeams?.splice(id, 1)
    setStageTeams(newTeams)
  }

  // sending User ID
  return (
    <Container>
      <ContentHeader title="LEAGUE">
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
              <List
                className={activeTab === "tab4" ? "active" : ""}
                onClick={() => changeTab("tab4")}
              >
                UPLOADS
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
                          <Input type="text"
                            name="RegistrationOpen"
                            onChange={(e) => handleChange(e)}
                            value={inputObject.RegistrationOpen?.toUpperCase()} />
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
                                    <h6>{item.ActiveStage === true ? <span className="active">Active </span> : <span > <img src={Inactive} alt="alt" /> In-Active</span>}</h6>
                                  </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div >
                                    <Form onSubmit={(e) =>updateStage(e)} className="white" style={{ marginBottom: "1.5rem" }}>
                                      <Section>
                                        <FormHolder>
                                          <Label>STAGE</Label>
                                          <Input type="text"
                                            name="StageName"
                                            onChange={(e) => handleChange(e)}
                                            value={stageItems?.StageName?.toUpperCase()} />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>NO OF TEAMS</Label>
                                          <Input type="number"
                                            name="NoOfTeams"
                                            onChange={(e) => handleChange(e)}
                                            value={stageItems?.NoOfTeams}
                                          />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>ORDER NUMBER</Label>
                                          <Input type="number"
                                            name="OrderNumber"
                                            onChange={(e) => handleChange(e)}
                                            value={stageItems?.OrderNumber}
                                          />
                                        </FormHolder>
                                        <FormHolder>
                                          <Label>STATUS</Label>
                                          <Select
                                            name="ActiveStage"
                                            onChange={(e) => handleChange(e)}
                                            value={stageItems?.ActiveStage}
                                             >
                                            <option value="OPENED">OPENED</option>
                                            <option value="CLOSED">CLOSED</option>
                                          </Select>
                                        </FormHolder>
                                      </Section>
                                      <div>
                                      <CreateBtn className="red" type="submit"
                                      >
                                      UPDATE
                                    </CreateBtn>
                                      </div>
                                    </Form>
                                    <div className=" stage-header">
                                      <p>TEAMS</p>
                                      <div>
                                        <span>{item.NoOfTeams - item?.Teams?.length} Teams Left</span>
                                        <button onClick={() => toggleModal(item)} disabled={item.NoOfTeams === item?.Teams?.length ? true : false}>+ Add Team</button>
                                      </div>
                                    </div>
                                    {leagueStageLoading ? <Loader/> :
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
                            ACCREDITATION
                          </ModalHeader>
                          <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                            <Form>
                              <Section>
                                <Label>TEAMS</Label>
                                <Select
                                  name="Teams"
                                  onChange={(e) => handleChange(e)}
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
                              <CreateBtn className="red" onClick={(e) => update(e)}
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
                              <CreateBtn className="red" onClick={(e) => update(e)}
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
                      <CreateBtn onClick={addLeague} style={{textAlign: "right", marginTop: "1rem" }}>CREATE STAGE</CreateBtn>

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