import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MdSchool } from "react-icons/md";
import moment from "moment";

// components and styles
import ContentHeader from "../../components/ContentHeader";
import {
   Container,
    Content,
     Table,
  Label,
  Form,
  FormHolder,
  Section,
  Select,
  CreateBtn,
  BtnDiv,
  TextArea, } from "./style";
import { PlayerCard } from "../../components/playerCard";
import { getPlayers } from "../../redux/actions/players";
import { getOfficials } from "../../redux/actions/officials";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import Input from "../../components/Input";
import { getTeamById, updateTeam } from "../../redux/actions/teams";
import { getInstitutions} from "../../redux/actions/institutions";
import { getSports} from "../../redux/actions/sport";

const data: any = sessionStorage.getItem("userData");
const user = JSON.parse(data);

export const Players: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  
  // Getting the team name and id
  const teamId = sessionStorage.getItem("Teamid");
  const teamName = sessionStorage.getItem("Teamname");

  // getting players and officials from redux store
  const store = useSelector((state: RootState) => state.player);
  const officialStore = useSelector((state: RootState) => state.officials);
  const { loading, players } = store;
  const { officials } = officialStore;
  const mainData = players && players ? players : [];
  const officialData = officials && officials ? officials : [];
  const [modal, setModal] =useState(false)
  const items = useSelector((state: any) => state.leagues);
  const leaguesLoading = useSelector((state: any) => state.leagues.loading);
  const mainDataResult = items && items ? items.leagues : [];
  const teamItems = useSelector((state: any) => state.team.singleTeam);
  const teamLoading = useSelector((state: any) => state.team.loading);
  const teamDataResult =  teamItems &&  teamItems ? teamItems : [];
  const institutionData = useSelector((state: any) => state.institution)
  const sportData = useSelector((state: any) => state.sports)
  const sportLoading = useSelector((state: any) => state.sports.loading)
  const sportResult = sportData && sportData ? sportData.sports : [];
  const institutionLoading = useSelector((state: any) => state.institution.loading)
  const institutionResult = institutionData && institutionData ? institutionData.institutions : [];
  

  const [activeTab, setActiveTab] = useState("PLAYERS");
  const [disable, setDisable] = useState(false);
  const [inputObject, setObject] = useState({
    TeamName: "", 
    Overview: "", 
    Category: '', 
    Sport: "", 
    InstitutionName: "",
    TeamAbbreviation:""})

  // const addPlayer = () => {
  //   navigate("/register-player");
  // };

  // const addOfficial = () => {
  //   navigate("/register-official");
  // };

  const viewTeams = () => {
    navigate("/teams");
  };


  useEffect(() => {
    const {TeamAbbreviation, TeamName } = teamDataResult;
    setObject({
      TeamAbbreviation: TeamAbbreviation,
      TeamName: TeamName, 
      Overview: teamDataResult?.Overview, 
      Category: teamDataResult?.Category, 
      Sport: teamDataResult?.Sport, 
      InstitutionName: teamDataResult?.Institution?.InstitutionName})
  },[dispatch])

  useEffect(() => {
    if (teamId === "") {
      navigate("/dashboard");
    }
    dispatch(getPlayers(teamId));
    dispatch(getOfficials(teamId));
    // dispatch(getleagues());
    dispatch(getInstitutions());
    dispatch(getSports());
    dispatch(getTeamById(teamId));
  }, [dispatch, teamId, navigate]);


  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const category = [
    {name: "Men"},
    {name: "Women"}
  ];

  const update = (e: any) => {
    e.preventDefault();
    const details = {
      _id: teamId,
      params:{
        TeamName: inputObject.TeamName, 
        Overview: inputObject.Overview, 
        Category: inputObject.Category, 
        Sport: inputObject.Sport, 
        Institution: inputObject.InstitutionName
      }
    }
    dispatch(updateTeam(details))
  }
  
  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container>
        <Content>
            <Table className="padding">
              <div className="players-flex-start">
                <p onClick={viewTeams}>
                  <MdSchool /> ALL TEAMS{" "}
                </p>
                <p>|</p>
                <p className="active">
                  {" "}
                  <MdSchool />
                  {teamName}
                </p>
              </div>
              <div className="players-flex-header">
                <p
                  className={activeTab === "PLAYERS" ? "active" : ""}
                  onClick={() => setActiveTab("PLAYERS")}
                >
                  MANAGE PLAYERS{" "}
                </p>{" "}
                |
                <p
                  className={activeTab === "OFFICIAL" ? "active" : ""}
                  onClick={() => setActiveTab("OFFICIAL")}
                >
                  {" "}
                  MANAGE OFFICIALS
                </p>
                |
                <p
                  className={activeTab === "TEAM" ? "active" : ""}
                  onClick={() => setActiveTab("TEAM")}
                >
                  {" "}
                  MANAGE TEAMS
                </p>
              </div>
            </Table>
            {activeTab === "TEAM" ?
              <div>
                {teamLoading ? <Loader/> :
                <Form onSubmit={(e) => update(e)}>
                  <Section>
                    <FormHolder>
                    <Label>TEAM NAME</Label>
                    <Input
                      name="TeamName"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.TeamName}
                    />
                    </FormHolder>
                    <FormHolder>
                    <Label>TEAM ABBREVIATION</Label>
                    <Input
                      name="TeamAbbreviation"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.TeamAbbreviation}
                    />
                    
                    </FormHolder>
                  </Section>
                  <Section>
                  <FormHolder>  
                    <Label>CATEGORY</Label>
                    <Select
                      name="Category"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.Category}
                    >
                      <option>Select a Category</option>
                      {category.map((item: any) => (
                        <option value={item.name} key={item.name}>{item?.name}</option>
                      ))}
                    </Select>
                      </FormHolder>
                  <FormHolder>
                    <Label>SPORT</Label>
                    <Select
                      name="Sport"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.Sport}
                    >
                      <option>Select a Sport</option>
                      {sportLoading ? Loader :
                        sportResult && sportResult.map((item: any) => (
                          <option value={item._id} key={item._id}>{item?.SportName}</option>
                        ))}
                    </Select>
                      </FormHolder>
                  </Section>
                  <Section>
                    <Label>INSTITUTION NAME</Label><span style={{color: "green"}}>{inputObject?.InstitutionName}</span>
                    <Select
                      name="InstitutionName"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.InstitutionName}
                    >
                      <option>Select an Institution</option>
                      {institutionLoading ? Loader :
                        institutionResult && institutionResult.map((item: any) => (
                          <option value={item._id} key={item._id}>{item?.InstitutionName}</option>
                        ))}
                    </Select>
                    </Section>
                    <Section>
                    
                    <Label>OVERVIEW</Label>
                    <TextArea
                      name="Overview"
                      onChange={(e) => handleChange(e)}
                      value={inputObject?.Overview}
                    />
                    </Section>
                  <BtnDiv style={{paddingBottom: "3rem"}}>
                    <CreateBtn type="submit" >{loading ? <Loader /> : "UPDATE"}</CreateBtn>
                  </BtnDiv>
                </Form>
                 }
              </div>
              :
              <>
            <ContentHeader
              title={
                activeTab === "OFFICIAL"
                  ? `OFFICIALS (${officialData.length})`
                  : `PLAYERS (${mainData.length})`
              }
            >
              {user.Role === "Accreditor" ? (
                ""
              ) : (
                <>
                  {activeTab === "OFFICIAL" ? (
                    <CreateBtn
                      // onClick={addOfficial}
                      className={
                        mainDataResult[0]?.Settings?.RegistrationOpen !== true
                          ? "disabled"
                          : "disabled"
                      }
                      disabled={
                        mainDataResult[0]?.Settings?.RegistrationOpen !== true
                          ? true
                          : false
                      }
                    >
                      REGISTER OFFICIAL
                    </CreateBtn>
                  ) : (
                    ""
                  )}
                  {activeTab === "PLAYERS" ? (
                    <CreateBtn
                      // onClick={addPlayer}
                      className={
                        mainDataResult[0]?.Settings?.RegistrationOpen !== true
                          ? "disabled"
                          : "disabled"
                      }
                      disabled={
                        mainDataResult[0]?.Settings?.RegistrationOpen !==
                          true || mainData?.length === 30
                          ? true
                          : false
                      }
                    >
                      REGISTER PLAYER
                    </CreateBtn>
                  ) : (
                    ""
                  )}
                 
                </>
              )}
            </ContentHeader>
            <Table>
              <div className="players-header">
                <p className="">DETAILS</p>
                <div className="players-header-flex">
                  <p>SUBMITTED</p>
                  <p>APPROVAL</p>
                  <p>ACTION</p>
                </div>
              </div>
            </Table>
          {activeTab === "OFFICIAL" ? (
            loading ? (
              <Loader />
            ) : officialData.length === 0 ? (
              <NoData text="NO DATA FOUND" />
            ) : (
              officialData &&
              officialData?.map((item: any) => (
                <PlayerCard
                  key={item._id}
                  PlayerLogo={item?.DocumentUploads?.PassportPhotograph}
                  type="OFFICIALS"
                  _id={item._id}
                  approval={
                    !item?.AccreditationHistories
                      ? "PENDING"
                      : item?.AccreditationHistories[0]?.Approval
                  }
                  status={!item?.isCompleted ? "" : item?.isCompleted}
                  playerName={
                    item?.User?.Firstname + " " + item?.User?.Lastname
                  }
                  age={moment(item?.DateOfBirth).fromNow(true)}
                  position={
                    !item?.SportRecord ? "" : item?.SportRecord?.Position
                  }
                />
              ))
            )
          ) : (
            <>
              {loading ? (
                <Loader />
              ) : mainData.length === 0 ? (
                <NoData text="NO DATA FOUND" />
              ) : (
                mainData &&
                mainData?.map((item: any) => (
                  <PlayerCard
                    type="PLAYER"
                    PlayerLogo={item?.DocumentUploads?.PassportPhotograph}
                    _id={item._id}
                    age={!item?.Age ? "" : item?.Age}
                    approval={
                      item?.AccreditationHistories === []
                        ? "PENDING"
                        : item?.AccreditationHistories[0]?.Approval
                    }
                    status={!item?.isCompleted ? "" : item?.isCompleted}
                    playerName={
                      item?.User?.Firstname + " " + item?.User?.Lastname
                    }
                    position={
                      !item?.SportRecord ? "" : item?.SportRecord?.Position
                    }
                  />
                ))
              )}
            </>
          )}
          </>
}
</Content>
        </Container>
      )}
    </>
  );
};
