import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import Input from "../../components/Input";
import Accordion from 'react-bootstrap/Accordion'
import {
    Modal,
    ModalHeader, ModalBody
} from "reactstrap";
import { Loader } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import {
    Label,
    Form,
    FormHolder,
    CreateBtn,
    Section,
    Select
} from "../players/style";
import { Table } from "reactstrap";
import moment from "moment";
import {getleagueStage} from "../../redux/actions/leagues";
import {postFixture} from "../../redux/actions/fixtures";


const Fixture = ({fixtures, itemLoading, team, teamLoader}: any) => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const items = useSelector((state: any) => state.leagues)
    const loading = useSelector((state: any) => state.leagues.loading)
    const teamsData = useSelector((state: any) => state.team);
    const teamsLoader = useSelector((state: any) => state.team.loading);
    const mainDataResult = teamsData && teamsData ? teamsData.team : [];
    const stagesResult = items && items ? items.leagueStages : [];
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [activeItem, setActiveItem]: any = useState({ HomeTeam: "",
            AwayTeam: "",
            MatchVenue: "",
            MatchTime: "",
            MatchDate: "",
            MatchNumer: "",
            MatchStatus: "",
            MatchType: "",
            Season: "",
            League: "",
            Stage: "",
            GoalScored:{},});

    const [inputObject, setObject] = useState({
        HomeTeam: "",
        AwayTeam: "",
        MatchVenue: "",
        MatchTime: "",
        MatchDate: "",
        MatchNumer: "",
        MatchStatus: "",
        MatchType: "",
        GoalScored:{},


    })

    useEffect(() => {
        
    }, [activeItem]);

    useEffect(() => {
        getleagueStage(id)
    }, [dispatch]);

    console.log(stagesResult)
    const handleChange = (e: any) => {
        e.preventDefault();
        setObject({
            ...inputObject,
            [e.target.name]: e.target.value,
        });
    };

    const toggleModal = (item: any) => {
        setModal(!modal);
        setActiveItem(item)
        // setStageId(item._id);
        // setStageTeams(item.Teams);
        // dispatch(getleagueStage(item._id));
    }

    const toggleEditModal = (item: any) => {
        setEditModal(!editModal);
        setActiveItem(item)
    }
    const createFixture = (e: any) => {
        e.preventDefault();
        const details = {
            Season: activeItem?.Season?._id,
            League: activeItem?.League,
            Stage: activeItem?.Stage?._id,
            HomeTeam: inputObject.HomeTeam,
            AwayTeam: inputObject.AwayTeam,
            MatchVenue: inputObject.MatchVenue,
            MatchTime: inputObject.MatchTime,
        }
        // dispatch(postFixture(details))
        setActiveItem({})

    }
    
    return (
        <>
            <Accordion>
                {loading ? <Loader /> :
                     fixtures && fixtures?.map((item: any, index: any) => (
                        <Accordion.Item eventKey={index} key={index} >
                            <Accordion.Header >
                                <div className='user-table-head' >
                                    <h6>{item?.Stage?.StageName}</h6>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div >
                                    <div className=" fixture-header">
                                        <p></p>
                                        <CreateBtn onClick={() => toggleModal(item)} className="">+ Add Fixture</CreateBtn>
                                    </div>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>MATCH NO</th>
                                                <th >MATCH</th>
                                                <th>STATUS</th>
                                                <th>DATE</th>
                                                <th>TIME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemLoading ? <Loader/> :
                                                <tr key={index} onClick={() => toggleEditModal(item)}>
                                                    <th scope="row">{index + 1}.</th>
                                                    <td>{item?.MatchNumer}</td>
                                                    <td>{item?.HomeTeam?.TeamAbbreviation} <strong style={{color: "green"}}>Vs</strong> { item?.AwayTeam?.TeamAbbreviation}</td>
                                                    <td>{item?.MatchStatus}</td>
                                                    <td>{moment(item?.MatchDate).format("MMM Do YY")}</td>
                                                    <td>{item?.MatchTime}</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
            </Accordion>
            <Modal isOpen={modal}
                toggle={toggleModal}
                modalTransition={{ timeout: 200 }}
                size="lg" contentClassName="modal-box">
                <ModalHeader>
                    ADD FIXTURE
                </ModalHeader>
                <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                    <Form>
                        <Section>
                            <FormHolder>
                                <Label>TIME</Label>
                                <Input type="text" name="MatchTime" onChange={(e) => handleChange(e)}/>
                            </FormHolder>
                            <FormHolder>
                                <Label>VENUE</Label>
                                <Input type="text" name="MatchVenue" onChange={(e) => handleChange(e)}/>

                            </FormHolder>
                            <FormHolder>
                                <Label>HOME TEAM</Label>
                                <Select
                                    name="HomeTeam"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Team</option>
                                    {teamLoader? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>AWAY TEAM</Label>
                                <Select
                                    name="AwayTeam"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Team</option>
                                    {teamLoader ? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                        </Section>
                    </Form>
                    <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                        <CreateBtn className="red" onClick={(e) => createFixture(e)}
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
            <Modal isOpen={editModal}
                toggle={toggleEditModal}
                modalTransition={{ timeout: 200 }}
                size="lg" contentClassName="modal-box">
                <ModalHeader>
                   UPDATE FIXTURE
                </ModalHeader>
                <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                    <Form>
                        <Section>
                            <FormHolder>
                                <Label>MATCH TIME</Label>
                                <Input type="text" name="MatchTime" onChange={(e) => handleChange(e)}/>
                            </FormHolder>
                            <FormHolder>
                                <Label>MATCH VENUE</Label>
                                <Input type="text" name="MatchVenue" onChange={(e) => handleChange(e)}/>

                            </FormHolder>
                            <FormHolder>
                                <Label>MATCH NUMBER</Label>
                                <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                            </FormHolder>
                            <FormHolder>
                                <Label>MATCH DATE</Label>
                                <Input type="date" name="MatchDate" onChange={(e) => handleChange(e)}/>
                            </FormHolder>
                            <FormHolder>
                                <Label>HOME TEAM</Label>
                                <Select
                                    name="HomeTeam"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Team</option>
                                    {teamLoader? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>AWAY TEAM</Label>
                                <Select
                                    name="AwayTeam"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Team</option>
                                    {teamLoader ? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>MATCH STATUS</Label>
                                <Input type="text" name="MatchTime" onChange={(e) => handleChange(e)}/>
                            </FormHolder>
                            <FormHolder>
                                <Label>MATCH TYPE</Label>
                                <Input type="text" name="MatchVenue" onChange={(e) => handleChange(e)}/>

                            </FormHolder>
                        </Section>
                    <Section className="form-header">
                        <h5>MATCH STATISTIC</h5>
                    </Section>
                    <Section>
                    <FormHolder>
                        <Label>GOAL SCORED (HOME TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    <FormHolder>
                        <Label>GOAL SCORED (AWAY TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    </Section>
                    
                    <Section>
                    <FormHolder>
                        <Label>RED CARD (HOME TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    <FormHolder>
                        <Label>RED CARD (AWAY TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    </Section>
                    
                    <Section>
                    <FormHolder>
                        <Label>SHOTS ON TARGET (HOME TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    <FormHolder>
                        <Label>SHOTS ON TARGET (AWAY TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    </Section>
                   
                    <Section>
                    <FormHolder>
                        <Label>YELLOW CARD (HOME TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    <FormHolder>
                        <Label>YELLOW CARD (AWAY TEAM)</Label>
                        <Input type="text" name="MatchNumer" onChange={(e) => handleChange(e)}/>
                    </FormHolder>
                    </Section>
                    </Form>
                    <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                        <CreateBtn className="red" onClick={(e) => createFixture(e)}
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
        </>
    )
}

export default Fixture;
