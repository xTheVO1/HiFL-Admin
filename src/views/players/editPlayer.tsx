import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import moment from "moment";
// components
import ContentHeader from "../../components/ContentHeader";
import {
  Container,
  Label,
  Content,
  Form,
  FormHolder,
  CreateBtn,
  BtnDiv,
  Outlet,
  Section,
  Select,
  Red,
  Green,
  FilesHolder,TextArea
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getPlayerById, updatePlayer, accredictPlayer } from "../../redux/actions/players";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { MdCheck, MdFolder, MdCancel } from "react-icons/md";
import { Spinner, Table } from "reactstrap";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "../../redux/actions/actionTypes";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";
import { Btn } from "../../components/playerCard/style";
import {
  Modal,
  ModalHeader, ModalBody
} from "reactstrap";

export const UpdatePlayer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.player);
  const { loading, singlePlayer } = store;
  const teamId = sessionStorage.getItem("Teamid");
  const [activeTab, setActiveTab] = useState("tab1");
  const [fileLoading, setLoading] = useState(false);
  const mainData = singlePlayer ? singlePlayer : {};
  const [modal, setModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const data: any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);

  const [inputObject, setObject] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    MiddleName: "",
    SchoolAddress: "",
    SchoolNearestBusStop: "",
    SchoolState: "",
    SchoolLocalGovt: "",
    StreetAddress: "",
    NearestBusStop: "",
    State: "",
    LocalGovt: "",
    SchLGA: "",
    DateOfBirth: 0,
    Age: 0,
    FullNameOfKin: "",
    KinRelationship: "",
    KinPhone: "",
    KinAddress: "",
    KinEmail: "",
    Position: "",
    Genotype: "",
    BloodGroup: "",
    AnyAllergies: "",
    JerseyNumber: "",
    CourseStudy: "",
    CourseLevel: "",
    MatricNumber: "",
    JambRegNumber: "",
    SchoolPortalPassword: "",
    SchoolPortalID: "",
    Programme: "",
    CourseFaculty: "",
    fileName: "",
    AccreditationComment:"",
    Approval: "",
    Accredicted: "",
    AccreditationHistories: []
  });
  const [files, setFileUpload] = useState({
    medicalcertificate: "",
    passportphotograph: "",
    jambphotograph: "",
    schoolid: "",
    latestcourseregistration: "",
    jambslip: ""
  });

  useEffect(() => {
    const getOfficial = async () => {
      dispatch(getPlayerById(id));
    };
    getOfficial();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const data = singlePlayer ? singlePlayer : {};
    const {
      Address,
      NextOfKin,
      MedicalRecord,
      DocumentUploads,
      SportRecord,
      AcademicRecord, MiddleName, User, DateOfBirth, Age, isCompleted, AccreditationHistories
    } = data;
    // console.log(AccreditationHistories[0])
    setDisable(isCompleted);
    setObject({
      ...inputObject,
      Age: Age,
      Firstname: User?.Firstname,
      Lastname: User?.Lastname,
      Email: User?.Email,
      DateOfBirth: DateOfBirth,
      MiddleName: MiddleName,
      FullNameOfKin: NextOfKin?.FullNameOfKin,
      KinRelationship: NextOfKin?.KinRelationship,
      KinPhone: NextOfKin?.KinContact?.PhoneNumber,
      KinAddress: NextOfKin?.KinContact?.Address,
      KinEmail: NextOfKin?.KinContact?.Email,
      StreetAddress: Address?.HomeAddress?.StreetAddress,
      LocalGovt: Address?.HomeAddress?.LocalGovt,
      NearestBusStop: Address?.HomeAddress?.NearestBusStop,
      State: Address?.HomeAddress?.LocalGovt,
      SchoolAddress: Address?.SchoolAddress?.StreetAddress,
      SchoolLocalGovt: Address?.SchoolAddress?.LocalGovt,
      SchoolNearestBusStop: Address?.SchoolAddress?.NearestBusStop,
      SchoolState: Address?.SchoolAddress?.LocalGovt,
      Position: SportRecord?.Position,
      JerseyNumber: SportRecord?.JerseyNumber,
      Genotype: MedicalRecord?.Genotype,
      BloodGroup: MedicalRecord?.BloodGroup,
      AnyAllergies: MedicalRecord?.AnyAllergies,
      MatricNumber: AcademicRecord?.MatricNumber,
      JambRegNumber: AcademicRecord?.JambRegNumber,
      CourseFaculty: AcademicRecord?.CourseFaculty,
      Programme: AcademicRecord?.Programme,
      SchoolPortalID: AcademicRecord?.SchoolPortalID,
      SchoolPortalPassword: AcademicRecord?.SchoolPortalPassword,
      CourseLevel: AcademicRecord?.CourseLevel,
      CourseStudy: AcademicRecord?.CourseStudy,
      AccreditationComment:"",
      Approval: "",
      // Accredicted: AccreditationHistories === [] ? "" : AccreditationHistories[0].Approval,
      Accredicted : !data?.AccreditationHistories ? false : data?.AccreditationHistories[0]?.Approval

    });
    setFileUpload({
      ...files,
      passportphotograph: DocumentUploads?.PassportPhotograph,
      medicalcertificate: DocumentUploads?.MedicalCert,
      schoolid: DocumentUploads?.SchoolID,
      jambslip: DocumentUploads?.JambResultSlip,
      jambphotograph: DocumentUploads?.JambPhotograph,
      latestcourseregistration: DocumentUploads?.LatestCourseRegistration
    })

  }, [singlePlayer]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const editPlayer = async (e: any) => {
    e.preventDefault();
    const newAge = moment(inputObject?.DateOfBirth).fromNow(true).split(" ")
    const details = {
      _id: id,
      params: {
        Team: teamId,
        DateOfBirth: inputObject.DateOfBirth,
        Age: parseInt(newAge[0]),
        TermsAndConditions: true,
        NextOfKin: {
          FullNameOfKin: inputObject.FullNameOfKin,
          KinRelationship: inputObject.KinRelationship,
          KinContact: {
            PhoneNumber: inputObject.KinPhone,
            Email: inputObject.KinEmail,
            Address: inputObject.KinAddress,
          },
        },
        Address: {
          HomeAddress: {
            StreetAddress: inputObject.StreetAddress,
            LocalGovt: inputObject.LocalGovt,
            State: inputObject.State,
            NearestBusStop: inputObject.NearestBusStop,
          },
          SchoolAddress: {
            StreetAddress: inputObject.SchoolAddress,
            LocalGovt: inputObject.SchoolLocalGovt,
            State: inputObject.SchoolState,
            NearestBusStop: inputObject.SchoolNearestBusStop,
          }
        },
        YearApplied: [
          {
            Year: 2022
          }
        ],
        MedicalRecord: {
          Genotype: inputObject.Genotype,
          BloodGroup: inputObject.BloodGroup,
          AnyAllergies: inputObject.AnyAllergies,
        },
        SportRecord: {
          Position: inputObject.Position,
          JerseyNumber: inputObject.JerseyNumber,
        },
        AcademicRecord: {
          CourseLevel: inputObject.CourseLevel,
          CourseStudy: inputObject.CourseStudy,
          MatricNumber: inputObject.MatricNumber,
          JambRegNumber: inputObject.JambRegNumber,
          CourseFaculty: inputObject.CourseFaculty,
          Programme: inputObject.Programme,
          SchoolPortalID: inputObject.SchoolPortalID,
          SchoolPortalPassword: inputObject.SchoolPortalPassword
        },
        CreatedBy: mainData?.CreatedBy
      }
    };
    dispatch(updatePlayer(details));
    dispatch(getPlayerById(id));
  };

  const submitPlayer = async (e: any) => {
    e.preventDefault();
    const details = {
      _id: id,
      params: {
        isCompleted: true
      }
    };
    setModal(!modal);
    dispatch(updatePlayer(details));
    navigate("/players")
    // dispatch(getPlayerById(id));
  };

  const accredict = async (e: any) => {
    e.preventDefault();
    const details = {
      _id: id,
      params: {
          YearAccredicted: 2022,
          AccreditationComment: inputObject.AccreditationComment,
          Approval: inputObject.Approval
      }
    };
    dispatch(accredictPlayer(details));
    dispatch(getPlayerById(id));
    navigate("/players")
    // dispatch(getPlayerById(id));
  };

  const changeStatus = async (e: any) => {
    e.preventDefault();
    const details = {
      _id: id,
      params: {
        isCompleted: false
      }
    };
    dispatch(updatePlayer(details));
    dispatch(getPlayerById(id));
    navigate("/players")
  };


  const uploadFiles = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    const formData: any = new FormData();
    if (formData) {
      formData.append(
        "playerid",
        id
      )
      formData.append(
        "medicalcertificate",
        files.medicalcertificate
      )
      formData.append(
        "passportphotograph",
        files.passportphotograph
      )
      formData.append(
        "latestcourseregistration",
        files.latestcourseregistration
      )
      formData.append(
        "schoolid",
        files.schoolid
      )
      formData.append(
        "jambslip",
        files.jambslip
      )
      formData.append(
        "jambphotograph",
        files.jambphotograph
      )
    }
    //   for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }
    try {
      dispatch({
        type: POST_FILE_STARTED
      })
      const headers = {
        "Authorization": `Bearer-Jwt ${sessionStorage.getItem('token')}`,
        "Content-Type": "multipart/formdata"
      }
      const response = await privateHttp({
        method: "post",
        url: '/players/player/docuploads/',
        headers: headers,
        data: formData
      })
      const { data } = response;
      const { DocumentUploads } = data.data;
      setFileUpload({
        ...files,
        passportphotograph: DocumentUploads?.PassportPhotograph,
        medicalcertificate: DocumentUploads?.MedicalCert,
        schoolid: DocumentUploads?.SchoolID,
        jambslip: DocumentUploads?.JambResultSlip,
        jambphotograph: DocumentUploads?.JambPhotograph,
        latestcourseregistration: DocumentUploads?.LatestCourseRegistration
      })
      setLoading(false);
      SuccessPopUp("File uploaded Successfully");
      return dispatch({
        type: POST_FILE_SUCCESSFUL,
        payload: data.data
      })
    } catch (error: any) {
      setLoading(false);
      ErrorPopUp(error.response.data.message)
      return dispatch({
        type: POST_FILE_FAILED,
        payload: error
      })
    }
  }

  const positions = [
    { type: "Forward", value: "FW" },
    { type: "Midfielder", value: "MF" },
    { type: "Defender", value: "DF" },
    { type: "Goal Keeper", value: "GK" }
  ]

  const status = [
    { type: "APPROVED", value: "APPROVED" },
    { type: "DISAPPROVED", value: "DISAPPROVED" }
  ]

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

  const changeTab = (tab: any) => {
    setActiveTab(tab)
    dispatch(getPlayerById(id));

  }

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }

  return (
    <Container>
      <Modal isOpen={modal}
        toggle={toggleModal}
        modalTransition={{ timeout: 2000 }}>
        <ModalHeader>
          ACCREDITATION
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <small>You are attempting to submit this player for accreditation.</small> <br></br>
          <small >Please <strong>note that you will no longer be able to edit this player information</strong>.</small> <br></br>
          <small>Do certify that all information are <strong>COMPLETE, CORRECT & VALID</strong>.</small>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btn className="red" onClick={(e) => submitPlayer(e)}
              style={{ background: "green", color: "white", marginRight: "1rem" }} >
              PROCEED
            </Btn>
            <Btn className="green"
              onClick={toggleModal}
              style={{ background: "red", color: "white", marginRight: "1rem", }}>
              CANCEL
            </Btn>
          </div>
        </ModalBody>
      </Modal>
      <Content>
        <ContentHeader title={"Update Player Profile"}>
          <Button onClick={() => navigate("/players")}>Go Back</Button>
        </ContentHeader>
        {loading ? (
          <Loader />
        ) : (
          <Tab>
            <Nav>
              <List
                className={activeTab === "tab1" ? "active" : ""}
                onClick={() => changeTab("tab1")}
              >
                PERSONAL
              </List>
              <List
                className={activeTab === "tab2" ? "active" : ""}
                onClick={() => changeTab("tab2")}
              >
                SPORT & MEDICAL
              </List>
              <List
                className={activeTab === "tab3" ? "active" : ""}
                onClick={() => changeTab("tab3")}
              >
                ACADEMIC
              </List>
              <List
                className={activeTab === "tab4" ? "active" : ""}
                onClick={() => changeTab("tab4")}
              >
                DOCUMENT UPLOADS
              </List>
              <List
                className={activeTab === "tab5" ? "active" : ""}
                onClick={() => changeTab("tab5")}
              >
                ACCREDITATION
              </List>
             
            </Nav>
            {!mainData ? "" :
              <Outlet>
                {activeTab === "tab1" ? (
                  <Form onSubmit={editPlayer}>
                    <Section className="flex">
                        <FilesHolder>
                        {!files.passportphotograph ? <div className="no-files"><h3>PASSPORT</h3></div> : <img src={files.passportphotograph} alt="players"/>}
                        </FilesHolder>
                        <FilesHolder>
                        {!files.jambphotograph ? <div className="no-files"><h3>JAMB PHOTO</h3></div> : <img src={files.jambphotograph} alt="players"/>}
                        </FilesHolder>
                        <FilesHolder>
                        {!files.schoolid ? <div className="no-files"><h3>SCHOOLID</h3></div> : <img src={files.schoolid} alt="players"/>}
                        </FilesHolder>
                    </Section>
                    <FormHolder>
                      <Label>FIRST NAME </Label>
                      <Input
                        type="text"
                        name="Firstname"
                        onChange={(e) => handleChange(e)}
                        disabled={disable}
                        value={
                          inputObject?.Firstname}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LAST NAME</Label>
                      <Input
                        type="text"
                        name="Lastname"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject?.Lastname
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>MIDDLE NAME</Label>
                      <Input
                        type="text"
                        name="MiddleName"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject?.MiddleName}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>DATE OF BIRTH
                        <span>{moment(inputObject?.DateOfBirth).format("LL")}({inputObject?.Age} Years)</span>
                      </Label>
                      <Input
                        type="date"
                        name="DateOfBirth"
                        disabled={disable}
                        max="2006-01-01" min="1993-12-31"
                        onChange={(e) => handleChange(e)}
                      />

                    </FormHolder>
                    <Section>
                      <Label>EMAIL</Label>
                      <Input
                        type="text"
                        name="Email"
                        onChange={(e) => handleChange(e)}
                        disabled={true}
                        value={inputObject.Email}
                      />
                    </Section>
                    <Section>
                      <Section>
                        <h4>HOME ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input
                          disabled={disable}
                          type="text"
                          name="StreetAddress"
                          onChange={(e) => handleChange(e)}
                          required
                          value={inputObject.StreetAddress}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input
                          type="text"
                          name="LocalGovt"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.LocalGovt}
                          disabled={disable}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input
                          type="text"
                          name="State"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.State} required
                          disabled={disable}

                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input
                          type="text"
                          name="NearestBusStop"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.NearestBusStop}
                          disabled={disable}

                        />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>SCHOOL ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input
                          type="text"
                          name="SchoolAddress"
                          onChange={(e) => handleChange(e)} required
                          disabled={disable}
                          value={inputObject.SchoolAddress}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input
                          type="text"
                          name="SchoolLocalGovt"
                          onChange={(e) => handleChange(e)} required
                          disabled={disable}
                          value={inputObject.SchoolLocalGovt}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input
                          type="text"
                          name="SchoolState"
                          onChange={(e) => handleChange(e)} required
                          disabled={disable}
                          value={inputObject.SchoolState}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input
                          type="text"
                          name="SchoolNearestBusStop"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          required
                          value={inputObject.SchoolNearestBusStop}
                        />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>NEXT OF KIN</h4>
                      </Section>
                      <FormHolder>
                        <Label>FULL NAME</Label>
                        <Input
                          type="text"
                          disabled={disable}
                          name="FullNameOfKin"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.FullNameOfKin}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEXT OF KIN RELATIONSHIP</Label>
                        <Input
                          type="text"
                          name="KinRelationship"
                          onChange={(e) => handleChange(e)} required
                          disabled={disable}
                          value={inputObject.KinRelationship}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>EMAIL</Label>
                        <Input
                          type="text"
                          name="KinEmail"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          required
                          value={inputObject.KinEmail}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>PHONE NUMBER</Label>
                        <Input
                          type="number"
                          name="KinPhone"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          required
                          value={inputObject.KinPhone}
                        />
                      </FormHolder>
                      <Section>
                        <Label>ADDRESS</Label>
                        <Input
                          type="text"
                          name="KinAddress"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          required
                          value={inputObject.KinAddress}
                        />
                      </Section>
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit" disabled={disable} className={disable ? "disabled" : ""}>SAVE</CreateBtn>
                      {/* <CreateBtn className="submit" disabled={true}>
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn> */}
                    </BtnDiv>
                  </Form>
                ) : (
                  ""
                )}
                {activeTab === "tab2" ? (
                  <Form onSubmit={editPlayer}>
                    <Section>
                      <FormHolder>
                        <Label>POSITION</Label>
                        <Select
                          name="Position"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.Position}
                        >
                          <option>Select a Position</option>
                          {positions.map(item => (
                            <option value={item.value}>{item.type}</option>
                          ))}
                        </Select>
                      </FormHolder>
                      <FormHolder>
                        <Label>JERSEY NUMBER</Label>
                        <Input type="number"
                          name="JerseyNumber"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.JerseyNumber} />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>MEDICAL RECORD</h4>
                      </Section>
                      <FormHolder>
                        <Label>GENOTYPE</Label>
                        <Input
                          type="text"
                          name="Genotype"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          value={inputObject.Genotype}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>BLOOD GROUP</Label>
                        <Input
                          type="text"
                          name="BloodGroup"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          value={inputObject.BloodGroup}
                        />
                      </FormHolder>
                      <Section>
                        <Label>ALLERGIES</Label>
                        <Input
                          type="text"
                          name="AnyAllergies"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          value={inputObject.AnyAllergies}
                        />
                      </Section>
                    </Section>
                    <BtnDiv>
                      <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">SAVE</CreateBtn>
                    </BtnDiv>
                  </Form>
                ) : (
                  ""
                )}
                {activeTab === "tab3" ? (
                  <Form onSubmit={editPlayer}>
                    <FormHolder>
                      <Label>MATRICULATION NUMBER</Label>
                      <Input type="text"
                        name="MatricNumber"
                        onChange={(e) => handleChange(e)}
                        disabled={disable}
                        value={inputObject.MatricNumber} />
                    </FormHolder>
                    <FormHolder>
                      <Label>JAMB REGISTRATION NUMBER</Label>
                      <Input type="text"
                        name="JambRegNumber"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.JambRegNumber} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE LEVEL</Label>
                      <Input type="text"
                        name="CourseLevel"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseLevel} />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL ID</Label>
                      <Input type="text"
                        name="SchoolPortalID"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalID} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE STUDY</Label>
                      <Input type="text"
                        disabled={disable}
                        name="CourseStudy"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseStudy}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL PASSWORD</Label>
                      <Input type="text"
                        name="SchoolPortalPassword"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalPassword} />
                    </FormHolder>
                    <FormHolder>
                      <Label>PROGRAMME</Label>
                      <Select
                        disabled={disable}
                        onChange={(e) => handleChange(e)} value={inputObject.Programme} name="Programme">
                        <option >Select Programme</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Post-Graduate">Post-Graduate</option>
                      </Select>
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE FACULTY</Label>
                      <Input type="text"
                        disabled={disable}
                        name="CourseFaculty"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseFaculty} />
                    </FormHolder>
                    <BtnDiv>
                      <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">SAVE</CreateBtn>
                    </BtnDiv>
                  </Form>
                ) : (
                  ""
                )}
                {activeTab === "tab4" ? (
                  <>
                    <Form onSubmit={uploadFiles}>
                      <Section>
                        <Table hover>
                          <thead>
                            <tr>
                              <th></th>
                              <th>#</th>
                              <th>File Type</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.jambphotograph ? <MdFolder /> : <a href={files?.jambphotograph} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Jamb Photograph</td>
                              <td>{!files?.jambphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.schoolid ? <MdFolder /> : <a href={files?.schoolid} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>School ID Card</td>
                              <td>{!files?.schoolid ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.jambslip ? <MdFolder /> : <a href={files?.jambslip} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Jamb Result Slip</td>
                              <td>{!files?.jambslip ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.passportphotograph ? <MdFolder /> : <a href={files?.passportphotograph} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Passport Photograph</td>
                              <td>{!files?.passportphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.medicalcertificate ? <MdFolder /> : <a href={files?.medicalcertificate} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Medical Certificate</td>
                              <td>{!files?.medicalcertificate ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.latestcourseregistration ? <MdFolder /> : <a href={files?.latestcourseregistration} rel="noreferrer" target="_blank"><MdFolder /></a>}</td>
                              <td>Latest Course Registration</td>
                              <td>{!files?.latestcourseregistration ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Section>
                      <Section>
                        <h3>Upload Documents</h3>
                      </Section>
                      <FormHolder>
                        <Label>Medical Certificate</Label>
                        <Input
                          type="file"
                          name="medicalcertificate"
                          onChange={(e) => onImageChange(e)}
                          accept=".png, .jpg, .jpeg .pdf"
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Passport Photograph</Label>
                        <Input
                          type="file"
                          name="passportphotograph"
                          onChange={(e) => onImageChange(e)}
                          accept=".png, .jpg, .jpeg"
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Latest Course Registration</Label>
                        <Input
                          type="file"
                          name="latestcourseregistration"
                          accept=".pdf"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>School ID</Label>
                        <Input
                          type="file"
                          name="schoolid"
                          onChange={(e) => onImageChange(e)}
                          accept=".pdf .png, .jpg, .jpeg"

                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Jamb Result Slip</Label>
                        <Input
                          type="file"
                          name="jambslip"
                          accept=".pdf"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Jamb Photograph</Label>
                        <Input
                          type="file"
                          name="jambphotograph"
                          onChange={(e) => onImageChange(e)}
                          accept=".pdf .png, .jpg, .jpeg"
                        />
                      </FormHolder>
                      <BtnDiv>
                        <Section>
                          <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">{fileLoading ? <Spinner /> : "Upload Files"}</CreateBtn>
                        </Section>
                      </BtnDiv>
                    </Form>
                    <BtnDiv>
                      {user.Role === "SuperAdmin" ?
                    <CreateBtn onClick={changeStatus} >
                        CHANGE STATUS
                      </CreateBtn>
                      :""}
                      <CreateBtn className={disable ? "disabled" : "submit"} onClick={toggleModal} disabled={disable} >
                        SUBMIT FOR ACCREDITATION
                      </CreateBtn>
                    </BtnDiv>
                  </>
                ) : (
                  ""
                )}
                  {activeTab === "tab5" ? 
              user.Role === "Accreditor" || user.Role === "SuperAdmin" ? 

                    <Form onSubmit={accredict}>
                    <Section>
                        <Label>APPROVAL</Label>
                        <Select
                          name="Approval"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.Approval}
                        >
                          <option>Select a status</option>
                          {status.map(item => (
                            <option value={item.value}>{item.type}</option>
                          ))}
                        </Select>
                      </Section>
                      <Section>
                        <Label>COMMENTS</Label>
                        <TextArea
                          name="AccreditationComment"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.AccreditationComment} />
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit">SAVE</CreateBtn>
                    </BtnDiv>
                    </Form>

                  : loading ? <Loader/> :(
                    mainData.AccreditationHistories?.length === 0 ? <div style={{ textAlign: "center"}}> <h3>PENDING</h3></div> :
                    <Table hover>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Year</th>
                              <th>Status</th>
                              <th>Accreditation Comment</th>
                              <th>Licence</th>
                          </tr>
                      </thead>
                      <tbody>
                      {mainData && mainData.AccreditationHistories?.map((item: any, index: any) => (
                        <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item?.YearAccredicted}</td>
                              <td>{item?.Approval}</td>
                              <td>{item?.AccreditationComment}</td>
                              <td>{item?.Approval === "DISAPPROVED" ? "" : "DOWNLOAD"}</td>
                          </tr>
                          )) }
                      </tbody>
                    </Table>
                 )
                  : ""}
              </Outlet>
            }
          </Tab>
        )}
      </Content>
    </Container>
  );
};