import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import AWS from 'aws-sdk';

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
  Section
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions
import { createPlayers } from "../../redux/actions/players_v2";
import { createOfficials } from "../../redux/actions/officials";
import moment from "moment";
import { RootState } from "../../redux/reducers";
import { Spinner } from "reactstrap";


 
export const AddPlayerV2: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => state.player);
  const officialLoading = useSelector((state: RootState) => state.officials.loading);
  const { loading } = store;

  // states
  const [object, setObject]: any = useState({});
  const pathname = window.location.pathname;

  const data: any = sessionStorage.getItem("userData");
  const user = JSON.parse(data);

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: any) => {
    e.preventDefault();
    
    const teamId = sessionStorage.getItem("Teamid");

    // get age 
    const newAge = moment(object?.DateOfBirth).fromNow(true).split(" ")

    // generate random jamb reg numbers
    function makeid(length: any) {
      var result = [];
      
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
      }
      return result.join('');
    }
    
    const userData = {
      Firstname: object.Firstname,
      Lastname: object.Lastname,
      Email: object.email,
    };

    const playerData = {
      Team: teamId,
      Email: object.email?.toLowerCase(),
      CreatedBy: user._id,
      // Phonenumber: object.phone,
      MiddleName: object.Middlename,
      DateOfBirth: object.DateOfBirth,
      Age: parseInt(newAge[0]),
      TermsAndConditions: true,
      NextOfKin: {
        FullNameOfKin: object.FullNameOfKin,
        KinRelationship: object.kinRelationship,
        KinContact: {
          PhoneNumber: object.KinPhone,
          Email: object.KinEmail,
          Address: object.KinAddress,
        },
      },
      Address: {
        HomeAddress: {
          StreetAddress: object.streetAddress,
          LocalGovt: object.localGovt,
          State: object.state,
          NearestBusStop: object.nearestBusstop,
        },
        SchoolAddress: {
          StreetAddress: object.schoolAddress,
          LocalGovt: object.schLGA,
          State: object.schoolState,
          NearestBusStop: object.schBusstop,
        }
      },
       AcademicRecord: {
        CourseLevel: "",
        CourseStudy: "",
        MatricNumber: "",
        JambRegNumber:  makeid(6),
        CourseFaculty: "",
        Programme: "",
        SchoolPortalID:"",
        SchoolPortalPassword: ""
      },
      DocumentUploads: {
        PassportPhotograph: "",
        MedicalCert: "",
        SchoolID: "",
        JambResultSlip: "",
        JambPhotograph: "",
        LatestCourseRegistration: ""
      }
    };
    if (pathname === "/register-player-v2") {
      dispatch(createPlayers({ userData, playerData, navigate }));
    } else if (pathname === "/register-official") {
      dispatch(createOfficials({ userData, playerData, navigate }));
    }
  };

  return (
    <Container>
      <Content>
        <ContentHeader
          title={
            pathname === "/register-player-v2"
              ? "REGISTER PLAYER"
              : "REGISTER OFFICIAL"
          }
        >
          <Button onClick={() => navigate("/players")}>GO BACK</Button>
        </ContentHeader>
        <Tab>
          <Nav>
            <List className="active">PERSONAL INFORMATION</List>
          </Nav>
          <Outlet>
            <Form onSubmit={submit}>
              <FormHolder>
                <Label>FIRST NAME </Label>
                <Input
                  type="text"
                  name="Firstname"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>LAST NAME</Label>
                <Input
                  type="text"
                  name="Lastname"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>MIDDLE NAME</Label>
                <Input
                  type="text"
                  name="Middlename"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                  <Label>DATE OF BIRTH</Label>
                  {pathname === "/register-official" ?
                  <Input type="date" 
                  name="DateOfBirth"
                  onChange={(e) => handleChange(e)}/>
                  :
                  <Input type="date" 
                  name="DateOfBirth"
                   max="2006-01-01" min="1993-12-31" 
                  onChange={(e) => handleChange(e)}/>
        }
                </FormHolder>
              <FormHolder>
                <Label>EMAIL</Label>
                <Input
                  type="text"
                  name="email"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>PHONE</Label>
                <Input
                  type="text"
                  name="phone"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <Section>
                <Section>
                  <h4>HOME ADDRESS</h4>
                </Section>
                <FormHolder>
                  <Label>STREET ADDRESS</Label>
                  <Input
                    type="text"
                    name="streetAddress"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input
                    type="text"
                    name="localGovt"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="state"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>NEAREST BUS STOP</Label>
                  <Input
                    type="text"
                    name="nearestBusstop"
                    required
                    onChange={(e) => handleChange(e)}
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
                    name="schoolAddress"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input
                    type="text"
                    name="schLGA"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="schoolState"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>NEAREST BUS STOP</Label>
                  <Input
                    type="text"
                    name="schBusstop"
                    required
                    onChange={(e) => handleChange(e)}
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
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>NEXT OF KIN RELATIONSHIP</Label>
                  <Input
                    type="text"
                    name="kinRelationship"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>EMAIL</Label>
                  <Input
                    type="email"
                    name="KinEmail"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>PHONE NUMBER</Label>
                  <Input
                    type="text"
                    name="KinPhone"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <Section>
                  <Label>ADDRESS</Label>
                  <Input
                    type="text"
                    name="KinAddress"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </Section>
              </Section>
              <BtnDiv>
                {pathname === "/register-official" ? <CreateBtn type="submit">{officialLoading ? <Spinner/> : "SAVE"}</CreateBtn> : ""}
                {pathname === "/register-player-v2" ? <CreateBtn type="submit">{loading ? <Spinner/> : "SAVE"}</CreateBtn> : ""}
              </BtnDiv>
            </Form>
          </Outlet>
        </Tab>
      </Content>
    </Container>
  );
};
