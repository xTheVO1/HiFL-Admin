import React, { useState, useLayoutEffect} from "react";
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
  Image,
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import Player from "../../assests/player.png";
import { getOfficialById, updateOfficials } from "../../redux/actions/officials";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

export const UpdateOfficial: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [, refresh] = useState("");
  const [inputObject, setObject] = useState({ Firstname: "",
                                              Lastname: "",
                                              Email: "",
                                              MiddleName: "",
                                              SchoolAddress: "",
                                              SchoolNearestBusStop: "",
                                              SchoolState:"",
                                              SchoolLocalGovt:"",
                                              StreetAddress: "",
                                              NearestBusStop: "",
                                              State:"",
                                              LocalGovt:"",
                                              SchLGA: "",
                                              Dateofbirth: 0,
                                              Age:0,
                                              FullNameOfKin: "",
                                              KinRelationship: "",
                                              KinPhone: "",
                                              KinAddress: "",
                                              KinEmail: "",
                                              Position:"",
                                              Genotype: "",
                                              BloodGroup: "",
                                              AnyAllergies: "",
                                              PassportPhotograph: "",
                                              MedicalCert: "",
                                              SchoolID: ""
                                            });
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.officials)
  const {loading, official } = store;
  const mainData = official && official ? official : {}; 
  const teamId = sessionStorage.getItem("Teamid");
  const [, setImage] = useState();
  
  useLayoutEffect(() => {
    const getOfficial = async () => {
      dispatch(getOfficialById(id));
    }
    getOfficial();
     const {  Address, NextOfKin, SchoolAddress, Position, MedicalRecord,  DocumentUploads} = mainData;
     if(Address ){
       refresh("no")
      setObject({
        ...inputObject,
        FullNameOfKin: NextOfKin?.FullNameOfKin,
        KinRelationship: NextOfKin?.KinRelationship,
        KinPhone:  NextOfKin?.KinContact?.PhoneNumber,
       KinAddress: NextOfKin?.KinContact?.Address,
        KinEmail:  NextOfKin?.KinContact?.Email,
        StreetAddress: Address?.HomeAddress && Address?.HomeAddress?.StreetAddress,
         LocalGovt:  Address?.HomeAddress?.LocalGovt,
         NearestBusStop:  Address?.HomeAddress?.NearestBusStop,
         State: Address?.HomeAddress?.LocalGovt,
         SchoolAddress:  SchoolAddress?.StreetAddress,
         SchoolLocalGovt:  SchoolAddress?.LocalGovt,
         SchoolNearestBusStop:  SchoolAddress?.NearestBusStop,
         SchoolState: SchoolAddress?.LocalGovt,
         Position: Position,
          Genotype: MedicalRecord.Genotype,
          BloodGroup: MedicalRecord.BloodGroup,
          AnyAllergies: MedicalRecord.AnyAllergies,
          PassportPhotograph: DocumentUploads.PassportPhotograph,
          MedicalCert: DocumentUploads.MedicalCert,
          SchoolID: DocumentUploads.SchoolID
      
       });
    }
    // eslint-disable-next-line
  }, [dispatch]);


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
      DocumentUploads:{
      PassportPhotograph: inputObject.PassportPhotograph,
      MedicalCert: inputObject.MedicalCert,
      SchoolID: inputObject.SchoolID
     }
      }
      const payload = { _id: id, params: details}
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


  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <Container>
      <Content>
        <ContentHeader
          title={"OFFICIAL PROFILE"}
        > <Button onClick={() => navigate("/players")}>GO BACK</Button>
          </ContentHeader>
        {loading ? <Loader/> : 
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
           
            {/* <List
              className={activeTab === "tab3" ? "active" : ""}
              onClick={() => setActiveTab("tab3")}
            >
              DOCUMENT UPLOADS
            </List> */}
          </Nav>
          <Outlet>
            {activeTab === "tab1" ? (
              loading ? <Loader/> :
              <Form onSubmit={editOfficial}>
                <Section>
                  <FormHolder>
                    <Image src={Player} alt="players" />
                  </FormHolder>
                </Section>
                <FormHolder>
                  <Label>FIRST NAME </Label>
                  <Input type="text" name="Firstname" onChange={(e) => handleChange(e)} disabled={true} value={mainData.User ? mainData.User.Firstname : ""}/>
                </FormHolder>
                <FormHolder>
                  <Label>LAST NAME</Label>
                  <Input type="text" name="Lastname" onChange={(e) => handleChange(e)} disabled={true} value={mainData.User ? mainData.User.Lastname : ""}/>
                </FormHolder>
                <FormHolder>
                  <Label>MIDDLE NAME</Label>
                  <Input type="text" name="MiddleName" onChange={(e) => handleChange(e)} disabled={true} value={mainData.MiddleName}/>
                </FormHolder>
                <FormHolder>
                  <Label>DATE OF BIRTH</Label>
                  <Input type="date" name="DateOfBirth" disabled={true} onChange={(e) => handleChange(e)}/>
                </FormHolder>
                <Section>
                  <Label>EMAIL</Label>
                  <Input type="text" name="Email" disabled={true} onChange={(e) => handleChange(e)} value={mainData.User ? mainData.User.Email : ""}/>
                </Section>
                <Section>
                  <Section>
                    <h4>HOME ADDRESS</h4>
                  </Section>
                  <FormHolder>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="StreetAddress" required onChange={(e) => handleChange(e)} value={!inputObject.StreetAddress ?  mainData?.Address?.HomeAddress?.StreetAddress : inputObject.StreetAddress}/>

                  </FormHolder>
                  <FormHolder>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="LocalGovt" required onChange={(e) => handleChange(e)} value={!inputObject.LocalGovt ?  mainData?.Address?.HomeAddress?.LocalGovt : inputObject.LocalGovt}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>STATE</Label>
                    <Input type="text" name="State" required onChange={(e) => handleChange(e)} value={!inputObject.State ?  mainData?.Address?.HomeAddress?.State : inputObject.State}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="NearestBusStop" required onChange={(e) => handleChange(e)} value={!inputObject.NearestBusStop ?  mainData?.Address?.HomeAddress?.NearestBusStop : inputObject.NearestBusStop}/>
                  </FormHolder>
                </Section>
                <Section>
                  <Section>
                    <h4>SCHOOL ADDRESS</h4>
                  </Section>
                  <FormHolder>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="SchoolAddress" required onChange={(e) => handleChange(e)} value={!inputObject.SchoolAddress ?  mainData?.SchoolAddress?.StreetAddress : inputObject.SchoolAddress}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="SchoolLocalGovt" required onChange={(e) => handleChange(e)} value={!inputObject.SchoolLocalGovt ?  mainData?.SchoolAddress?.LocalGovt : inputObject.SchoolLocalGovt}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>STATE</Label>
                    <Input type="text" name="SchoolState" required onChange={(e) => handleChange(e)} value={!inputObject.SchoolState ?  mainData?.SchoolAddress?.State : inputObject.SchoolState}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="SchoolNearestBusstop" required onChange={(e) => handleChange(e)} value={!inputObject.SchoolNearestBusStop ?  mainData?.SchoolAddress?.NearestBusStop : inputObject.SchoolNearestBusStop}/>
                  </FormHolder>
                </Section>
                <Section>
                  <Section>
                    <h4>NEXT OF KIN</h4>
                  </Section>
                  <FormHolder>
                    <Label>FULL NAME</Label>
                    <Input type="text" name="FullNameOfKin" required onChange={(e) => handleChange(e)} value={!inputObject.FullNameOfKin ?  mainData?.NextOfKin?.FullNameOfKin : inputObject.FullNameOfKin}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>NEXT OF KIN RELATIONSHIP</Label>
                    <Input type="text" name="KinRelationship" required onChange={(e) => handleChange(e)} value={!inputObject.KinRelationship ?  mainData?.NextOfKin?.KinRelationship : inputObject.KinRelationship}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>EMAIL</Label>
                    <Input type="text" name="KinEmail" required onChange={(e) => handleChange(e)} value={!inputObject.KinEmail ?  mainData?.NextOfKin?.KinContact?.Email : inputObject.KinEmail}/>
                  </FormHolder>
                  <FormHolder>
                    <Label>PHONE NUMBER</Label>
                    <Input type="text" 
                    name="KinPhone" 
                    onChange={(e) => handleChange(e)} required
                    value={inputObject.KinPhone ?  mainData?.NextOfKin?.KinContact?.PhoneNumber : inputObject.KinPhone}/>
                  </FormHolder>
                  <Section>
                    <Label>ADDRESS</Label>
                    <Input type="text" name="kinAddress" required onChange={(e) => handleChange(e)} value={inputObject.KinAddress ? mainData?.NextOfKin?.KinContact?.Address : inputObject.KinAddress}/>
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
                    value={inputObject.Position ?  mainData?.Position : inputObject.Position} />
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
                    value={inputObject.Genotype ?  mainData?.MedicalRecord?.Genotype : inputObject.Genotype} />
                  </FormHolder>
                  <FormHolder>
                    <Label>BLOOD GROUP</Label>
                    <Input type="text" 
                    name="BloodGroup" 
                    onChange={(e) => handleChange(e)} 
                    value={inputObject.BloodGroup ?  mainData?.MedicalRecord?.BloodGroup : inputObject.BloodGroup} />
                  </FormHolder>
                  <Section>
                    <Label>ALLERGIES</Label>
                    <Input type="text" name="Allergies" 
                    onChange={(e) => handleChange(e)}
                    value={inputObject.AnyAllergies ?  mainData?.MedicalRecord?.AnyAllergies : inputObject.AnyAllergies} />
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
              <Form onSubmit={editOfficial}>
                <FormHolder>
                  <Label>MEDICAL CERTIFICATE</Label>
                  <Input type="file" name="MedicalCert" />
                </FormHolder>
                <FormHolder>
                  <Label>SCHOOL ID</Label>
                  <Input type="file" name="SchoolId" />
                </FormHolder>
                <FormHolder>
                  <Label>PASSPORT PHOTOGRAPH</Label>
                  <Input type="file" name="PassportPhotograph" />
                </FormHolder>
                <FormHolder>
                  <Label>JAMB PHOTOGRAPH</Label>
                  <Input type="file" name="JambPhotograph" onChange={onImageChange}/>
                </FormHolder>
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
