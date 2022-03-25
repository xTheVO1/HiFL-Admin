import React, { useState, useEffect, useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

// components
import ContentHeader from "../../components/ContentHeader";
import {
  Container,
  Label,
  Content,
  FormData,
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
  const [image, setImage] = useState();
  
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
           
            <List
              className={activeTab === "tab3" ? "active" : ""}
              onClick={() => setActiveTab("tab3")}
            >
              DOCUMENT UPLOADS
            </List>
          </Nav>
          <Outlet>
            {activeTab === "tab1" ? (
              loading ? <Loader/> :
              <Form onSubmit={editOfficial}>
                <Section>
                  <FormData>
                    <Image src={Player} alt="players" />
                  </FormData>
                </Section>
                <FormData>
                  <Label>FIRST NAME </Label>
                  <Input type="text" name="Firstname" onChange={(e) => handleChange(e)} disabled={true} value={mainData.User ? mainData.User.Firstname : ""}/>
                </FormData>
                <FormData>
                  <Label>LAST NAME</Label>
                  <Input type="text" name="Lastname" onChange={(e) => handleChange(e)} disabled={true} value={mainData.User ? mainData.User.Lastname : ""}/>
                </FormData>
                <FormData>
                  <Label>MIDDLE NAME</Label>
                  <Input type="text" name="MiddleName" onChange={(e) => handleChange(e)} disabled={true} value={mainData.MiddleName}/>
                </FormData>
                <FormData>
                  <Label>DATE OF BIRTH</Label>
                  <Input type="date" name="DateOfBirth" disabled={true} onChange={(e) => handleChange(e)}/>
                </FormData>
                <Section>
                  <Label>EMAIL</Label>
                  <Input type="text" name="Email" disabled={true} onChange={(e) => handleChange(e)} value={mainData.User ? mainData.User.Email : ""}/>
                </Section>
                <Section>
                  <Section>
                    <h4>HOME ADDRESS</h4>
                  </Section>
                  <FormData>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="StreetAddress"onChange={(e) => handleChange(e)} value={!inputObject.StreetAddress ?  mainData?.Address?.HomeAddress?.StreetAddress : inputObject.StreetAddress}/>

                  </FormData>
                  <FormData>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="LocalGovt" onChange={(e) => handleChange(e)} value={!inputObject.LocalGovt ?  mainData?.Address?.HomeAddress?.LocalGovt : inputObject.LocalGovt}/>
                  </FormData>
                  <FormData>
                    <Label>STATE</Label>
                    <Input type="text" name="State"onChange={(e) => handleChange(e)} value={!inputObject.State ?  mainData?.Address?.HomeAddress?.State : inputObject.State}/>
                  </FormData>
                  <FormData>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="NearestBusStop" onChange={(e) => handleChange(e)} value={!inputObject.NearestBusStop ?  mainData?.Address?.HomeAddress?.NearestBusStop : inputObject.NearestBusStop}/>
                  </FormData>
                </Section>
                <Section>
                  <Section>
                    <h4>SCHOOL ADDRESS</h4>
                  </Section>
                  <FormData>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="SchoolAddress"onChange={(e) => handleChange(e)} value={!inputObject.SchoolAddress ?  mainData?.SchoolAddress?.StreetAddress : inputObject.SchoolAddress}/>
                  </FormData>
                  <FormData>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="SchoolLocalGovt" onChange={(e) => handleChange(e)} value={!inputObject.SchoolLocalGovt ?  mainData?.SchoolAddress?.LocalGovt : inputObject.SchoolLocalGovt}/>
                  </FormData>
                  <FormData>
                    <Label>STATE</Label>
                    <Input type="text" name="SchoolState" onChange={(e) => handleChange(e)} value={!inputObject.SchoolState ?  mainData?.SchoolAddress?.State : inputObject.SchoolState}/>
                  </FormData>
                  <FormData>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="SchoolNearestBusstop"onChange={(e) => handleChange(e)} value={!inputObject.SchoolNearestBusStop ?  mainData?.SchoolAddress?.NearestBusStop : inputObject.SchoolNearestBusStop}/>
                  </FormData>
                </Section>
                <Section>
                  <Section>
                    <h4>NEXT OF KIN</h4>
                  </Section>
                  <FormData>
                    <Label>FULL NAME</Label>
                    <Input type="text" name="FullNameOfKin" onChange={(e) => handleChange(e)} value={!inputObject.FullNameOfKin ?  mainData?.NextOfKin?.FullNameOfKin : inputObject.FullNameOfKin}/>
                  </FormData>
                  <FormData>
                    <Label>NEXT OF KIN RELATIONSHIP</Label>
                    <Input type="text" name="KinRelationship" onChange={(e) => handleChange(e)} value={!inputObject.KinRelationship ?  mainData?.NextOfKin?.KinRelationship : inputObject.KinRelationship}/>
                  </FormData>
                  <FormData>
                    <Label>EMAIL</Label>
                    <Input type="text" name="KinEmail" onChange={(e) => handleChange(e)} value={!inputObject.KinEmail ?  mainData?.NextOfKin?.KinContact?.Email : inputObject.KinEmail}/>
                  </FormData>
                  <FormData>
                    <Label>PHONE NUMBER</Label>
                    <Input type="text" 
                    name="KinPhone" 
                    onChange={(e) => handleChange(e)} 
                    value={inputObject.KinPhone ?  mainData?.NextOfKin?.KinContact?.PhoneNumber : inputObject.KinPhone}/>
                  </FormData>
                  <Section>
                    <Label>ADDRESS</Label>
                    <Input type="text" name="kinAddress" onChange={(e) => handleChange(e)} value={inputObject.KinAddress ? mainData?.NextOfKin?.KinContact?.Address : inputObject.KinAddress}/>
                  </Section>
                </Section>
                <BtnDiv>
              <CreateBtn type="submit" >SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
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
                  <FormData>
                    <Label>GENOTYPE</Label>
                    <Input type="text" 
                    name="Genotype" 
                    onChange={(e) => handleChange(e)}
                    value={inputObject.Genotype ?  mainData?.MedicalRecord?.Genotype : inputObject.Genotype} />
                  </FormData>
                  <FormData>
                    <Label>BLOOD GROUP</Label>
                    <Input type="text" 
                    name="BloodGroup" 
                    onChange={(e) => handleChange(e)} 
                    value={inputObject.BloodGroup ?  mainData?.MedicalRecord?.BloodGroup : inputObject.BloodGroup} />
                  </FormData>
                  <Section>
                    <Label>ALLERGIES</Label>
                    <Input type="text" name="Allergies" 
                    onChange={(e) => handleChange(e)}
                    value={inputObject.AnyAllergies ?  mainData?.MedicalRecord?.AnyAllergies : inputObject.AnyAllergies} />
                  </Section>
                </Section>
                <BtnDiv>
              <CreateBtn type="submit" >SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
            </BtnDiv>
              </Form>
            ) : (
              ""
            )}
            {activeTab === "tab3" ? (
              <Form onSubmit={editOfficial}>
                <FormData>
                  <Label>MEDICAL CERTIFICATE</Label>
                  <Input type="file" name="MedicalCert" />
                </FormData>
                <FormData>
                  <Label>SCHOOL ID</Label>
                  <Input type="file" name="SchoolId" />
                </FormData>
                <FormData>
                  <Label>PASSPORT PHOTOGRAPH</Label>
                  <Input type="file" name="PassportPhotograph" />
                </FormData>
                <FormData>
                  <Label>JAMB PHOTOGRAPH</Label>
                  <Input type="file" name="JambPhotograph" />
                </FormData>
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
