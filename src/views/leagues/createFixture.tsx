import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

import { useNavigate, useParams } from "react-router-dom";
import {
    Label,
    FormHolder,
    CreateBtn,
    Section,
    Select
} from "../players/style";
import { Form } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {postFixture, getFixtures} from "../../redux/actions/fixtures";
import { Dispatch } from "redux";
import Input from "../../components/Input";
import {
    POST_FIXTURE_STARTED,
    POST_FIXTURE_SUCCESSFUL,
    POST_FIXTURE_FAILED
} from "../../redux/actions/actionTypes";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

const CreateFixture = ({modal, toggleModal, activeItem, closeCreateModal, stageId}: any) => {
    const dispatch: Dispatch<any> = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    // const [modal, setModal] = useState(false);
    const [inputObject, setObject]: any = useState({
        HomeTeam: "",
        AwayTeam: "",
        MatchVenue: "",
        MatchTime: ""
       
    })
    const teamsData = useSelector((state: any) => state.team);
    const teamLoader = useSelector((state: any) => state.team.loading);
    const mainDataResult = teamsData && teamsData ? teamsData.team : [];
    const FixtureLoading = useSelector((state: any) => state.fixtures.loading);
    
    const handleChange = (e: any) => {
        e.preventDefault();
        setObject({
            ...inputObject,
            [e.target.name]: e.target.value,
        });
    };

    const createFixture = async (e: any) => {
        e.preventDefault();
        const details = {
            Season: activeItem?.Season,
            League: activeItem?.League,
            Stage: stageId,
            HomeTeam: inputObject.HomeTeam,
            AwayTeam: inputObject.AwayTeam,
            MatchVenue: inputObject.MatchVenue,
            MatchTime: inputObject.MatchTime,
        }
        try {
            dispatch({
                type: POST_FIXTURE_STARTED
            })
            const response = await privateHttp({
                method: "post",
                url: `/leagues/season/fixture/create/`,
                data: details
            })
            const { data } = response;
            SuccessPopUp("Fixtures Successfully Created")
            closeCreateModal();
            dispatch(getFixtures(stageId));
            return dispatch({
                type: POST_FIXTURE_SUCCESSFUL,
                PAYLOAD: data
            })
        } catch (error: any) {
            ErrorPopUp(error.response.data.message)
            closeCreateModal();
            return dispatch({
                type: POST_FIXTURE_FAILED,
                payload: error.message

            })
        }
        // if(updateFixtures !== {})
        // setModal(!modal)
      
        // setActiveItem({...activeItem, updateFixtures})

    }

    return(
        <div>
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
                            <Label>HOME TEAM</Label>
                            <Select
                                name="HomeTeam"
                                onChange={(e) => handleChange(e)}
                            >
                                <option>Select a Team</option>
                                {teamLoader ? <Spinner /> :
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
                                {teamLoader ? <Spinner /> :
                                    mainDataResult && mainDataResult.map((item: any) => (
                                        <option value={item._id} key={item._id}>{item.TeamName}</option>
                                    ))}
                            </Select>
                        </FormHolder>
                        <FormHolder>
                            <Label>TIME</Label>
                            <Input type="text" name="MatchTime" onChange={(e) => handleChange(e)} />
                        </FormHolder>
                        <FormHolder>
                            <Label>VENUE</Label>
                            <Input type="text" name="MatchVenue" onChange={(e) => handleChange(e)} />
                        </FormHolder>
                    </Section>
                </Form>
                <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0" }}>
                    <CreateBtn className="red" onClick={(e) => createFixture(e)}
                        style={{ background: "#000229", color: "white", marginRight: "1rem" }} >
                        {FixtureLoading ? <Spinner /> : "ADD"}
                    </CreateBtn>
                    <CreateBtn className="green"
                        onClick={closeCreateModal}
                        style={{ background: "red", color: "white", marginRight: "1rem", }}>
                        CANCEL
                    </CreateBtn>
                </div>
            </ModalBody>
        </Modal>
        </div>
    )
}

export default CreateFixture;