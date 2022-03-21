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
import {getPlayerById} from "../../redux/actions/players"
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { Loader } from "../teams/styles";

export const UpdatePlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [playersObject, setPlayersObject] = useState({});
  const [inputObject, setObject] = useState({ Firstname: "",
                                              Lastname: "",
                                              Email: "",
                                              MiddleName: "",
                                              SchoolAddress: "",
                                              StreetAddress: "",
                                              NearestBusStop: "",
                                              State:"",
                                              LocalGovt:"",
                                              SchLGA: ""
                                            });
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.player)
  const {loading, singlePlayer } = store;
  const mainData = singlePlayer && singlePlayer ? singlePlayer : {}; 
  const {user, player} = mainData;

  useEffect(() => {
    const playerId = id;

    const getPlayer = async () => {
      await dispatch(getPlayerById(playerId));
    }
   getPlayer();

  //  const updateForm = async () => {
  //    if(user && player){
  //     const {Firstname, Lastname, Email } = user;
  //     const { MiddleName, Address:{LocalGovt, NearestBusStop, State, StreetAddress} } = player;
  //    await setObject({
  //      ...inputObject,
  //       Firstname: Firstname,
  //       Lastname: Lastname,
  //       Email: Email,
  //       MiddleName: MiddleName,
  //       StreetAddress: StreetAddress,
  //       NearestBusStop: NearestBusStop,
  //       State: State,
  //       LocalGovt: LocalGovt
  //     });
  //   }
  //  }
  //  updateForm();
  }, [dispatch]);

  useEffect(() => {
  //   const playerId = id;

  //   const getPlayer = async () => {
  //     await dispatch(getPlayerById(playerId));
  //   }
  //  getPlayer();

   const updateForm = () => {
     if(user && player){
      const {Firstname, Lastname, Email } = user;
      const { MiddleName, Address:{LocalGovt, NearestBusStop, State, StreetAddress} } = player;
   if(!loading) {
      setObject({
       ...inputObject,
        Firstname: Firstname,
        Lastname: Lastname,
        Email: Email,
        MiddleName: MiddleName,
        StreetAddress: StreetAddress,
        NearestBusStop: NearestBusStop,
        State: State,
        LocalGovt: LocalGovt
      });
    }
  }
   }
   updateForm();
  }, [dispatch]);

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
          title={"Player Profile"}
          children={"Update Player Information"}
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
              <Form>
                <Section>
                  <FormData>
                    <Image src={Player} alt="players" />
                  </FormData>
                </Section>
                <FormData>
                  <Label>FIRST NAME </Label>
                  <Input type="text" name="Firstname" onChange={(e) => handleChange(e)} value={inputObject.Firstname}/>
                </FormData>
                <FormData>
                  <Label>LAST NAME</Label>
                  <Input type="text" name="Lastname" onChange={(e) => handleChange(e)} value={inputObject.Lastname}/>
                </FormData>
                <FormData>
                  <Label>MIDDLE NAME</Label>
                  <Input type="text" name="MiddleName" onChange={(e) => handleChange(e)} value={inputObject.MiddleName}/>
                </FormData>
                <FormData>
                  <Label>DATE OF BIRTH</Label>
                  <Input type="date" name="DateOfBirth" onChange={(e) => handleChange(e)}/>
                </FormData>
                <Section>
                  <Label>EMAIL</Label>
                  <Input type="text" name="Email" onChange={(e) => handleChange(e)} value={inputObject.Email}/>
                </Section>
                <Section>
                  <Section>
                    <h4>HOME ADDRESS</h4>
                  </Section>
                  <FormData>
                    <Label>STREET ADDRESS</Label>
                    <Input type="text" name="StreetAddress"onChange={(e) => handleChange(e)} value={inputObject.StreetAddress}/>
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
            <BtnDiv>
              <CreateBtn>SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
            </BtnDiv>
          </Outlet>
        </Tab>
}
      </Content>
    </Container>
  );
};
