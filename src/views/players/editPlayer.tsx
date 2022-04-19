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
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getPlayerById, updatePlayer } from "../../redux/actions/players";
import { postFile } from "../../redux/actions/fileUpload"
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { MdCheck, MdFolder, MdCancel } from "react-icons/md";
import { Spinner, Table } from "reactstrap";

export const UpdatePlayer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.player);
  const { loading, singlePlayer } = store;
  const teamId = sessionStorage.getItem("Teamid");
  const [activeTab, setActiveTab] = useState("tab1");
  const mainData = singlePlayer ? singlePlayer : {};

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
    fileName: ""
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
      AcademicRecord, MiddleName, User, DateOfBirth, Age
    } = data;
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
      CourseStudy: AcademicRecord?.CourseStudy
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

  const uploadFiles = (e: any) => {
    e.preventDefault();
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
    dispatch(postFile(formData))
    dispatch(getPlayerById(id));

  }
  const positions = [
    { type: "Forward", value: "FW" },
    { type: "Midfielder", value: "MF" },
    { type: "Defender", value: "DF" },
    { type: "Goal Keeper", value: "GK" }
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
            </Nav>
            {!mainData ? "" :
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
                          inputObject?.Firstname}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LAST NAME</Label>
                      <Input
                        type="text"
                        name="Lastname"
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
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input
                          type="text"
                          name="State"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.State} required
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input
                          type="text"
                          name="NearestBusStop"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.NearestBusStop}
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
                          value={inputObject.SchoolAddress}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input
                          type="text"
                          name="SchoolLocalGovt"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.SchoolLocalGovt}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input
                          type="text"
                          name="SchoolState"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.SchoolState}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input
                          type="text"
                          name="SchoolNearestBusStop"
                          onChange={(e) => handleChange(e)}
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
                          value={inputObject.KinRelationship}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>EMAIL</Label>
                        <Input
                          type="text"
                          name="KinEmail"
                          onChange={(e) => handleChange(e)}
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
                          required
                          value={inputObject.KinAddress}
                        />
                      </Section>
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit">SAVE</CreateBtn>
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
                          value={inputObject.Genotype}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>BLOOD GROUP</Label>
                        <Input
                          type="text"
                          name="BloodGroup"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.BloodGroup}
                        />
                      </FormHolder>
                      <Section>
                        <Label>ALLERGIES</Label>
                        <Input
                          type="text"
                          name="AnyAllergies"
                          onChange={(e) => handleChange(e)}
                          value={inputObject.AnyAllergies}
                        />
                      </Section>
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit">SAVE</CreateBtn>
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
                        value={inputObject.MatricNumber} />
                    </FormHolder>
                    <FormHolder>
                      <Label>JAMB REGISTRATION NUMBER</Label>
                      <Input type="text"
                        name="JambRegNumber"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.JambRegNumber} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE LEVEL</Label>
                      <Input type="text"
                        name="CourseLevel"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseLevel} />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL ID</Label>
                      <Input type="text"
                        name="SchoolPortalID"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalID} />
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE STUDY</Label>
                      <Input type="text"
                        name="CourseStudy"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseStudy}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>SCHOOL PORTAL PASSWORD</Label>
                      <Input type="text"
                        name="SchoolPortalPassword"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.SchoolPortalPassword} />
                    </FormHolder>
                    <FormHolder>
                      <Label>PROGRAMME</Label>
                      <Select onChange={(e) => handleChange(e)} value={inputObject.Programme} name="Programme">
                        <option >Select Programme</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Post-Graduate">Post-Graduate</option>
                      </Select>
                    </FormHolder>
                    <FormHolder>
                      <Label>COURSE FACULTY</Label>
                      <Input type="text"
                        name="CourseFaculty"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.CourseFaculty} />
                    </FormHolder>
                    <BtnDiv>
                      <CreateBtn type="submit">SAVE</CreateBtn>
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
                              <td>{!files?.jambphotograph ? <MdFolder /> :<a href={files?.jambphotograph} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Jamb Photograph</td>
                              <td>{!files?.jambphotograph ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.schoolid ? <MdFolder /> : <a href={files?.schoolid} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>School ID Card</td>
                              <td>{!files?.schoolid  ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.jambslip ? <MdFolder /> :<a href={files?.jambslip} target="_blank" rel="noreferrer"><MdFolder /></a> }</td>
                              <td>Jamb Result Slip</td>
                              <td>{!files?.jambslip ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.passportphotograph ? <MdFolder /> :<a href={files?.passportphotograph} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Passport Photograph</td>
                              <td>{!files?.passportphotograph ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.medicalcertificate ? <MdFolder /> :<a href={files?.medicalcertificate} target="_blank" rel="noreferrer"><MdFolder /></a>}</td>
                              <td>Medical Certificate</td>
                              <td>{!files?.medicalcertificate ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
                            </tr>
                            <tr  >
                              <th scope="row"></th>
                              <td>{!files?.latestcourseregistration ? <MdFolder /> :<a href={files?.latestcourseregistration} rel="noreferrer" target="_blank"><MdFolder /></a>}</td>
                              <td>Latest Course Registration</td>
                              <td>{!files?.latestcourseregistration ? <Red ><MdCancel/></Red> : <Green><MdCheck /></Green>}</td>
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
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Passport Photograph</Label>
                        <Input
                          type="file"
                          name="passportphotograph"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Latest Course Registration</Label>
                        <Input
                          type="file"
                          name="latestcourseregistration"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>School ID</Label>
                        <Input
                          type="file"
                          name="schoolid"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Jamb Result Slip</Label>
                        <Input
                          type="file"
                          name="jambslip"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <FormHolder>
                        <Label>Jamb Photograph</Label>
                        <Input
                          type="file"
                          name="jambphotograph"
                          onChange={(e) => onImageChange(e)}
                        />
                      </FormHolder>
                      <BtnDiv>
                        <Section>
                          <CreateBtn type="submit">{loading ? <Spinner /> : "Upload Files"}</CreateBtn>
                        </Section>

                      </BtnDiv>
                    </Form>
                  </>
                ) : (
                  ""
                )}
              </Outlet>
            }
          </Tab>
        )}
      </Content>
    </Container>
  );
};