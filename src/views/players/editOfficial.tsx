import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {
  Modal,
  ModalHeader, ModalBody
} from "reactstrap";
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
  FilesHolder,
  Select,
  TextArea,

} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getOfficialById, updateOfficials, accredictOfficial } from "../../redux/actions/officials";
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
import { Btn } from "../../components/playerCard/style";
import "./license/license.css"
import { getPlayerLicense } from "../../redux/actions/players";

export const UpdateOfficial: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [, refresh] = useState("");
  const [modal, setModal] = useState(false);
  const [disable, setDisable] = useState(false);
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
    OfficialID: "",
    AccreditationComment: "",
    Approval: "",
    licensePhotograph: "",
    licenseName: "",
    licenseCourse: "",
    licenseTeam: ""
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
  const data: any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);
  const team: any = sessionStorage.getItem("Teamid");
  const doc: any = new jsPDF();

  useEffect(() => {
    const getOfficial = async () => {
      dispatch(getOfficialById(id));
    }
    getOfficial();
    const getLicense= async () => {
      dispatch(getPlayerLicense({
        player: id, 
        team
      }));
    };
    getLicense();
    // eslint-disable-next-line
  }, [dispatch]);

  useEffect(() => {
    const data = official ? official : {};
    const {
      Address,
      NextOfKin,
      MedicalRecord,
      DocumentUploads,
       MiddleName, User, DateOfBirth, Age, isCompleted
    } = data;
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
      Position: data?.Position,
      // JerseyNumber: SportRecord?.JerseyNumber,
      Genotype: MedicalRecord?.Genotype,
      BloodGroup: MedicalRecord?.BloodGroup,
      AnyAllergies: MedicalRecord?.AnyAllergies,
      licensePhotograph: "",
      licenseName: "",
      licenseCourse: "",
      licenseTeam: ""
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

    const newAge = moment(inputObject?.DateOfBirth).fromNow(true).split(" ")

    const details = {
      _id: id,
      params:{
      Position: inputObject.Position,
      // Phonenumber: object.phone,
      DateOfBirth: inputObject.DateOfBirth,
      Age: parseInt(newAge[0]),
      TermsAndConditions: true,
      NextOfKin: {
        FullNameOfKin: inputObject.FullNameOfKin,
        KinRelationship: inputObject.KinRelationship,
        KinContact: {
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
    }
    dispatch(updateOfficials(details));
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

  // Toggle for Modal
  const toggleModal = () => {
    setModal(!modal);
  }

  const submitOfficial = async (e: any) => {
    e.preventDefault();
    const details = {
      _id: id,
      params: {
        isCompleted: true
      }
    };
    setModal(!modal);
    dispatch(updateOfficials(details));
    // navigate("/players")
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
    dispatch(accredictOfficial(details));
    navigate("/players")
    // dispatch(getOfficialById(id));
  }

  const status = [
    { type: "APPROVED", value: "Approved" },
    { type: "DISAPPROVED", value: "Disapproved" }
  ]

  return (
    <Container>
        <Modal isOpen={modal}
        toggle={toggleModal}
        modalTransition={{ timeout: 200 }}
        size="xl">
        <ModalHeader>
          ACCREDITATION
        </ModalHeader>
        <ModalBody style={{ textAlign: "center" }}>
          <small>You are attempting to submit this official for accreditation.</small> <br></br>
          <small >Please <strong>note that you will no longer be able to edit this official information</strong>.</small> <br></br>
          <small>Do certify that all information are <strong>COMPLETE, CORRECT & VALID</strong>.</small>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Btn className="red" onClick={(e) => submitOfficial(e)}
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
              <List
                className={activeTab === "tab4" ? "active" : ""}
                onClick={() => changeTab("tab4")}
              >
                ACCREDITATION
              </List>
            
            </Nav>
            <Outlet>
              {activeTab === "tab1" ? (
                loading ? <Loader /> :
                  <Form onSubmit={editOfficial}>
                    <Section className="flex">
                        <FilesHolder>
                        {!files.passportphotograph ? <div className="no-files"><h3>PASSPORT</h3></div> : <img src={files.passportphotograph} alt="players"/>}
                        </FilesHolder>
                        <FilesHolder>
                        {!files.schoolid ? <div className="no-files"><h3>SCHOOLID</h3></div> : <img src={files.schoolid} alt="School ID"/>}
                        </FilesHolder>
                    </Section>
                    <FormHolder>
                      <Label>FIRST NAME </Label>
                      <Input  disabled={disable} type="text" name="Firstname" onChange={(e) => handleChange(e)} required value={inputObject?.Firstname?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>LAST NAME</Label>
                      <Input  disabled={disable} type="text" name="Lastname" onChange={(e) => handleChange(e)} required value={inputObject.Lastname?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>MIDDLE NAME</Label>
                      <Input  disabled={disable} type="text"  name="MiddleName" onChange={(e) => handleChange(e)} required value={inputObject.MiddleName?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>DATE OF BIRTH
                        <span>{moment(inputObject?.DateOfBirth).format("LL")}({inputObject?.Age} Years)</span>
                      </Label>
                      <Input  disabled={disable} type="date" name="DateOfBirth" onChange={(e) => handleChange(e)} />
                    </FormHolder>
                    <Section>
                      <Label>EMAIL</Label>
                      <Input  disabled={true} type="email" name="Email" onChange={(e) => handleChange(e)} value={inputObject.Email} />
                    </Section>
                    <Section>
                      <Section>
                        <h4>HOME ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input  disabled={disable} type="text" name="StreetAddress" onChange={(e) => handleChange(e)} value={inputObject.StreetAddress} />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input  disabled={disable} type="text" name="LocalGovt" required onChange={(e) => handleChange(e)} value={inputObject.LocalGovt} />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input  disabled={disable} type="text" name="State" required onChange={(e) => handleChange(e)} value={inputObject.State} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input  disabled={disable} type="text" name="NearestBusStop" required onChange={(e) => handleChange(e)} value={inputObject.NearestBusStop} />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>SCHOOL ADDRESS</h4>
                      </Section>
                      <FormHolder>
                        <Label>STREET ADDRESS</Label>
                        <Input  disabled={disable} type="text" name="SchoolAddress" required onChange={(e) => handleChange(e)} value={inputObject.SchoolAddress} />
                      </FormHolder>
                      <FormHolder>
                        <Label>LOCAL GOVERNMENT</Label>
                        <Input  disabled={disable} type="text" name="SchoolLocalGovt" required onChange={(e) => handleChange(e)} value={inputObject.SchoolLocalGovt} />
                      </FormHolder>
                      <FormHolder>
                        <Label>STATE</Label>
                        <Input  disabled={disable} type="text" name="SchoolState" required onChange={(e) => handleChange(e)} value={inputObject.SchoolState} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEAREST BUSSTOP</Label>
                        <Input  disabled={disable} type="text" name="SchoolNearestBusstop" required onChange={(e) => handleChange(e)} value={inputObject.SchoolNearestBusStop} />
                      </FormHolder>
                    </Section>
                    <Section>
                      <Section>
                        <h4>NEXT OF KIN</h4>
                      </Section>
                      <FormHolder>
                        <Label>FULL NAME</Label>
                        <Input  disabled={disable} type="text" name="FullNameOfKin" required onChange={(e) => handleChange(e)} value={inputObject.FullNameOfKin?.toUpperCase()} />
                      </FormHolder>
                      <FormHolder>
                        <Label>NEXT OF KIN RELATIONSHIP</Label>
                        <Input  disabled={disable} type="text" name="KinRelationship" required onChange={(e) => handleChange(e)} value={inputObject.KinRelationship?.toUpperCase()} />
                      </FormHolder>
                      <FormHolder>
                        <Label>EMAIL</Label>
                        <Input  disabled={disable} type="text" name="KinEmail" required onChange={(e) => handleChange(e)} value={inputObject.KinEmail?.toUpperCase()} />
                      </FormHolder>
                      <FormHolder>
                        <Label>PHONE NUMBER</Label>
                        <Input  disabled={disable} type="text"
                          name="KinPhone"
                          onChange={(e) => handleChange(e)} required
                          value={inputObject.KinPhone} />
                      </FormHolder>
                      <Section>
                        <Label>ADDRESS</Label>
                        <Input  disabled={disable} type="text" name="KinAddress" required onChange={(e) => handleChange(e)} value={inputObject.KinAddress?.toUpperCase()} />
                      </Section>
                    </Section>
                    {user?.Role === "Accreditor" ?  "" :
                    <BtnDiv>
                      <CreateBtn type="submit" className={disable ? "disabled" : ""}>SAVE</CreateBtn>
                      {/* <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn> */}
                    </BtnDiv>
                    }
                  </Form>
              ) : (
                ""
              )}
              {activeTab === "tab2" ? (
                <Form onSubmit={editOfficial}>
                  <Section>
                    <Label>POSITION</Label>
                    <Input  disabled={disable} type="text"
                      name="Position"
                      onChange={(e) => handleChange(e)}
                      value={inputObject.Position?.toUpperCase()} />
                  </Section>
                  <Section>
                    <Section>
                      <h4>MEDICAL RECORD</h4>
                    </Section>
                    <FormHolder>
                      <Label>GENOTYPE</Label>
                      <Input  disabled={disable} type="text"
                        name="Genotype"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.Genotype?.toUpperCase()} />
                    </FormHolder>
                    <FormHolder>
                      <Label>BLOOD GROUP</Label>
                      <Input  disabled={disable} type="text"
                        name="BloodGroup"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.BloodGroup?.toUpperCase()} />
                    </FormHolder>
                    <Section>
                      <Label>ALLERGIES</Label>
                      <Input  disabled={disable} type="text" name="AnyAllergies"
                        onChange={(e) => handleChange(e)}
                        value={inputObject.AnyAllergies?.toUpperCase()} />
                    </Section>
                  </Section>
                  {user.Role === "Accreditor" ?  "" :
                  <BtnDiv>
                    <CreateBtn type="submit" className={disable ? "disabled" : ""} disabled={disable}>SAVE </CreateBtn>
                    {/* <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn> */}
                  </BtnDiv>
}
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab3" ? (
                <>
                <Form onSubmit={uploadFiles}>
                  <Section>
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
                        <tr  >
                          <th scope="row">1</th>
                          <td>School ID Card</td>
                          <td>{!files?.schoolid ? <MdFolder /> : <a href={files?.schoolid} target="_blank" rel="noreferrer"><MdFolder /> <span> View...</span></a>}</td>
                          <td>{!files?.schoolid ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                        </tr>
                        <tr  >
                          <th scope="row">2</th>
                          <td>Passport Photograph</td>
                          <td>{!files?.passportphotograph ? <MdFolder /> : <a href={files?.passportphotograph} target="_blank" rel="noreferrer"><MdFolder /> <span>View...</span></a>}</td>
                          <td>{!files?.passportphotograph ? <Red ><MdCancel /></Red> : <Green><MdCheck /></Green>}</td>
                        </tr>
                        <tr  >
                          <th scope="row">3</th>
                          <td>Medical Certificate</td>
                          <td>{!files?.medicalcertificate ? <MdFolder /> : <a href={files?.medicalcertificate} target="_blank" rel="noreferrer"><MdFolder /> <span>View...</span></a>}</td>
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
                    <Input  disabled={disable} type="file" name="medicalcertificate" onChange={onImageChange} />
                  </FormHolder>
                  <FormHolder>
                    <Label>SCHOOL ID</Label>
                    <Input  disabled={disable} type="file" name="schoolid" onChange={onImageChange} />
                  </FormHolder>
                  <FormHolder>
                    <Label>PASSPORT PHOTOGRAPH</Label>
                    <Input  disabled={disable} type="file" name="passportphotograph" onChange={onImageChange} />
                  </FormHolder>
                  <BtnDiv>
                    <Section>
                      <CreateBtn   type="submit">{fileLoading ? <Spinner /> : "Upload Files"}</CreateBtn>
                    </Section>
                  </BtnDiv>
                </Form>
                {user.Role === "Accreditor" ?  "" :
                 <BtnDiv>
                 <CreateBtn className={disable ? "disabled" : "submit"} onClick={toggleModal} disabled={disable} >
                   SUBMIT FOR ACCREDITATION
                 </CreateBtn>
                </BtnDiv>
                }
                </>
              ) : (
                ""
              )}
              {activeTab === "tab4" ? 
              <>
              {loading ? <Loader/> :(
                    official?.AccreditationHistories?.length === 0 ? <div style={{ textAlign: "center"}}> <h3>PENDING</h3></div> :
                    <Table hover>
                      <thead>
                          <tr>
                            <th>#</th>
                            <th>Year</th>
                            <th>Status</th>
                            <th>Accreditation Comment</th>
                          </tr>
                      </thead>
                      <tbody>
                      {official && official.AccreditationHistories?.map((item: any, index: any) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item?.YearAccredicted}</td>
                          <td>{item?.Approval}</td>
                          <td>{item?.AccreditationComment}</td>
                        </tr>
                          )) }
                      </tbody>
                    </Table>
                 )}
              {user.Role === "Accreditor" ? 
                   <Form onSubmit={accredict}>
                    <Section>
                        <Label>APPROVAL</Label>
                        <Select
                          name="Approval"
                          onChange={(e) => handleChange(e)}   
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
                           />
                    </Section>
                    <BtnDiv>
                      <CreateBtn type="submit" >SAVE</CreateBtn>
                    </BtnDiv>
                    </Form>
                  : ""}
                  
                  </>
                  : ""}
            </Outlet>
          </Tab>
        }
      </Content>
    </Container>
  );
};
