import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MdSchool } from "react-icons/md";
import moment from "moment";
import { CSVLink, CSVDownload } from "react-csv";

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
  TextArea,
  FilesHolder,
} from "./style";
import { PlayerCard } from "../../components/playerCard";
import { getPlayers } from "../../redux/actions/players_v2";
import { getOfficials } from "../../redux/actions/officials";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import Input from "../../components/Input";
import { getTeamById, updateTeam } from "../../redux/actions/teams";
import { getInstitutions } from "../../redux/actions/institutions";
import { getSports } from "../../redux/actions/sport";
import { postFiles } from "../../redux/actions/fileUpload"
const data: any = sessionStorage.getItem("userData");
const user = JSON.parse(data);

export const Players: React.FC = () => {
  const navigate = useNavigate();
  const myRef: any = useRef();
  const logoRef: any = useRef();
  const dispatch: Dispatch<any> = useDispatch();
  const [playerArray, setPlayerArray] = useState([]);
  const [officialArray, setOfficialArray] = useState([]);

  // Getting the team name and id
  const teamId = sessionStorage.getItem("Teamid");
  const teamName = sessionStorage.getItem("Teamname");

  // getting players and officials from redux store
  const store = useSelector((state: RootState) => state.player);
  const officialStore = useSelector((state: RootState) => state.officials);
  const fileStore = useSelector((state: RootState) => state.files.file);
  const { loading, players } = store;
  const { officials } = officialStore;
  const mainData = players && players ? players : [];
  const officialData = officials && officials ? officials : [];
  const fileData = fileStore && fileStore ? fileStore : {};
  const [modal, setModal] = useState(false);
  const items = useSelector((state: any) => state.leagues);
  const leaguesLoading = useSelector((state: any) => state.leagues.loading);
  const mainDataResult = items && items ? items.leagues : [];
  const teamItems = useSelector((state: any) => state.team.singleTeam);
  const teamLoading = useSelector((state: any) => state.team.loading);
  const teamDataResult = teamItems && teamItems ? teamItems : [];
  const institutionData = useSelector((state: any) => state.institution)
  const sportData = useSelector((state: any) => state.sports)
  const sportLoading = useSelector((state: any) => state.sports.loading)
  const sportResult = sportData && sportData ? sportData.sports : [];
  const institutionLoading = useSelector((state: any) => state.institution.loading)
  const institutionResult = institutionData && institutionData ? institutionData.institutions : [];
  const [activeTab, setActiveTab] = useState("PLAYERS");
  const [files, setFileUpload] = useState({
    Logo: "",
    CoverImage: ""
  });
  const [inputObject, setObject]: any = useState({
    TeamName: "",
    Overview: "",
    Category: '',
    Sport: "",
    InstitutionName: "",
    InstitutionId: "",
    TeamAbbreviation: "",
    Slug: "",
    Logo: "",
    CoverImage: "",
    SocialMediaAssets: {},
    Facebook: "",
    Twitter: "",
    Instagram: ""
  })

  const addPlayer = () => {
    navigate("/register-player-v2");
  };

  const createPlayerArray = (data: any) => {
    let newArray: any = [];
     data.forEach((item: any) => newArray.push(item.User))
     setPlayerArray(newArray)
  }

  // const createOfficialArray = (data: any) => {
  //   let newOfficial: any = [];
  //    data.forEach((item: any) => newOfficial.push(item.User))
  //    setOfficialArray(newOfficial)
  // }

  const addOfficial = () => {
    navigate("/register-official-v2");
  };

  const viewTeams = () => {
    navigate("/teams");
  };

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


  useEffect(() => {
    const { TeamAbbreviation, TeamName } = teamDataResult;
    setObject({
      TeamAbbreviation: TeamAbbreviation,
      TeamName: TeamName,
      Overview: teamDataResult?.Overview,
      Category: teamDataResult?.Category,
      Sport: teamDataResult?.Sport,
      InstitutionName: teamDataResult?.Institution?.InstitutionName,
      InstitutionId: teamDataResult?.Institution?._id,
      Slug: teamDataResult?.Slug,
      SocialMediaAssets: teamDataResult?.SocialMediaAssets,
      Facebook: teamDataResult?.SocialMediaAssets?.Facebook,
      Twitter: teamDataResult?.SocialMediaAssets?.Twitter,
      Instagram: teamDataResult?.SocialMediaAssets?.Instagram,
      // Instagram: SocialMediaAssets?.Instagram
    })
    setFileUpload({
      Logo: teamDataResult?.TeamLogo,
      CoverImage: teamDataResult?.TeamCoverPhoto
    })
  }, [teamDataResult]);

  useEffect(() => {
    createPlayerArray(mainData)
    // createOfficialArray(officialData)
  }, []);
  


  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const category = [
    { name: "Men" },
    { name: "Women" }
  ];

  const update = (e: any) => {
    e.preventDefault();
    const SocialMediaAssets: any = [];
    const details = {
      _id: teamId,
      params: {
        TeamAbbreviation: inputObject.TeamAbbreviation,
        TeamName: inputObject.TeamName,
        Overview: inputObject.Overview,
        Category: inputObject.Category,
        Sport: inputObject.Sport,
        Institution: inputObject.InstitutionId,
        Slug: inputObject?.Slug,
        SocialMediaAssets: {
          ...SocialMediaAssets,
          Facebook: inputObject?.Facebook,
          Twitter: inputObject?.Twitter,
          Instagram: inputObject?.Instagram,
        }
        // Logo: inputObject?.Logo,
        // CoverImage: inputObject?.CoverImage,
      }
    }
    dispatch(updateTeam(details))
    dispatch(getTeamById(teamId));
  }

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }

  const onImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setFileUpload({
          ...files,
          [event.target.name]: event.target.files[0]
        })

      };
      reader.readAsDataURL(event.target.files[0]);

    }
    // };
  };

  const upload = (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    if (formData) {
      formData.append(
        "teamid",
        teamId
      )
      formData.append(
        "TeamLogo",
        files.Logo
      )
      formData.append(
        "TeamCoverPhoto",
        files.CoverImage
      )
    }
    //     for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }`  `
    dispatch(postFiles(formData))
    // setFile(fileData)
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
                {user.Role === "SuperAdmin" ?
                  <>
                    |
                    <p
                      className={activeTab === "TEAM" ? "active" : ""}
                      onClick={() => setActiveTab("TEAM")}
                    >
                      {" "}
                      MANAGE TEAM
                    </p>
                  </> : ""}
              </div>
            </Table>
            {activeTab === "TEAM" ?
              <div>
                {teamLoading ? <Loader /> :
                  <Form >
                    <div style={{ display: "flex" }}>
                      <FilesHolder style={{ marginRight: "3rem" }}>
                        {!files?.Logo ?
                          <div className="no-files">
                            <div>
                              {/* <input type="file"ref={logoRef} name="Logo" style={{display: "none"}}/> */}
                              {/* <MdCameraAlt onClick={(e) => handleClick(e)} style={{cursor: "pointer"}}/> */}
                            </div>
                            <h3>LOGO</h3>
                          </div>
                          : <img src={files?.Logo} alt="teams-logo" className="team-img" />}
                      </FilesHolder>
                      <FilesHolder>
                        {!files?.CoverImage ?
                          <div className="no-files">
                            <div>
                              {/* <input type="file" ref={myRef} name="Logo" style={{display: "none"}}/> */}
                              {/* <MdCameraAlt onClick={(e) => logoClick(e)} style={{cursor: "pointer"}}/> */}
                            </div>
                            <h3>COVER <br></br>IMAGE</h3>
                          </div> : <img src={files?.CoverImage} alt="team " className="team-img" />}
                      </FilesHolder>
                    </div>
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
                        <Label>SLUG</Label>
                        <Input
                          name="Slug"
                          onChange={(e) => handleChange(e)}
                          value={inputObject?.Slug}
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
                      <FormHolder>
                        <Label>INSTITUTION NAME <span style={{ color: "green" }}>{inputObject?.InstitutionName}</span></Label>
                        <Select
                          name="InstitutionId"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select an Institution</option>
                          {institutionLoading ? Loader :
                            institutionResult && institutionResult.map((item: any) => (
                              <option value={item._id} key={item._id}>{item?.InstitutionName}</option>
                            ))}
                        </Select>
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
                      {/* {inputObject.SocialMediaAssets?.map((item: any) => (
                      <FormHolder>
                      <Label>{item?.value}</Label>
                      <Input
                        name={item.value}
                        onChange={(e) => handleChange(e)}
                        value={inputObject?.Facebook}
                      />
                      </FormHolder>
                      ))} */}
                      <FormHolder>
                        <Label>FACEBOOK</Label>
                        <Input
                          name="Facebook"
                          onChange={(e) => handleChange(e)}
                          value={inputObject?.Facebook}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>TWITTER</Label>
                        <Input
                          name="Twitter"
                          onChange={(e) => handleChange(e)}
                          value={inputObject?.Twitter}
                        />
                      </FormHolder>
                      <Section>
                        <Label>INSTAGRAM</Label>
                        <Input
                          name="Instagram"
                          onChange={(e) => handleChange(e)}
                          value={inputObject?.Instagram}
                        />
                      </Section>
                    </Section>
                    <Section>
                      <Label>OVERVIEW</Label>
                      <TextArea
                        name="Overview"
                        onChange={(e) => handleChange(e)}
                        value={inputObject?.Overview}
                      />
                    </Section>
                    <Section>
                      <FormHolder>
                        <Label>Logo</Label>
                        <Input name="Logo" type="file" alt="Team logo" onChange={onImageChange} />
                      </FormHolder>
                      <FormHolder>
                        <Label>COVER IMAGE</Label>
                        <Input name="CoverImage" type="file" onChange={onImageChange} alt="Team Cover Image" />
                      </FormHolder>
                    </Section>
                    <FormHolder style={{ paddingBottom: "3rem" }}>
                      <CreateBtn onClick={(e) => upload(e)} style={{ background: "#FFB422", color: "#000229", marginLeft: "-.1rem" }} >{loading ? <Loader /> : "UPLOAD FILES"}</CreateBtn>
                    </FormHolder>
                    <BtnDiv style={{ paddingBottom: "3rem" }}>
                      <CreateBtn onClick={(e) => update(e)} >{loading ? <Loader /> : "UPDATE"}</CreateBtn>
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
                        <>
                      {/* <CSVLink data={officialArray}><CreateBtn>DOWNLOAD</CreateBtn> </CSVLink> */}
                        <CreateBtn
                          onClick={addOfficial}
                          className={
                            mainDataResult[0]?.Settings?.RegistrationOpen === true
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
                        </>
                      ) : (
                        ""
                      )}
                      {activeTab === "PLAYERS" ? (
                        mainData?.length === 30 ? "" :
                        <>
                          <CreateBtn
                            onClick={addPlayer}
                            className={
                              "disabled"
                            }
                            disabled={
                              true
                              }
                          >
                            + PLAYER
                          </CreateBtn>
                          <CSVLink data={playerArray}><CreateBtn>DOWNLOAD</CreateBtn> </CSVLink>
                        </>
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
                        approval={!item?.AccreditationHistories ? "PENDING" : item?.AccreditationHistories[0]?.Approval}
                        status={!item?.isCompleted ? "" : item?.isCompleted}
                        playerName={item?.User?.Firstname + " " + item?.User?.Lastname}
                        age={moment(item?.DateOfBirth).fromNow(true)}
                        position={!item?.SportRecord ? "" : item?.SportRecord?.Position}
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
                          key={item._id}
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
