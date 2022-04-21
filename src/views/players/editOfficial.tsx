import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

// components
import ContentHeader from "../../components/ContentHeader";
import {
  Container,
  Label,
  Content,
  FormHolder,
  Form,
  CreateBtn,
  BtnDiv,
  Outlet,
  Section,
  Red,
  Green,

} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getOfficialById, updateOfficials } from "../../redux/actions/officials";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import moment from "moment";
import { Spinner, Table } from "reactstrap";
import { MdCheck, MdFolder, MdCancel } from "react-icons/md";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "../../redux/actions/actionTypes";
import { privateHttp } from "../../baseUrl";
import { ErrorPopUp, SuccessPopUp } from "../../utils/toastify";

export const UpdateOfficial: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [, refresh] = useState("");
  const [inputObject, setObject] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
    DateOfBirth: "",
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
    OfficialID: ""
  });
  const [files, setFileUpload] = useState({
    medicalcertificate: "",
    passportphotograph: "",
    schoolid: "",
    officialid: ""
  });
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.officials)
  const fileData = useSelector((state: RootState) => state.files)
  const { loading, official } = store;
  const { fileLoading } = fileData;
  const teamId = sessionStorage.getItem("Teamid");

  useEffect(() => {
    const getOfficial = async () => {
      dispatch(getOfficialById(id));
    }
    getOfficial();

    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const data = official ? official : {};
    const {
      Address,
      NextOfKin,
      MedicalRecord,
      DocumentUploads,
      SportRecord, MiddleName, User, DateOfBirth, Age
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
      // JerseyNumber: SportRecord?.JerseyNumber,
      Genotype: MedicalRecord?.Genotype,
      BloodGroup: MedicalRecord?.BloodGroup,
      AnyAllergies: MedicalRecord?.AnyAllergies
    });
    setFileUpload({
      ...files,
      passportphotograph: DocumentUploads?.PassportPhotograph,
      medicalcertificate: DocumentUploads?.MedicalCert,
      schoolid: DocumentUploads?.SchoolID,
    })

  }, [official]);

  const editOfficial = (e: any) => {
    e.preventDefault();
    const details = {
      Team: teamId,
      Position: inputObject.Position,
      // Phonenumber: object.phone,
      DateOfBirth: inputObject.Dateofbirth,
      Age: inputObject.Age,
      TermsAndConditions: true,
      NextOfKin: {
        FullNameOfKin: inputObject.FullNameOfKin,
        KinRelationship: inputObject.KinRelationship,
        kinContact: {
          PhoneNumber: inputObject.KinPhone,
          Email: inputObject.KinEmail,
          Address: inputObject.KinAddress
        }
      },
      SchoolAddress: {
        StreetAddress: inputObject.SchoolAddress,
        LocalGovt: inputObject.SchoolLocalGovt,
        State: inputObject.State,
        NearestBusStop: inputObject.NearestBusStop
      },
      MedicalRecord: {
        Genotype: inputObject.Genotype,
        BloodGroup: inputObject.BloodGroup,
        AnyAllergies: inputObject.AnyAllergies
      },
      DocumentUploads: {
        PassportPhotograph: inputObject.PassportPhotograph,
        MedicalCert: inputObject.MedicalCert,
        SchoolID: inputObject.SchoolID
      }
    }
    const payload = { _id: id, params: details }
    dispatch(updateOfficials(payload));
    dispatch(getOfficialById(id));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value
    });
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

  const uploadFiles = async (e: any) => {
    e.preventDefault();
    const formData: any = new FormData();
    if (formData) {
      formData.append(
        "officialid",
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
        "schoolid",
        files.schoolid
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
        url: '/officials/official/docuploads/',
        headers: headers,
        data: formData
      })
      const { data } = response;
      const { DocumentUploads } = data.data;
      setFileUpload({
        ...files,
        passportphotograph: DocumentUploads?.PassportPhotograph,
        medicalcertificate: DocumentUploads?.MedicalCert,
        schoolid: DocumentUploads?.SchoolID
      })
      SuccessPopUp("File uploaded Successfully");
      return dispatch({
        type: POST_FILE_SUCCESSFUL,
        payload: data.data
      })
    } catch (error: any) {
      ErrorPopUp(error.response.data)
      return dispatch({
        type: POST_FILE_FAILED,
        payload: error
      })
    }
  }

  const changeTab = (tab: any) => {
    setActiveTab(tab)
    dispatch(getOfficialById(id));
    refresh('')
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title={"OFFICIAL PROFILE"}
        > <Button onClick={() => navigate("/players")}>GO BACK</Button>
        </ContentHeader>
        {loading ? <Loader /> :
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
                DOCUMENT UPLOADS
              </List>
            </Nav>
            <Outlet>
              {activeTab === "tab1" ? (
                loading ? <Loader /> :
                  <Form onSubmit={editOfficial}>
                    {/* <Section>
                      <FormHolder>
                        <Image src={Player} alt="players" />
                      </FormHolder>
                    </Section> */}
                    <FormHolder>
                      <Label>FIRST NAME </Label>
                      <Input type="text" name="Firstname" onChange={(e) => handleChange(e)} required value={inputObject.Firstname} />
                    </FormHolder>
                    <FormHolder>
                      <Label>LAST NAME</Label>
                      <Input type="text" name="Lastname" onChange={(e) => handleChange(e)} required value={inputObject.Lastname} />
                    </FormHolder>
                    <FormHolder>
                      <Label>MIDDLE NAME</Label>
                      <Input type="text" name="MiddleName" onChange={(e) => handleChange(e)} required value={inputObject.MiddleName} />
                    </FormHolder>
                    <FormHolder>
                      <Label>DATE OF BIRTH
                        <span>{moment(inputObject?.DateOfBirth).format("LL")}({inputObject?.Age} Years)</span>
                      </Label>
                      <Input type="date" name="DateOfBirth" onChange={(e) => handleChange(e)} />
                    </FormHolder>
                    <Section>
                      <Label>EMAIL</Label>
                      <Input type="text" name="Email" disabled={true} onChange={(e) => handleChange(e)} value={inputObject.Email} />
                    </Section>
                    <Section>
                      <Section>
                        <h4>HOME ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input type="text" name="StreetAddress" onChange={(e) => handleChange(e)} value={inputObject.StreetAddress} />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input type="text" name="LocalGovt" required onChange={(e) => handleChange(e)} value={inputObject.LocalGovt} />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input type="text" name="State" required onChange={(e) => handleChange(e)} value={inputObject.State} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input type="text" name="NearestBusStop" required onChange={(e) => handleChange(e)} value={inputObject.NearestBusStop} />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>SCHOOL ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input type="text" name="SchoolAddress" required onChange={(e) => handleChange(e)} value={inputObject.SchoolAddress} />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input type="text" name="SchoolLocalGovt" required onChange={(e) => handleChange(e)} value={inputObject.SchoolLocalGovt} />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input type="text" name="SchoolState" required onChange={(e) => handleChange(e)} value={inputObject.SchoolState} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input type="text" name="SchoolNearestBusstop" required onChange={(e) => handleChange(e)} value={inputObject.SchoolNearestBusStop} />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>NEXT OF KIN</h4>
                      </Section>
                      <FormHolder>
                        <Label>FULL NAME</Label>
                        <Input type="text" name="FullNameOfKin" required onChange={(e) => handleChange(e)} value={inputObject.FullNameOfKin} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEXT OF KIN RELATIONSHIP</Label>
                        <Input type="text" name="KinRelationship" required onChange={(e) => handleChange(e)} value={inputObject.KinRelationship} />
                      </FormHolder>
                      <FormHolder>
                        <Label>EMAIL</Label>
                        <Input type="text" name="KinEmail" required onChange={(e) => handleChange(e)} value={inputObject.KinEmail} />
                      </FormHolder>
                      <FormHolder>
                        <Label>PHONE NUMBER</Label>
                        <Input type="text"
                          name="KinPhone"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.KinPhone} />
                      </FormHolder>
                      <Section>
                        <Label>ADDRESS</Label>
                        <Input type="text" name="kinAddress" required onChange={(e) => handleChange(e)} value={inputObject.KinAddress} />
                      </Section>
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit" >SAVE</CreateBtn>
                      {/* <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn> */}
                    </BtnDiv>
                  </Form>
              ) : (
                ""
              )}
              {activeTab === "tab2" ? (
                <Form onSubmit={editOfficial}>
                  <Section>
                    <Label>POSITION</Label>
                    <Input type="text"
                      name="Position"
                      onChange={(e) => handleChange(e)}
                      value={inputObject.Position} />
                  </Section>
                  <Section>
                    <Section>
                      <h4>MEDICAL RECORD</h4>
                    </Section>
                    <FormHolder>
                      <Label>GENOTYPE</Label>
                      <Input type="text"
                        name="Genotype"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.Genotype} />
                    </FormHolder>
                    <FormHolder>
                      <Label>BLOOD GROUP</Label>
                      <Input type="text"
                        name="BloodGroup"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.BloodGroup} />
                    </FormHolder>
                    <Section>
                      <Label>ALLERGIES</Label>
                      <Input type="text" name="AnyAllergies"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.AnyAllergies} />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit" >SAVE </CreateBtn>
                    {/* <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn> */}
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab3" ? (
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
                          <td>{!files?.schoolid ? <MdFolder /> : <a href={files?.schoolid} target="_blank"><MdFolder /></a>}</td>
                          <td>School ID Card</td>
                          <td>{!files?.schoolid ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                        </tr>
                        <tr  >
                          <th scope="row"></th>
                          <td>{!files?.passportphotograph ? <MdFolder /> : <a href={files?.passportphotograph} target="_blank"><MdFolder /></a>}</td>
                          <td>Passport Photograph</td>
                          <td>{!files?.passportphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                        </tr>
                        <tr  >
                          <th scope="row"></th>
                          <td>{!files?.medicalcertificate ? <MdFolder /> : <a href={files?.medicalcertificate} target="_blank"><MdFolder /></a>}</td>
                          <td>Medical Certificate</td>
                          <td>{!files?.medicalcertificate ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Section>
                  <Section>
                    <h3>Upload Documents</h3>
                  </Section>
                  <FormHolder>
                    <Label>MEDICAL CERTIFICATE</Label>
                    <Input type="file" name="medicalcertificate" onChange={onImageChange} />
                  </FormHolder>
                  <FormHolder>
                    <Label>SCHOOL ID</Label>
                    <Input type="file" name="schoolid" onChange={onImageChange} />
                  </FormHolder>
                  <FormHolder>
                    <Label>PASSPORT PHOTOGRAPH</Label>
                    <Input type="file" name="passportphotograph" onChange={onImageChange} />
                  </FormHolder>
                  <BtnDiv>
                    <Section>
                      <CreateBtn type="submit">{fileLoading ? <Spinner /> : "Upload Files"}</CreateBtn>
                    </Section>

                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}

            </Outlet>
          </Tab>
        }
      </Content>
    </Container>
  );
};
