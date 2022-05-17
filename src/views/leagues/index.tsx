import React, { useState, useEffect } from "react";
import { Container, Content } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {getleague, getleagueStage, updateLeague} from "../../redux/actions/leagues";
import { updateSeason} from "../../redux/actions/seasons";
import Input from "../../components/Input";
import Accordion from 'react-bootstrap/Accordion'

// components
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/Loader";
import { Table } from "reactstrap";
import { H2 } from "../institutions/styles";
import { Tab, Nav, List } from "../../components/tab/style";
import {
    Label,
    Form,
    FormHolder,
    CreateBtn,
    BtnDiv,
    Outlet
  } from "../players/style";

function Leagues() {
    const [activeTab, setActiveTab] = useState("tab1");
    const dispatch: Dispatch<any> = useDispatch()
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.leagues)
    const loading = useSelector((state: any) => state.leagues.loading)
    const stagesResult = items && items? items.leagueStage : [];
    const singleLeagueResult = items && items ? items.league : {};
    const { id } = useParams();

    const [inputObject, setObject] = useState({
        Abbreviation:"",
        LeagueName: "",
        RegistrationOpen:"",
        Winner: "",
        SecondPlace:"",
       ThirdPlace:"",
       FourthPlace:""

    })

    useEffect(() => {
      dispatch(getleague(id))
      dispatch(getleagueStage(id))
    }, [dispatch]);

    useEffect(() => {
        const {Settings, LeagueName, Abbreviation, Finalists } = singleLeagueResult;
        setObject({
            Abbreviation: Abbreviation,
            LeagueName: LeagueName,
            RegistrationOpen: !Settings?.RegistrationOpen ? "OPEN" : "CLOSED",
            Winner: Finalists?.Winner,
            SecondPlace: Finalists?.SecondPlace,
           ThirdPlace: Finalists?.ThirdPlace,
           FourthPlace: Finalists?.FourthPlace
        })
    }, [singleLeagueResult]);

    const addLeague = ( ) => {
        navigate("/create-league")
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
      };

      const editLeague = () => {
        const payload = {
            _id: id,
            params:{
                Abbreviation: inputObject.Abbreviation,
                LeagueName: inputObject.LeagueName,
                Settings: {
                    RegistrationOpen: inputObject.RegistrationOpen === "OPEN" ? true : false
                },
                Finalists:{
                    Winner: inputObject.Winner,
                    SecondPlace: inputObject.SecondPlace,
                   ThirdPlace: inputObject.ThirdPlace,
                   FourthPlace: inputObject.FourthPlace
                }
            }
        }
        dispatch(updateLeague(payload))
      }

// sending User ID
    return (
        <Container>
           <ContentHeader title="LEAGUE">
               <CreateBtn onClick={addLeague}>CREATE STAGE</CreateBtn>
            </ContentHeader>
            <Content>
            {loading ? <Loader/> :
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
                </Nav>
            <Outlet>
            {activeTab === "tab1" ? (
              loading ? <Loader/> :
              !singleLeagueResult ? <H2>NO DATA FOUND</H2> :
             <>
                 <Form onSubmit={editLeague}>
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
                 <FormHolder>
                   <Label>REGISTRATION STATUS</Label>
                   <Input type="text"
                     name="RegistrationOpen"
                     onChange={(e) => handleChange(e)}
                     value={inputObject.RegistrationOpen?.toUpperCase()} />
                 </FormHolder>
                 <FormHolder>
                   <Label>WINNER</Label>
                   <Input type="text"
                     name="Winner"
                     onChange={(e) => handleChange(e)}
                     value={inputObject.Winner?.toUpperCase()} />
                 </FormHolder>
                 <FormHolder>
                   <Label>SECOND POSITION</Label>
                   <Input type="text"
                     name="SecondPlace"
                     onChange={(e) => handleChange(e)}
                     value={inputObject.SecondPlace?.toUpperCase()}
                   />
                 </FormHolder>
                 <FormHolder>
                   <Label>THIRD POSITION</Label>
                   <Input type="text"
                     name="ThirdPlace"
                     onChange={(e) => handleChange(e)}
                     value={inputObject.ThirdPlace?.toUpperCase()} />
                 </FormHolder>
                 <FormHolder>
                   <Label>FOURTH POSITION</Label>
                   <Input type="text"
                     name="FourthPlace"
                     onChange={(e) => handleChange(e)}
                     value={inputObject.FourthPlace?.toUpperCase()} />
                 </FormHolder>
                 <BtnDiv>
                   <CreateBtn type="submit">{loading ? <Loader/> : "UPDATE"}</CreateBtn>
                 </BtnDiv>
               </Form>
               </>
            ) 
            :
             ""}

            {activeTab === "tab2" ? 
            (
                loading ? <Loader/> :
                stagesResult.length === 0 ? <H2>NO DATA FOUND</H2> :
              <>
              <div className='table-head'>
                  <h6>ORDER NUMBER</h6>
                  <h6>NAME</h6>
                  <h6>NO. OF TEAMS</h6>
                  <h6>STATUS</h6>
                </div>
                <Accordion>
                    {stagesResult && stagesResult?.map((item: any, index: any) => (
                <Accordion.Item eventKey={index}>
                <Accordion.Header>
                <div className='user-table-head'>
                  <h6>{item.OrderNumber}</h6>
                  <h6>{item?.StageName}</h6>
                  <h6>{item?.NoOfTeams}</h6>
                  <h6>{item?.StageName}</h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                <div className='user-table-head'>
                  <h3>TEAMS</h3>
                </div>
                </Accordion.Body>
              </Accordion.Item>
                    ))}
                </Accordion>
                </>
              )
            :""}
            </Outlet>
            </Tab>
                }
            </Content>
        </Container>
    );
}

export default Leagues;