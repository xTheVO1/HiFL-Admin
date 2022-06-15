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
import { getleague, getleagueStages } from "../../redux/actions/leagues";
import { getTeams } from "../../redux/actions/teams";
import moment from "moment";

const Fixture = ({fixtures, itemLoading, team, teamLoader}: any) => {
    console.log(team)
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
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteTeam, setDelete] = useState(false);
    const [deleteItem, setDeleteItem] = useState();
    const [stageId, setStageId] = useState();
    const [stageTeams, setStageTeams]: any = useState([]);
    const [inputObject, setObject] = useState({


    })

    useEffect(() => {
        // dispatch(getleague(id));
        // dispatch(getleagueStages(id));
        // dispatch(getTeams());
    }, [dispatch]);

    const handleChange = (e: any) => {
        e.preventDefault();
        setObject({
            ...inputObject,
            [e.target.name]: e.target.value,
        });
    };

    const toggleModal = (item: any) => {
        setModal(!modal);
        // setStageId(item._id);
        // setStageTeams(item.Teams);
        // dispatch(getleagueStage(item._id));
    }

    const update = (e: any) => {
        e.preventDefault();

        //   dispatch(updateLeagueStage(details))
        //   setModal(!modal);
        //   dispatch(getleagueStage(stageId));
        //   dispatch(getleagueStages(id));
    }

    return (
        <>
            <Accordion>
                {loading ? <Loader /> :
                    stagesResult && stagesResult?.map((item: any, index: any) => (
                        <Accordion.Item eventKey={index} key={index} >
                            {/* <Accordion.Item eventKey={index} key={index} onClick={() => setActiveStage(item)}> */}
                            <Accordion.Header >
                                <div className='user-table-head' >
                                    <h6>{item?.StageName}</h6>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div >
                                    <div className=" fixture-header">
                                        <p></p>
                                        <CreateBtn onClick={() => toggleModal(item)} className="" disabled={item.NoOfTeams === item?.Teams?.length ? true : false}>+ Add Fixture</CreateBtn>
                                    </div>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>MATCH NO</th>
                                                <th>MATCH</th>
                                                <th>STATUS</th>
                                                <th>DATE</th>
                                                <th>TIME</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemLoading ? <Loader/> :
                                            fixtures.length === 0 ? <h4>NO FIXTURES FOUND</h4> :
                                            fixtures && fixtures?.map((item: any, index: any) => (
                                                <tr key={index} >
                                                {/* <tr key={index} onClick={() => viewPlayers({ name: item.TeamName, id: item._id })} > */}
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{item?.MatchNumer}</td>
                                                    <td>HomeTeam V AwayTeam</td>
                                                    <td>{item?.MatchStatus}</td>
                                                    <td>{moment(item?.MatchDate).format("MMM Do YY")}</td>
                                                    <td>{item?.MatchTime}</td>
                                                </tr>
                                            ))}
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
                                <Select
                                    name="Teams"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Position</option>
                                    {teamsLoader ? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>VENUE</Label>
                                <Select
                                    name="Teams"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Position</option>
                                    {teamsLoader ? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>HOME TEAM</Label>
                                <Select
                                    name="Teams"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Position</option>
                                    {teamLoader? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
                            <FormHolder>
                                <Label>AWAY TEAM</Label>
                                <Select
                                    name="Teams"
                                    onChange={(e) => handleChange(e)}
                                >
                                    <option>Select a Position</option>
                                    {teamLoader ? <Loader /> :
                                        mainDataResult && mainDataResult.map((item: any) => (
                                            <option value={item._id} key={item._id}>{item.TeamName}</option>
                                        ))}
                                </Select>
                            </FormHolder>
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
            </Modal></>
    )
}

export default Fixture;
