import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Accordion from 'react-bootstrap/Accordion'
import {
    Modal,
    ModalHeader, ModalBody, Spinner
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
    Label,
    FormHolder,
    CreateBtn,
    Section,
    Select
} from "../players/style";

import moment from "moment";
import { getleagueStage } from "../../redux/actions/leagues";
import { getFixtures } from "../../redux/actions/fixtures";
import { Form } from "./styles";
import ViewFixture from "./viewFixture";
import {
    UPDATE_FIXTURE_STARTED,
    UPDATE_FIXTURE_SUCCESSFUL,
    UPDATE_FIXTURE_FAILED
} from "../../redux/actions/actionTypes";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";
import CreateFixture from "./createFixture";

const Fixture = ({ teamLoader }: any) => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const fixtureItem = useSelector((state: any) => state.fixtures.fixtures);
    const UpdatedFixtureItem = useSelector((state: any) => state.fixtures.newFixture);
    const FixtureLoading = useSelector((state: any) => state.fixtures.loading);
    const fixtureLoading = useSelector((state: any) => state.fixtures.updateLoading);
    const items = useSelector((state: any) => state.leagues)
    const loading = useSelector((state: any) => state.leagues.loading)
    const teamsData = useSelector((state: any) => state.team);
    const teamsLoader = useSelector((state: any) => state.team.loading);
    const mainDataResult = teamsData && teamsData ? teamsData.team : [];
    const stagesResult = items && items ? items.leagueStages : [];
    const fixtures = fixtureItem && fixtureItem ? fixtureItem : [];
    const newFixture = UpdatedFixtureItem && UpdatedFixtureItem ? UpdatedFixtureItem : [];
    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [stageId, setStageId] = useState("");
    const [activeItem, setActiveItem]: any = useState({
        HomeTeam: "",
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
        MatchStat: [],
        GoalScored: {},
        RedCard: {},
        YellowCard: {},
        ShotsOnTarget: {}
    });

    const [inputObject, setObject]: any = useState({
        id: "",
        HomeTeam: "",
        AwayTeam: "",
        MatchVenue: "",
        MatchTime: "",
        MatchDate: "",
        MatchNumer: "",
        MatchStatus: "",
        MatchType: "",
        GsHome: 0,
        GsAway: 0,
        RcHome: 0,
        RcAway: 0,
        YcHome: 0,
        YcAway: 0,
        StHome: 0,
        StAway: 0,
        HomeId: "",
        AwayId: ""
    })

    useEffect(() => {
        setObject({
            id: activeItem._id,
            HomeTeam: activeItem.HomeTeam?.TeamAbbreviation,
            HomeId: activeItem.HomeTeam?._id,
            AwayTeam: activeItem.AwayTeam?.TeamAbbreviation,
            AwayId: activeItem.AwayTeam?._id,
            MatchVenue: activeItem?.MatchVenue,
            MatchTime: activeItem?.MatchTime,
            MatchDate: activeItem?.MatchDate,
            MatchNumer: activeItem?.MatchNumer,
            MatchStatus: activeItem?.MatchStatus,
            MatchType: activeItem?.MatchType,
            GsHome: activeItem?.MatchStat ? activeItem?.MatchStat[0]?.GoalScored?.HomeTeam : "",
            GsAway: activeItem?.MatchStat ? activeItem?.MatchStat[0]?.GoalScored?.AwayTeam : "",
            RcAway: activeItem?.MatchStat ? activeItem?.MatchStat[1]?.RedCard?.AwayTeam : "",
            RcHome: activeItem?.MatchStat ? activeItem?.MatchStat[1]?.RedCard?.HomeTeam : "",
            YcHome: activeItem?.MatchStat ? activeItem?.MatchStat[2]?.YellowCard?.HomeTeam : "",
            YcAway: activeItem?.MatchStat ? activeItem?.MatchStat[2]?.YellowCard?.AwayTeam : "",
            StAway: activeItem?.MatchStat ? activeItem?.MatchStat[3]?.ShotsOnTarget?.AwayTeam : "",
            StHome: activeItem?.MatchStat ? activeItem?.MatchStat[3]?.ShotsOnTarget?.HomeTeam : "",
        })
    }, [activeItem, fixtureItem]);

    useEffect(() => {
        dispatch(getleagueStage(id))

    }, [dispatch]);

    const handleChange = (e: any) => {
        e.preventDefault();
        setObject({
            ...inputObject,
            [e.target.name]: e.target.value,
        });
    };

    const toggleModal = (item?: any) => {
        setModal(!modal);
        setActiveItem(item);
        // setStageId(item._id);
        // setStageTeams(item.Teams);
        // dispatch(getleagueStage(item._id));
    }

    const toggleEditModal = (item: any) => {
        setEditModal(!editModal);
        setActiveItem(item)
    }

    const closeCreateModal = () => {
        setModal(!modal);
    }

    async function updateFixtureItem(e: any) {
        e.preventDefault();
        const GoalScored = { HomeTeam: inputObject.GsHome, AwayTeam: inputObject.GsAway }
        const RedCard = { HomeTeam: inputObject.RcHome, AwayTeam: inputObject.RcAway }
        const YellowCard = { HomeTeam: inputObject.YcHome, AwayTeam: inputObject.YcAway }
        const ShotsOnTarget = { HomeTeam: inputObject.StHome, AwayTeam: inputObject.StAway }
        const MatchStats: any = [];
        const details = {
            _id: activeItem._id,
            params: {
                Season: activeItem?.Season?._id,
                League: activeItem?.League,
                Stage: activeItem?.Stage?._id,
                HomeTeam: inputObject.HomeId,
                AwayTeam: inputObject.AwayId,
                MatchVenue: inputObject.MatchVenue,
                MatchTime: inputObject.MatchTime,
                MatchDate: inputObject.MatchDate,
                MatchNumer: inputObject.MatchNumer,
                MatchStatus: inputObject.MatchStatus,
                MatchType: inputObject.MatchType,
                MatchStat: [...MatchStats,
                { GoalScored: GoalScored },
                { RedCard: RedCard },
                { YellowCard: YellowCard },
                { ShotsOnTarget: ShotsOnTarget }]
            }
        }
        try {
            dispatch({
                type: UPDATE_FIXTURE_STARTED
            })
            const response = await privateHttp({
                method: "patch",
                url: `/leagues/season/fixture/update/`,
                data: details
            })
            const { data } = response;
            SuccessPopUp("Fixture Successfully Updated")
            dispatch(getFixtures(stageId));
            setEditModal(!editModal);
            return dispatch({
                type: UPDATE_FIXTURE_SUCCESSFUL,
                payload: data
            })
        } catch (error: any) {
            ErrorPopUp(error.response.data.message)
            return dispatch({
                type: UPDATE_FIXTURE_FAILED,
                payload: error.response
            })
        }
    }

    const closeModal = () => {
        setEditModal(!editModal);

    }
    const getAllStageFixtures = (id: any) => {
        dispatch(getFixtures(id));
        setStageId(id)
    }

    return (
        <>
        <Accordion>
            {loading ? <Loader /> :
                stagesResult && stagesResult?.map((item: any, index: any) => (
                    <Accordion.Item eventKey={index} key={index} onClick={() => getAllStageFixtures(item._id)} >
                        <Accordion.Header >
                            <div className='user-table-head' >
                                <h6>{item?.StageName}</h6>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div >
                                <div className=" fixture-header">
                                    <p></p>
                                    <CreateBtn onClick={() => toggleModal(item)} className="">+ Add Fixture</CreateBtn>
                                </div>
                                {FixtureLoading ? <div><Loader /></div> :
                                    <ViewFixture fixtures={fixtures} toggle={toggleEditModal} />
                                }
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
        </Accordion>
        <CreateFixture modal={modal} toggleModal activeItem={activeItem} closeCreateModal={closeCreateModal} stageId={stageId}/>
        <Modal isOpen={editModal}
            toggle={toggleEditModal}
            modalTransition={{ timeout: 200 }}
            size="lg" contentClassName="modal-box">
            <ModalHeader>
                UPDATE FIXTURE
            </ModalHeader>
            <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                <Form style={{ width: "90", margin: "0 auto" }}>
                    <Section>
                        <FormHolder>
                            <Label>HOME TEAM <span>{activeItem?.HomeTeam?.TeamAbbreviation}</span></Label>
                            <Select
                                name="HomeId"
                                onChange={(e) => handleChange(e)} required

                            >
                                <option>Select a Team</option>
                                {teamLoader ? <Loader /> :
                                    mainDataResult && mainDataResult.map((item: any) => (
                                        <option value={item._id} key={item._id}>{item.TeamName}</option>
                                    ))}
                            </Select>
                        </FormHolder>
                        <FormHolder>
                            <Label>AWAY TEAM <span>{activeItem?.AwayTeam?.TeamAbbreviation}</span></Label>
                            <Select
                                name="AwayId"
                                onChange={(e) => handleChange(e)} required
                            >
                                <option>Select a Team</option>
                                {teamLoader ? <Loader /> :
                                    mainDataResult && mainDataResult.map((item: any) => (
                                        <option value={item._id} key={item._id}>{item.TeamName}</option>
                                    ))}
                            </Select>
                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH TIME
                            </Label>
                            <Input type="text"
                                name="MatchTime"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.MatchTime}
                                required
                            />
                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH VENUE</Label>
                            <Input type="text"
                                name="MatchVenue"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.MatchVenue}
                            />

                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH NUMBER</Label>
                            <Input type="text"
                                name="MatchNumer"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.MatchNumer}
                                disabled={true}
                            />
                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH DATE
                                <span>{moment(inputObject?.MatchDate).format("LL")}</span>

                            </Label>
                            <Input type="date"
                                name="MatchDate" required
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.MatchDate}
                            />
                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH STATUS <span>{inputObject?.MatchStatus}</span></Label>
                            <Select
                                name="MatchTime" required
                                onChange={(e) => handleChange(e)}
                            >
                                <option >Select Status</option>
                                <option value="FIXTURE">Fixture</option>
                                <option value="RESULT">Result</option>
                                {/* <option value="Two-leg">Two Leg</option> */}
                            </Select>
                        </FormHolder>
                        <FormHolder>
                            <Label>MATCH TYPE <span>{inputObject?.MatchType}</span></Label>
                            <Select
                                name="MatchType" required
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.MatchType}>
                                <option >Select a Type</option>
                                <option value="One-leg">One Leg</option>
                                <option value="Two-leg">Two Leg</option>
                            </Select>
                        </FormHolder>
                    </Section>
                    <Section className="form-header">
                        <h5>MATCH STATISTICS</h5>
                    </Section>
                    <Section>
                        <FormHolder>
                            <Label>GOAL SCORED (HOME TEAM)</Label>
                            <Input type="number"
                                name="GsHome"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.GsHome} />
                        </FormHolder>
                        <FormHolder>
                            <Label>GOAL SCORED (AWAY TEAM)</Label>
                            <Input type="number"
                                name="GsAway"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.GsAway} />
                        </FormHolder>
                    </Section>

                    <Section>
                        <FormHolder>
                            <Label>RED CARD (HOME TEAM)</Label>
                            <Input type="number"
                                name="RcHome"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.RcHome}
                            />
                        </FormHolder>
                        <FormHolder>
                            <Label>RED CARD (AWAY TEAM)</Label>
                            <Input type="number"
                                name="RcAway"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.RcAway} />
                        </FormHolder>
                    </Section>

                    <Section>
                        <FormHolder>
                            <Label>SHOTS ON TARGET (HOME TEAM)</Label>
                            <Input type="number" name="StHome"
                                value={inputObject?.StHome}
                                onChange={(e) => handleChange(e)} />
                        </FormHolder>
                        <FormHolder>
                            <Label>SHOTS ON TARGET (AWAY TEAM)</Label>
                            <Input type="number" name="StAway"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.StAway} />
                        </FormHolder>
                    </Section>
                    <Section>
                        <FormHolder>
                            <Label>YELLOW CARD (HOME TEAM)</Label>
                            <Input type="number" name="YcHome"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.YcHome} />
                        </FormHolder>
                        <FormHolder>
                            <Label>YELLOW CARD (AWAY TEAM)</Label>
                            <Input type="number" name="YcAway"
                                onChange={(e) => handleChange(e)}
                                value={inputObject?.YcAway} />
                        </FormHolder>
                    </Section>
                </Form>
                <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                    <CreateBtn className="red" onClick={(e) => updateFixtureItem(e)}
                        style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                        {fixtureLoading ? <Spinner /> : "UPDATE"}
                    </CreateBtn>
                    <CreateBtn className="green"
                        onClick={closeModal}
                        style={{ background: "red", color: "white", marginRight: "1rem", }}>
                        CLOSE
                    </CreateBtn>
                </div>
            </ModalBody>
        </Modal>
        </>
    )
}

export default Fixture;
