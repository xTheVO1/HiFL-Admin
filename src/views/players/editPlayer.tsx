import React, { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED,
} from "../../redux/actions/actionTypes";
import { MdCheck } from "react-icons/md";
import { privateHttp } from "../../baseUrl";
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
  Image,
  Select,
  FileHolder,
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getPlayerById, updatePlayer } from "../../redux/actions/players";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

export const UpdatePlayer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const getOfficial = async () => {
      dispatch(getPlayerById(id));
    };

    getOfficial();
    const {
      Address,
      NextOfKin,
      MedicalRecord,
      DocumentUploads,
      SportRecord,
      AcademicRecord,
    } = mainData;

    setObject({
      ...inputObject,
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
      PassportPhotograph: DocumentUploads?.PassportPhotograph,
      MedicalCert: DocumentUploads?.MedicalCert,
      SchoolID: DocumentUploads?.SchoolID,
      JambResultSlip: DocumentUploads?.JambResultSlip,
      JambPhotograph: DocumentUploads?.JambPhotograph,
      LatestCourseRegistration: DocumentUploads?.LatestCourseRegistration,
    });

    setFileUpload({
      ...files,
      MedicalCert: mainData?.DocumentUploads?.MedicalCert,
      PassportPhotograph: mainData?.DocumentUploads?.PassportPhotograph,
      JambPhotograph: mainData?.DocumentUploads?.JambPhotograph,
      SchoolID: mainData?.DocumentUploads?.SchoolID,
      LatestCourseRegistration:
        mainData?.DocumentUploads?.LatestCourseRegistration,
      JambResultSlip: mainData?.DocumentUploads?.JambResultSlip,
    });
    // eslint-disable-next-line
  }, [dispatch]);

  const teamId = sessionStorage.getItem("Teamid");
  const [activeTab, setActiveTab] = useState("tab1");
  const [data, setData] = useState({ Location: "" });
  const store = useSelector((state: RootState) => state.player);
  const { loading, singlePlayer } = store;
  const mainData = singlePlayer && singlePlayer ? singlePlayer : {};

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
    Dateofbirth: 0,
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
    PassportPhotograph: "",
    MedicalCert: "",
    SchoolID: "",
    JerseyNumber: "",
    CourseStudy: "",
    CourseLevel: "",
    MatricNumber: "",
    JambRegNumber: "",
    LatestCourseRegistration: "",
    JambPhotograph: "",
    JambResultSlip: "",
    SchoolPortalPassword: "",
    SchoolPortalID: "",
    Programme: "",
    CourseFaculty: "",
    fileName: "",
  });

  const [files, setFileUpload] = useState({
    MedicalCert: "",
    PassportPhotograph: "",
    JambPhotograph: "",
    SchoolID: "",
    LatestCourseRegistration: "",
    JambResultSlip: "",
  });

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const editPlayer = async (e: any) => {
    e.preventDefault();
    const details = {
      params: {
        Team: teamId,
        DateOfBirth: inputObject.Dateofbirth,
        Age: inputObject.Age,
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
        },
      },
    };
    const payload = { _id: id, params: details };
    dispatch(updatePlayer(payload));
    dispatch(getPlayerById(id));
  };

  const positions = [
    { type: "Forward", value: "FW" },
    { type: "Midfielder", value: "MF" },
    { type: "Defender", value: "DF" },
    { type: "Goal Keeper", value: "GK" },
  ];

  const fileType = [
    { type: "Passport Photograph", value: "PassportPhotograph" },
    { type: "Medical Clearance Document", value: "MedicalCert" },
    { type: "School ID CARD", value: "SchoolID" },
    { type: "JAMB Photograph", value: "JambPhotograph" },
    { type: "JAMB Result Slip", value: "JambResultSlip" },
    { type: "Latest Course Registration", value: "LatestCourseRegistration" },
  ];

  const onImageChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        const formData: any = new FormData();
        if (formData) {
          formData.append("file", event.target.files[0]);
          formData.append("folder", inputObject.fileName);
          formData.append("fileid", "passpo");
          const postFile = (playerData: any) => async (dispatch: Dispatch) => {
            try {
              dispatch({
                type: POST_FILE_STARTED,
              });
              const headers = {
                Authorization: `Bearer-Jwt ${sessionStorage.getItem("token")}`,
                "Content-Type": "multipart/formdata",
              };
              const response = await privateHttp({
                method: "post",
                url: "/file/upload/",
                headers: headers,
                data: playerData,
              });
              const { data } = response;
              setData(data.data);
              return dispatch({
                type: POST_FILE_SUCCESSFUL,
                payload: data,
              });
            } catch (error: any) {
              return dispatch({
                type: POST_FILE_FAILED,
                payload: error,
              });
            }
          };
          dispatch(postFile(formData));
          setFileUpload({
            ...files,
            [inputObject.fileName]: data.Location,
          });
          // Display the key/value pairs
          // for (var pair of formData.entries()) {
          //   console.log(pair[0] + ', ' + pair[1]);
          // }
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // };
  };

  const editAcademicInfo = (e: any) => {
    e.preventDefault();
    const details = {
      AcademicRecord: {
        CourseLevel: inputObject.CourseLevel,
        CourseStudy: inputObject.CourseStudy,
        MatricNumber: inputObject.MatricNumber,
        JambRegNumber: inputObject.JambRegNumber,
        CourseFaculty: inputObject.CourseFaculty,
        Programme: inputObject.Programme,
        SchoolPortalID: inputObject.SchoolPortalID,
        SchoolPortalPassword: inputObject.SchoolPortalPassword,
      },
    };
    const payload = { _id: id, params: details };
    dispatch(updatePlayer(payload));
    dispatch(getPlayerById(id));
  };

  const editMedicalRecord = (e: any) => {
    e.preventDefault();
    const details = {
      MedicalRecord: {
        Genotype: inputObject.Genotype,
        BloodGroup: inputObject.BloodGroup,
        AnyAllergies: inputObject.AnyAllergies,
      },
      SportRecord: {
        Position: inputObject.Position,
        JerseyNumber: inputObject.JerseyNumber,
      },
    };
    const payload = { _id: id, params: details };
    dispatch(updatePlayer(payload));
    dispatch(getPlayerById(id));
  };

  const uploadFile = (e: any) => {
    e.preventDefault();
    const details = {
      DocumentUploads: {
        PassportPhotograph: files.PassportPhotograph,
        MedicalCert: files.MedicalCert,
        SchoolID: files.SchoolID,
        JambResultSlip: files.JambResultSlip,
        JambPhotograph: files.JambPhotograph,
        LatestCourseRegistration: files.LatestCourseRegistration,
      },
    };
    const payload = { _id: id, params: details };
    dispatch(updatePlayer(payload));
    dispatch(getPlayerById(id));
  };

  return (
    <Container>
      <Content>
        <ContentHeader title={"Player Profile"}>
          <Button onClick={() => navigate("/players")}>Go Back</Button>
        </ContentHeader>
        {loading ? (
          <Loader />
        ) : (
          <Tab>
            <Nav>
              <List
                className={activeTab === "tab1" ? "active" : ""}
                onClick={() => setActiveTab("tab1")}
              >
                PERSONAL
              </List>
              <List
                className={activeTab === "tab2" ? "active" : ""}
                onClick={() => setActiveTab("tab2")}
              >
                SPORT & MEDICAL
              </List>
              <List
                className={activeTab === "tab3" ? "active" : ""}
                onClick={() => setActiveTab("tab3")}
              >
                ACADEMIC
              </List>
              <List
                className={activeTab === "tab4" ? "active" : ""}
                onClick={() => setActiveTab("tab4")}
              >
                DOCUMENT UPLOADS
              </List>
            </Nav>
            <Outlet>
              {activeTab === "tab1" ? (
                <Form onSubmit={editPlayer}>
                  <Section>
                    <FormHolder>
                      {/* <Image src={!inputObject.PassportPhotograph ? `https://hifl-temp.herokuapp.com/api/v1/${mainData.DocumentUploads.PassportPhotograph}` : `https://hifl-temp.herokuapp.com/api/v1/${inputObject.PassportPhotograph}`} alt="players" /> */}
                      {/* <Image src={"https://prod-hiv.fra1.digitaloceanspaces.com/hifl-fileserver/jhaga/plojd_B6J340GJB5_.png"} alt="players" /> */}
                    </FormHolder>
                  </Section>
                  <FormHolder>
                    <Label>FIRST NAME </Label>
                    <Input
                      type="text"
                      name="Firstname"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject?.Firstname
                          ? mainData?.User?.Firstname
                          : inputObject?.Firstname
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>LAST NAME</Label>
                    <Input
                      type="text"
                      name="Lastname"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject?.Lastname
                          ? mainData?.User?.Lastname
                          : inputObject?.Lastname
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>MIDDLE NAME</Label>
                    <Input
                      type="text"
                      name="MiddleName"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject?.MiddleName
                          ? mainData?.MiddleName
                          : inputObject?.MiddleName
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>DATE OF BIRTH</Label>
                    <Input
                      type="date"
                      name="DateOfBirth"
                      onChange={(e) => handleChange(e)}
                    />
                  </FormHolder>
                  <Section>
                    <Label>EMAIL</Label>
                    <Input
                      type="text"
                      name="Email"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject?.Email
                          ? mainData?.User?.Email
                          : inputObject?.Email
                      }
                    />
                  </Section>
                  <Section>
                    <Section>
                      <h4>HOME ADDRESS</h4>
                    </Section>
                    <FormHolder>
                      <Label>STREET ADDRESS</Label>
                      <Input
                        type="text"
                        name="StreetAddress"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.StreetAddress
                            ? mainData?.Address?.HomeAddress?.StreetAddress
                            : inputObject.StreetAddress
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="LocalGovt"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.LocalGovt
                            ? mainData?.Address?.HomeAddress?.LocalGovt
                            : inputObject.LocalGovt
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="State"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.State
                            ? mainData?.Address?.HomeAddress?.State
                            : inputObject.State
                        }
                        required
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="NearestBusStop"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.NearestBusStop
                            ? mainData?.Address?.HomeAddress?.NearestBusStop
                            : inputObject.NearestBusStop
                        }
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
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.SchoolAddress
                            ? mainData?.Address?.SchoolAddress?.StreetAddress
                            : inputObject.SchoolAddress
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="SchoolLocalGovt"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.SchoolLocalGovt
                            ? mainData?.Address?.SchoolAddress?.LocalGovt
                            : inputObject.SchoolLocalGovt
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="SchoolState"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.SchoolState
                            ? mainData?.Address?.SchoolAddress?.State
                            : inputObject.SchoolState
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="SchoolNearestBusStop"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.SchoolNearestBusStop
                            ? mainData?.Address?.SchoolAddress?.NearestBusStop
                            : inputObject.SchoolNearestBusStop
                        }
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
                        name="FullNameOfKin"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.FullNameOfKin
                            ? mainData?.NextOfKin?.FullNameOfKin
                            : inputObject.FullNameOfKin
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEXT OF KIN RELATIONSHIP</Label>
                      <Input
                        type="text"
                        name="KinRelationship"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.KinRelationship
                            ? mainData?.NextOfKin?.KinRelationship
                            : inputObject.KinRelationship
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>EMAIL</Label>
                      <Input
                        type="text"
                        name="KinEmail"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.KinEmail
                            ? mainData?.NextOfKin?.KinContact?.Email
                            : inputObject.KinEmail
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>PHONE NUMBER</Label>
                      <Input
                        type="number"
                        name="KinPhone"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.KinPhone
                            ? mainData?.NextOfKin?.KinContact?.PhoneNumber
                            : inputObject.KinPhone
                        }
                      />
                    </FormHolder>
                    <Section>
                      <Label>ADDRESS</Label>
                      <Input
                        type="text"
                        name="KinAddress"
                        onChange={(e) => handleChange(e)}
                        required
                        value={
                          !inputObject.KinAddress
                            ? mainData?.NextOfKin?.KinContact?.Address
                            : inputObject?.KinAddress
                        }
                      />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
                    <CreateBtn className="submit" disabled={true}>
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab2" ? (
                <Form onSubmit={editMedicalRecord}>
                  <Section>
                    <FormHolder>
                      <Label>POSITION</Label>
                      {mainData?.Position ? (
                        <Select
                          name="Position"
                          onChange={(e) => handleChange(e)}
                          value={
                            inputObject.Position
                              ? mainData?.Position
                              : inputObject.Position
                          }
                        >
                          <option>Select a Position</option>
                          {positions.map((item) => (
                            <option value={item.value}>{item.type}</option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          name="Position"
                          value={mainData?.SportRecord?.Position}
                          disabled
                        />
                      )}
                    </FormHolder>
                    <FormHolder>
                      <Label>JERSEY NUMBER</Label>
                      <Input
                        type="number"
                        name="JerseyNumber"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.JerseyNumber
                            ? mainData?.SportRecord?.JerseyNumber
                            : inputObject.JerseyNumber
                        }
                      />
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
                        value={
                          !inputObject.Genotype
                            ? mainData?.MedicalRecord?.Genotype
                            : inputObject.Genotype
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>BLOOD GROUP</Label>
                      <Input
                        type="text"
                        name="BloodGroup"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.BloodGroup
                            ? mainData?.MedicalRecord?.BloodGroup
                            : inputObject.BloodGroup
                        }
                      />
                    </FormHolder>
                    <Section>
                      <Label>ALLERGIES</Label>
                      <Input
                        type="text"
                        name="AnyAllergies"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.AnyAllergies
                            ? mainData?.MedicalRecord?.AnyAllergies
                            : inputObject.AnyAllergies
                        }
                      />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
                    <CreateBtn className="submit">
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab3" ? (
                <Form onSubmit={editAcademicInfo}>
                  <FormHolder>
                    <Label>MATRICULATION NUMBER</Label>
                    <Input
                      type="text"
                      name="MatricNumber"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.MatricNumber
                          ? mainData?.AcademicRecord?.MatricNumber
                          : inputObject.MatricNumber
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>JAMB REGISTRATION NUMBER</Label>
                    <Input
                      type="text"
                      name="JambRegNumber"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.JambRegNumber
                          ? mainData?.AcademicRecord?.JambRegNumber
                          : inputObject.JambRegNumber
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>LEVEL OF STUDY</Label>
                    <Input
                      type="text"
                      name="CourseLevel"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.CourseLevel
                          ? mainData?.AcademicRecord?.CourseLevel
                          : inputObject.CourseLevel
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>SCHOOL PORTAL ID</Label>
                    <Input
                      type="text"
                      name="SchoolPortalID"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.SchoolPortalID
                          ? mainData?.AcademicRecord?.SchoolPortalID
                          : inputObject.SchoolPortalID
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>COURSE OF STUDY</Label>
                    <Input
                      type="text"
                      name="CourseStudy"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.CourseStudy
                          ? mainData?.AcademicRecord?.CourseStudy
                          : inputObject.CourseStudy
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>SCHOOL PORTAL PASSWORD</Label>
                    <Input
                      type="text"
                      name="SchoolPortalPassword"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.SchoolPortalPassword
                          ? mainData?.AcademicRecord?.SchoolPortalPassword
                          : inputObject.SchoolPortalPassword
                      }
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>PROGRAMME</Label>
                    <Select onChange={(e) => handleChange(e)}>
                      <option value="undergraduate">UNDERGRADUATE</option>
                      <option value="postGraduate">PGD/MBA/MSC</option>
                    </Select>
                  </FormHolder>
                  <FormHolder>
                    <Label>COURSE FACULTY</Label>
                    <Input
                      type="text"
                      name="CourseFaculty"
                      onChange={(e) => handleChange(e)}
                      value={
                        !inputObject.CourseFaculty
                          ? mainData?.AcademicRecord?.CourseFaculty
                          : inputObject.CourseFaculty
                      }
                    />
                  </FormHolder>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
                    <CreateBtn className="submit">
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab4" ? (
                <Form onSubmit={uploadFile}>
                  {/* <Section>
                    <FileHolder> {mainData?.DocumentUploads?.SchoolID === "" ? "" : `School ID ${<MdCheck/>}` }</FileHolder>
                    <FileHolder>Jamb Photograph {mainData?.DocumentUploads?.JambPhotograph === " " || undefined ? "" : <MdCheck/> }</FileHolder>
                    <FileHolder>Jamb ResultSlip {mainData?.DocumentUploads?.JambResultSlip === "" ? "" : <MdCheck/> }</FileHolder>
                    <FileHolder>Passport Photograph {mainData?.DocumentUploads?.PassportPhotograph === "" ? "" : <MdCheck/> }</FileHolder>
                    <FileHolder>Medical Certificate {mainData?.DocumentUploads?.MedicalCert === " " ? "" : <MdCheck/>}</FileHolder>
                    <FileHolder>Latest Course Registration {mainData?.DocumentUploads?.LatestCourseRegistration === "" ? "" : <MdCheck/>}</FileHolder>
                  </Section> */}
                  <FormHolder>
                    <Label>File Name</Label>
                    <Select name="fileName" onChange={(e) => handleChange(e)}>
                      <option>Select File Name</option>
                      {fileType.map((item) => (
                        <option value={item.value} key={item.value}>
                          {item.type}
                        </option>
                      ))}
                    </Select>
                  </FormHolder>
                  {inputObject.fileName === " " ? (
                    ""
                  ) : (
                    <FormHolder>
                      <Label>File Type</Label>
                      <Input
                        type="file"
                        name="fileType"
                        onChange={(e) => onImageChange(e)}
                      />
                    </FormHolder>
                  )}
                  <Section>
                    <CreateBtn type="submit">Upload File</CreateBtn>
                  </Section>
                  <BtnDiv>
                    <CreateBtn className="submit" disabled={true}>
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
            </Outlet>
          </Tab>
        )}
      </Content>
    </Container>
  );
};
