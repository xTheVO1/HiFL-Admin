import React, { useState, useEffect, useRef } from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import moment from "moment";
import { jsPDF } from "jspdf";
import {
  MdCreate, MdRestoreFromTrash
} from "react-icons/md";
// import License from "./license/license";

// components
import ContentHeader from "../../components/ContentHeader";
import {
  Container,
  Content,
  Label,
  Form,
  FormHolder,
  Section,
  Select,
  CreateBtn,
  BtnDiv,
  Outlet,
  Red,
  Green,
  FilesHolder, TextArea, Download, Small
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getPlayerById, updatePlayer, accredictPlayer, getPlayerLicense } from "../../redux/actions/players";
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
import "./license/license.css";
import EditModal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";



export const UpdatePlayer: React.FC = () => {
  const componentRef: any = useRef();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModal, setIsModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState();
  const [fileLoading, setLoading] = useState(false);
  const [, setLicense] = useState({});
  const [disable, setDisable] = useState(false);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal]: any = useState(false);
  const [licenseModal, setLicenseModal] = useState(false);
  const [accredidationItem, setItem] = useState({});

  // const [show, setClass] = useState("none");
  const store = useSelector((state: RootState) => state.player);
  const { loading, singlePlayer, license } = store;
  const teamId = sessionStorage.getItem("Teamid");
  const mainData = singlePlayer && singlePlayer ? singlePlayer : {};
  const team: any = sessionStorage.getItem("Teamid");
  const data: any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);
  // const teamID = JSON.parse(team);
  const doc: any = new jsPDF();

  const [inputObject, setObject] = useState({
    team: "",
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
    AccreditationComment: "",
    Approval: "",
    Accredicted: "",
    AccreditationHistories: [],
    licensePhotograph: "",
    licenseName: "",
    licenseCourse: "",
    licenseTeam: "",
    Current: ""
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
    const getLicense = async () => {
      dispatch(getPlayerLicense({
        player: id,
        team
      }));
    };
    getLicense();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const data = singlePlayer && singlePlayer ? singlePlayer : {};
    const {
      Address,
      NextOfKin,
      MedicalRecord,
      DocumentUploads,
      SportRecord,
      AcademicRecord, MiddleName, User, DateOfBirth, Age, isCompleted,
    } = data;

    const licenseData = license && license.data ? license.data : {};
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
      Accredicted: !data?.AccreditationHistories ? false : data?.AccreditationHistories[0]?.Approval,
      AccreditationComment: !data?.AccreditationHistories ? false : data?.AccreditationHistories[0]?.AccreditationComment,
      Approval: !data?.AccreditationHistories ? false : data?.AccreditationHistories[0]?.Approval,
      team: data?.team,
      licensePhotograph: licenseData?.PassportPhotograph,
      licenseName: licenseData?.Fullname,
      licenseCourse: licenseData?.CourseDetail,
      licenseTeam: licenseData?.Team,
      Current: data?.Current === true ? "TRUE" : "FALSE"
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

    setLicense({
      player: id,
      teamId: team
    })

  }, [singlePlayer, license]);

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
        CreatedBy: mainData?.CreatedBy,
        Current: inputObject.Current === "true" ? true : false
      }
    };
    // console.log(details)
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
    navigate("/players")
    dispatch(getPlayerById(id));
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

  const toggleDeleteModal = (index: any) => {
    setDeleteModal(!deleteModal);
    setDeleteItem(index)
  }
  //   // Toggle for Modal
  const toggle = (data: any) => {
    setIsModal(!isModal);
    setItem(data)
  }

  //   // Toggle for Modal
  const toggleLicenseModal = (data: any) => {
    setLicenseModal(!licenseModal);

  }


  const action = (e: any) => {

  }

  const deleteAccredictItem = () => {
    setDeleteModal(!deleteModal)
    const accreditationList = mainData.AccreditationHistories;
    let newArr = accreditationList?.splice(deleteItem, 1)
    const details = {
      _id: id,
      params: {
        AccreditationHistories: accreditationList
      }
    }
    dispatch(updatePlayer(details));
    dispatch(getPlayerById(id));
  }

  return (
    <Container>
      <Modal isOpen={modal}
        toggle={toggleModal}
        modalTransition={{ timeout: 200 }}
        size="xl" contentClassName="modal-box">
        <ModalHeader>
          ACCREDITATION
        </ModalHeader>
        <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
          <Small>You are attempting to submit this player for accreditation.</Small> <br></br>
          <Small >Please <strong>note that you will no longer be able to edit this player information</strong>.</Small> <br></br>
          <Small>Do certify that all information are <strong>COMPLETE, CORRECT & VALID</strong>.</Small>
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
                        {!files.passportphotograph ? <div className="no-files"><h3>PASSPORT</h3></div> : <img src={files.passportphotograph} alt="players" />}
                      </FilesHolder>
                      <FilesHolder>
                        {!files.jambphotograph ? <div className="no-files"><h3>JAMB PHOTO</h3></div> : <img src={files.jambphotograph} alt="players" />}
                      </FilesHolder>
                      <FilesHolder>
                        {!files.schoolid ? <div className="no-files"><h3>SCHOOLID</h3></div> : <img src={files.schoolid} alt="players" />}
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
                          inputObject?.Firstname?.toUpperCase()}
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
                          inputObject?.Lastname?.toUpperCase()
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
                        value={inputObject?.MiddleName?.toUpperCase()}
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
                        value={inputObject.Email?.toUpperCase()}
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
                          value={inputObject.FullNameOfKin?.toUpperCase()}
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
                          value={inputObject.KinEmail?.toUpperCase()}
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
                    {user.Role === "Accreditor" ? "" : <BtnDiv>
                      <CreateBtn type="submit" disabled={disable} className={disable ? "disabled" : ""}>SAVE</CreateBtn>
                      {/* <CreateBtn className="submit" disabled={true}>
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn> */}
                    </BtnDiv>}
                  </Form>
                ) :
                  ""
                }
                {activeTab === "tab2" ? (
                  <Form onSubmit={editPlayer}>
                    <Section>
                      <FormHolder>
                        <Label>POSITION</Label>
                        <Select
                          name="Position"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.Position?.toUpperCase()}
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
                          value={inputObject.Genotype?.toUpperCase()}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>BLOOD GROUP</Label>
                        <Input
                          type="text"
                          name="BloodGroup"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          value={inputObject.BloodGroup?.toUpperCase()}
                        />
                      </FormHolder>
                      <Section>
                        <Label>ALLERGIES</Label>
                        <Input
                          type="text"
                          name="AnyAllergies"
                          onChange={(e) => handleChange(e)}
                          disabled={disable}
                          value={inputObject?.AnyAllergies?.toUpperCase()}
                        />
                      </Section>
                    </Section>
                    {user.Role === "Accreditor" ? "" : <BtnDiv>
                      <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">SAVE</CreateBtn>
                    </BtnDiv>}
                  </Form>
                ) :
                  ""
                }
                {activeTab === "tab3" ? (
                  <Form onSubmit={editPlayer}>
                    <FormHolder>
                      <Label>MATRICULATION NUMBER</Label>
                      <Input type="text"
                        name="MatricNumber"
                        onChange={(e) => handleChange(e)}
                        disabled={disable}
                        value={inputObject?.MatricNumber} />
                    </FormHolder>
                    <FormHolder>
                      <Label>JAMB REGISTRATION NUMBER</Label>
                      <Input type="text"
                        name="JambRegNumber"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject?.JambRegNumber?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE LEVEL</Label>
                      <Input type="text"
                        name="CourseLevel"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseLevel?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL ID</Label>
                      <Input type="text"
                        name="SchoolPortalID"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalID?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE STUDY</Label>
                      <Input type="text"
                        disabled={disable}
                        name="CourseStudy"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseStudy?.toUpperCase()}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL PASSWORD</Label>
                      <Input type="text"
                        name="SchoolPortalPassword"
                        disabled={disable}
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalPassword?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>PROGRAMME</Label>
                      <Select
                        disabled={disable}
                        onChange={(e) => handleChange(e)} value={inputObject.Programme?.toUpperCase()} name="Programme">
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
                        value={inputObject.CourseFaculty?.toUpperCase()} />
                    </FormHolder>
                    {user.Role === "Accreditor" ? "" : <BtnDiv>
                      <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">SAVE</CreateBtn>
                    </BtnDiv>}
                  </Form>
                ) : ""}
                {activeTab === "tab4" ? (
                  <>
                    <Form onSubmit={uploadFiles}>
                      <Section>
                        <div id='uploadfile'></div>
                        <Table hover>
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Document Name</th>
                              <th>Files</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr >
                              <th scope="row">1</th>
                              <td>Jamb Photograph</td>
                              <td>{!files?.jambphotograph ? <MdFolder /> : <a href={files?.jambphotograph} target="_blank" rel="noreferrer" download={false}><MdFolder /> <span>View...</span></a>}</td>
                              <td>{!files?.jambphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row">2</th>
                              <td>School ID Card</td>
                              <td>{!files?.schoolid ? <MdFolder /> : <a href={files?.schoolid} target="_blank" rel="noreferrer"><MdFolder /> <span>View...</span></a>}</td>
                              <td>{!files?.schoolid ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row">3</th>
                              <td>Jamb Result Slip</td>
                              <td>{!files?.jambslip ? <MdFolder /> : <a href={files?.jambslip} target="_blank" rel="noreferrer"><MdFolder /> <span>View...</span></a>}</td>
                              <td>{!files?.jambslip ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row">4</th>
                              <td>Passport Photograph</td>
                              <td>{!files?.passportphotograph ? <MdFolder /> : <a href={files?.passportphotograph} target="_blank" rel="noreferrer" download={false}><MdFolder /> <span>VIEW...</span></a>}</td>
                              <td>{!files?.passportphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row">5</th>
                              <td>Medical Certificate</td>
                              <td>{!files?.medicalcertificate ? <MdFolder /> : <a href={files?.medicalcertificate} target="_blank" rel="noreferrer"><MdFolder /> <span>VIEW...</span></a>}</td>
                              <td>{!files?.medicalcertificate ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row">6</th>
                              <td>Latest Course Registration</td>
                              <td>{!files?.latestcourseregistration ? <MdFolder /> : <a href={files?.latestcourseregistration} rel="noreferrer" target="_blank"><MdFolder /> <span>VIEW...</span></a>}</td>
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
                          <CreateBtn disabled={disable} className={disable ? "disabled" : ""} type="submit">
                            {fileLoading ? <Spinner /> : "Upload Files"}
                            </CreateBtn>
                        </Section>
                      </BtnDiv>
                    </Form>
                    <BtnDiv>
                      {user.Role === "SuperAdmin" ?
                        <CreateBtn onClick={changeStatus} >
                          CHANGE STATUS
                        </CreateBtn>
                        : ""}
                      {user.Role === "Accreditor" ? "" :
                        <CreateBtn className={disable ? "disabled" : "submit"} onClick={toggleModal} disabled={disable} >
                          SUBMIT FOR ACCREDITATION
                        </CreateBtn>
                      }
                    </BtnDiv>
                  </>
                ) : (
                  ""
                )}
                {activeTab === "tab5" ?
                  <>
                    <>
                      {loading ? <Loader /> :
                        (mainData.AccreditationHistories?.length === 0 ? "" :
                          //  <div style={{ textAlign: "center"}}> <h3>PENDING</h3></div> :
                          <>
                            <Table hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Year</th>
                                  <th>Status</th>
                                  <th>Accreditation Comment</th>
                                  <th>Licence</th>
                                  <th>{user.Role === "Accreditor" || user.Role === "SuperAdmin" || user.Role === "Admin" ? "Action" : ""}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {mainData && mainData.AccreditationHistories?.map((item: any, index: any) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item?.YearAccredicted}</td>
                                    <td>{item?.Approval}</td>
                                    <td>{item?.AccreditationComment?.toUpperCase()}</td>
                                    <td>{item?.Approval === "DISAPPROVED" ? "" : <Download className="btn-download" onClick={toggleLicenseModal}>DOWNLOAD</Download>}</td>
                                    <td>{user.Role === "Accreditor" || user.Role === "SuperAdmin" || user.Role === "Admin" ?
                                      <>
                                        <MdCreate style={{ color: "green", marginRight: "1.5rem" }} onClick={() => toggle(item)} />
                                        <MdRestoreFromTrash onClick={() => toggleDeleteModal(index)} style={{ color: "red" }} />
                                      </>
                                      :
                                      ""}</td>
                                    {/* <td>{ user.Role === "Accreditor" || user.Role === "SuperAdmin" ? <Download className="btn-download" onClick={() => toggle(item)}>EDIT</Download> : ""}</td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                            <DeleteModal modal={deleteModal} toggle={toggleDeleteModal} id={id} actionCall={deleteAccredictItem} />
                            <EditModal isModal={isModal} action={action} toggle={toggle} user={mainData?.AccreditationHistories} accredictItem={accredidationItem} />
                            <Modal isOpen={licenseModal}
                              toggle={toggleLicenseModal}
                              modalTransition={{ timeout: 200 }}
                              size="lg" contentClassName="modal-box">
                              <ModalHeader>
                                LICENSE
                              </ModalHeader>
                              <ModalBody style={{ textAlign: "center", fontSize: "1rem" }}>
                                <div className="box" id="divToPrint" ref={componentRef} >
                                  <div className="header">
                                  </div>
                                  <div className="passport">
                                    <img src={files?.passportphotograph} alt="user" />
                                  </div>
                                  <div className="form-box">
                                    <div className="name">
                                      <h2><span>{`${inputObject?.licenseName?.toUpperCase()}`}</span> {" "}{" "}</h2></div>
                                    <div className="form-control-box">
                                      <div className="form-group">
                                        <label>TEAM</label>
                                        <input type="text" name="team" value={inputObject?.licenseTeam} />
                                      </div>
                                      <div className="form-group">
                                        <label>POSITION</label>
                                        <input type="text" name="team" value={inputObject?.Position?.toUpperCase()} />
                                      </div>
                                      <div className="form-group">
                                        <label>COURSE & LEVEL</label>
                                        <input type="text" name="team" value={inputObject?.licenseCourse?.toUpperCase()} />
                                      </div>
                                      <div className="form-group">
                                        <label>MATRIC NO.</label>
                                        <input type="text" name="team" value={inputObject?.MatricNumber?.toUpperCase()} />
                                      </div>
                                    </div>
                                  </div>
                                  <p className="order">THIS LICENCE MUST BE PRESENTED IN COLOURED</p>
                                  <div className="footer">
                                  </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center" }}>
                                  <ReactToPrint content={() => componentRef.current}>
                                    <PrintContextConsumer>
                                      {({ handlePrint }) => (
                                        // <button onClick={handlePrint}>Print this out!</button>
                                        <Btn className="red" onClick={handlePrint}
                                          style={{ background: "green", color: "white", marginRight: "1rem" }} >
                                          PROCEED
                                        </Btn>
                                      )}
                                    </PrintContextConsumer>
                                  </ReactToPrint>
                                  <Btn className="green"
                                    onClick={toggleLicenseModal}
                                    style={{ background: "red", color: "white", marginRight: "1rem", }}>
                                    CANCEL
                                  </Btn>
                                </div>
                              </ModalBody>
                            </Modal>
                          </>
                        )}
                    </>
                    {user.Role === "Accreditor" || user.Role === "SuperAdmin" || user.Role === "Admin" ?
                      // mainData && mainData.AccreditationHistories?.length === 0  ?
                      //  "NO DATA" 
                      //  :
                      <>
                        <Form onSubmit={inputObject?.Accredicted === "APPROVED" ? editPlayer : accredict}>
                          <Section>
                            <Label>APPROVAL</Label>
                            <Select
                              name="Approval"
                              onChange={(e) => handleChange(e)} required
                              value={inputObject?.Accredicted}
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
                              onChange={(e) => handleChange(e)} required
                              value={inputObject?.AccreditationComment}
                            />
                          </Section>

                          <BtnDiv>
                            <CreateBtn type="submit">{inputObject?.Accredicted === "APPROVED" ? "EDIT & SAVE" : "SAVE"}</CreateBtn>
                          </BtnDiv>
                        </Form>
                        {user.Role === "SuperAdmin" ?
                          <Form onSubmit={editPlayer}>
                            <Section>
                              <FormHolder>
                                <Label>CHOOSE CURRENT STATUS<span>{inputObject?.Current}</span></Label>
                                <Select
                                  name="Current"
                                  onChange={(e) => handleChange(e)}
                                >
                                  <option>Select a status</option>
                                  <option value="true">TRUE</option>
                                  <option value="false">FALSE</option>
                                </Select>
                              </FormHolder>
                            </Section>
                            <FormHolder>
                              <CreateBtn type="submit">SET CURRENT</CreateBtn>
                            </FormHolder>
                          </Form>
                          : ""}
                      </>
                      : ""}
                  </>
                  : ""}
              </Outlet>
            }
          </Tab>
        )}
      </Content>
    </Container>
  );
};