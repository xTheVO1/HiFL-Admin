import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Label, Content, FormData, Form, CreateBtn, BtnDiv, Outlet, Section, Image } from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";

//actions
import { createPlayers } from "../../redux/actions/players";

export const AddPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [object, setObject]: any = useState({});
  const [image, setImage] = useState();
  const hiddenFileInput: any = React.useRef(null);

  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  }

  const pathname = window.location.pathname;
  console.log(pathname)

  const submit = (e: any) => {
    const teamId = sessionStorage.getItem('Teamid');
    e.preventDefault();
    const userData = {
      Firstname: object.Firstname,
      Lastname: object.Lastname,
      Email: object.email,
      // Phone: object.phone
    }
    const playerData = {
      Team: teamId,
      Email: object.email,
      // Phonenumber: object.phone,
      MiddleName: object.Middlename,
      DateOfBirth: object.Dateofbirth,
      Age: object.age,
      KinRelationship: object.kinRelationship,
      NextOfKin: {
        PhoneNumber: object.kinPhone,
        Email: object.kinEmail,
        Address: object.kinAddress
      }
    }
    if(pathname === "/add-player"){
      dispatch(createPlayers({ userData, playerData, navigate}))
    }else if(pathname === "/add-official"){

    }
  }
  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  return (
    <Container>
      <Content>
        <ContentHeader title={pathname === "/add-player" ? "CREATE PLAYER": "CREATE OFFICIAL"}>
        </ContentHeader>
        <Tab>
          <Nav>
            <List className="active">PERSONAL INFORMATIONS</List>
          </Nav>
          <Outlet>
            <Form onSubmit={submit}>
              <Section>
                <FormData>
                  <>
                    {image ?
                      <Image src={image} alt="players" /> : ""}
                  </>
                  <button onClick={handleClick} className="file-btn">Upload an image</button>
                  <input type="file" onChange={onImageChange} ref={hiddenFileInput} className="file" id="group_image" style={{ display: 'none' }} />
                </FormData>
              </Section>
              <FormData>
                <Label>FIRST NAME </Label>
                <Input type="text" name="Firstname" onChange={(e) => handleChange(e)} />
              </FormData>
              <FormData>
                <Label>LAST NAME</Label>
                <Input type="text" name="Lastname" onChange={(e) => handleChange(e)} />
              </FormData>
              <FormData>
                <Label>MIDDLE NAME</Label>
                <Input type="text" name="Middlename" onChange={(e) => handleChange(e)} />
              </FormData>
              <FormData>
                <Label>DATE OF BIRTH</Label>
                <Input type="date" name="datOfBirth" onChange={(e) => handleChange(e)} />
              </FormData>
              <FormData>
                <Label>EMAIL</Label>
                <Input type="text" name="email" onChange={(e) => handleChange(e)} />
              </FormData>
              <FormData>
                <Label>PHONE</Label>
                <Input type="text" name="phone" onChange={(e) => handleChange(e)} />
              </FormData>
              <Section>
                <Section>
                  <h4>HOME ADDRESS</h4>
                </Section>
                <FormData>
                  <Label>STREET ADDRESS</Label>
                  <Input type="text" name="streetAddress" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input type="text" name="localGovt" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>STATE</Label>
                  <Input type="text" name="state" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>NEAREST BUSSTOP</Label>
                  <Input type="text" name="nearestBusStop" onChange={(e) => handleChange(e)} />
                </FormData>
              </Section>
              <Section>
                <Section>
                  <h4>SCHOOL ADDRESS</h4>
                </Section>
                <FormData>
                  <Label>STREET ADDRESS</Label>
                  <Input type="text" name="schoolStreet" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input type="text" name="schLGA" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>STATE</Label>
                  <Input type="text" name="state" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>NEAREST BUSSTOP</Label>
                  <Input type="text" name="schBusstop" onChange={(e) => handleChange(e)} />
                </FormData>
              </Section>
              <Section>
                <Section>
                  <h4>NEXT OF KIN</h4>
                </Section>
                <FormData>
                  <Label>FULL NAME</Label>
                  <Input type="text" name="FullNameOfKin" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>NEXT OF KIN RELATIONSHIP</Label>
                  <Input type="text" name="kinRelationship" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>EMAIL</Label>
                  <Input type="text" name="kinEmail" onChange={(e) => handleChange(e)} />
                </FormData>
                <FormData>
                  <Label>PHONE NUMBER</Label>
                  <Input type="text" name="kinPhone" onChange={(e) => handleChange(e)} />
                </FormData>
                <Section>
                  <Label>ADDRESS</Label>
                  <Input type="text" name="kinAddress" onChange={(e) => handleChange(e)} />
                </Section>
              </Section>
              <BtnDiv>
                <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
              </BtnDiv>
            </Form>
            {/* {activeTab === "tab2" ?  
        <>
          <Section>
        <FormData>
          <Label>POSITION</Label>
          <Input type="text" name="position"/>
        </FormData>
        <FormData>
          <Label>JERSEY NUMBER</Label>
          <Input type="number" name="jerseyNumber"/>
        </FormData>
        </Section>
      </> : ""} */}
            {/* {activeTab === "tab3" ?  
        <>
          <FormData>
            <Label>LATEST COURSE REGISTRATION</Label>
            <Input type="text" name="LatestCourseRegistration"/>
          </FormData>
          <FormData>
            <Label>COURSE LEVEL</Label>
            <Input type="text" name="CourseLevel"/>
          </FormData>
          <FormData>
            <Label>COURSE STUDY</Label>
            <Input type="text" name="CourseStudy"/>
          </FormData>
         </>  
         : ""} */}
            {/* {activeTab === "tab4" ?  
        <>
          <FormData>
            <Label>MEDICAL CERTIFICATE</Label>
            <Input type="file" name="MedicalCert"/>
          </FormData>
          <FormData>
            <Label>SCHOOL ID</Label>
            <Input type="file" name="SchoolId"/>
          </FormData>
          <FormData>
            <Label>PASSPORT PHOTOGRAPH</Label>
            <Input type="file" name="PassportPhotograph"/>
          </FormData>
          <FormData>
            <Label>JAMB PHOTOGRAPH</Label> 
            <Input type="file" name="JambPhotograph"/>
          </FormData>
         </>  
         : ""} */}
            {/* <BtnDiv>
              <CreateBtn>SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
          </BtnDiv> */}

          </Outlet>
        </Tab>
      </Content>
    </Container>
  )
}