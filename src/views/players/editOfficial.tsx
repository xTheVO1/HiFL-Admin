import React, { useState, useEffect, memo } from "react";
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
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { Loader } from "../teams/styles";

export const UpdateOfficial: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [inputObject, setObject] = useState({ Firstname: "",
                                              Lastname: "",
                                              Email: "",
                                              MiddleName: "",
                                              SchoolAddress: "",
                                              StreetAddress: "",
                                              NearestBusStop: "",
                                              State:"",
                                              LocalGovt:"",
                                              SchLGA: "",
                                              Dateofbirth: 0,
                                              Age:0,
                                              FullNameOfKin: "",
                                              kinRelationship: "",
                                              kinPhone: "",
                                              kinAddress: "",
                                              kinEmail: ""
                                            });
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.officials)
  const {loading, official } = store;
  const mainData = official && official ? official : {}; 
  const teamId = sessionStorage.getItem("Teamid");

  useEffect(() => {
    const officialId = id;

    const getOfficial = async () => {
      dispatch(getOfficialById(officialId));
    }
    
  console.log(mainData, 2 )

    getOfficial();
   async function updateForm () {
      if(official === {}){
  console.log(mainData, 3 )
      }else if(official && !loading){
  console.log(mainData, 4 )
        const { MiddleName, Address:{LocalGovt, NearestBusStop, State, StreetAddress}  } = mainData;
     await setObject({
         ...inputObject,
          // MiddleName: MiddleName,
          // StreetAddress: StreetAddress,
          // NearestBusStop: NearestBusStop,
          // State: State,
          // LocalGovt: LocalGovt
        });
      }
       }
       updateForm();
  }, []);


  const editOfficial = (e: any) => {
    e.preventDefault();
      const details = {
        Team: teamId,
        // Phonenumber: object.phone,
        DateOfBirth: inputObject.Dateofbirth,
        Age: inputObject.Age,
        NextOfKin: {
          FullNameOfKin: inputObject.FullNameOfKin,
        KinRelationship: inputObject.kinRelationship,
        TermsAndConditions: true,
        NextOfKin: {
          PhoneNumber: inputObject.kinPhone,
          Email: inputObject.kinEmail,
          Address: inputObject.kinAddress
        }
      }
      }
      const payload = { _id: id, params: details}
      dispatch(updateOfficials(payload))
  }
 
  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value 
    });
  }
  return (
    <Container>
      <Content>
        <ContentHeader
          title={"OFFICIAL PROFILE"}
          children={"UPDATE OFFICIAL INFORMATION"}
        />
        {loading ? <Loader>LOADING....</Loader> : 
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
              loading ? <Loader>Loading</Loader> :
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
                    <Input type="text" name="StreetAddress"onChange={(e) => handleChange(e)} value={inputObject.StreetAddress}/>
                    <p>inputObject</p>
                    <p>{inputObject.Email}</p>
                  </FormData>
                  <FormData>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="LocalGovt" onChange={(e) => handleChange(e)} value={inputObject.LocalGovt}/>
                  </FormData>
                  <FormData>
                    <Label>STATE</Label>
                    <Input type="text" name="State"onChange={(e) => handleChange(e)} value={inputObject.State}/>
                  </FormData>
                  <FormData>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="NearestBusStop" onChange={(e) => handleChange(e)} value={inputObject.NearestBusStop}/>
                  </FormData>
                </Section>
                <Section>
                  <Section>
                    <h4>SCHOOL ADDRESS</h4>
                  </Section>
                  <FormData>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="SchoolStreet"onChange={(e) => handleChange(e)} />
                  </FormData>
                  <FormData>
                    <Label>LOCAL GOVERNMENT</Label>
                    <Input type="text" name="SchLGA" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>STATE</Label>
                    <Input type="text" name="State" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>NEAREST BUSSTOP</Label>
                    <Input type="text" name="SchBusstop"onChange={(e) => handleChange(e)} />
                  </FormData>
                </Section>
                <Section>
                  <Section>
                    <h4>NEXT OF KIN</h4>
                  </Section>
                  <FormData>
                    <Label>FULL NAME</Label>
                    <Input type="text" name="FullNameOfKin" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>NEXT OF KIN RELATIONSHIP</Label>
                    <Input type="text" name="kinRelationship" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>EMAIL</Label>
                    <Input type="text" name="kinEmail" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>PHONE NUMBER</Label>
                    <Input type="text" name="kinPhone" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <Section>
                    <Label>ADDRESS</Label>
                    <Input type="text" name="kinAddress"onChange={(e) => handleChange(e)} />
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
              <Form>
                <Section>
                  <FormData>
                    <Label>POSITION</Label>
                    <Input type="text" name="position" />
                  </FormData>
                  <FormData>
                    <Label>JERSEY NUMBER</Label>
                    <Input type="number" name="jerseyNumber" />
                  </FormData>
                </Section>
                <Section>
                  <Section>
                    <h4>MEDICAL RECORD</h4>
                  </Section>
                  <FormData>
                    <Label>GENOTYPE</Label>
                    <Input type="text" name="Genotype" onChange={(e) => handleChange(e)}/>
                  </FormData>
                  <FormData>
                    <Label>BLOOD GROUP</Label>
                    <Input type="text" name="BloodGroup" onChange={(e) => handleChange(e)}/>
                  </FormData>
                </Section>
              </Form>
            ) : (
              ""
            )}
            {activeTab === "tab3" ? (
              <Form>
                <FormData>
                  <Label>LATEST COURSE REGISTRATION</Label>
                  <Input type="text" name="LatestCourseRegistration" />
                </FormData>
                <FormData>
                  <Label>COURSE LEVEL</Label>
                  <Input type="text" name="CourseLevel" />
                </FormData>
                <FormData>
                  <Label>COURSE STUDY</Label>
                  <Input type="text" name="CourseStudy" />
                </FormData>
              </Form>
            ) : (
              ""
            )}
            {activeTab === "tab4" ? (
              <Form>
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
