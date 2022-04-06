import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";
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
  Section,
  Image,
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions
import { createPlayers } from "../../redux/actions/players";
import { createOfficials } from "../../redux/actions/officials";
import { postFile } from "../../redux/actions/fileUpload";
import { RootState } from "../../redux/reducers";

export const AddPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  // const [progress , setProgress] = useState(0);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [object, setObject]: any = useState({});
  const [image, setImage] = useState();
  const hiddenFileInput: any = React.useRef(null);
  const pathname = window.location.pathname;

  const store = useSelector((state: RootState) => state.files.file)
  const loadaing = useSelector((state: RootState) => state.files.loading)
  const fileData = store && store ? store : {};


  const handleClick = (event: any) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e: any) => {
    const teamId = sessionStorage.getItem("Teamid");
    e.preventDefault();

    const userData = {
      Firstname: object.Firstname,
      Lastname: object.Lastname,
      Email: object.email,
    };

    const playerData = {
      Team: teamId,
      Email: object.email,
      // Phonenumber: object.phone,
      MiddleName: object.Middlename,
      DateOfBirth: object.Dateofbirth,
      TermsAndConditions: true,
      NextOfKin: {
        FullNameOfKin: object.FullNameOfKin,
        KinRelationship: object.kinRelationship,
        kinContact: {
          PhoneNumber: object.kinPhone,
          Email: object.kinEmail,
          Address: object.kinAddress,
        },
      },
      Address: {
        HomeAddress: {
          StreetAddress: object.streetAddress,
          LocalGovt: object.localGovt,
          State: object.state,
          NearestBusStop: object.nearestBusstop,
        },
      },
      SchoolAddress: {
        StreetAddress: object.schoolAddress,
        LocalGovt: object.schLGA,
        State: object.schoolState,
        NearestBusStop: object.schBusstop,
      },
      DocumentUploads: {
        PassportPhotograph: image,
      },
    };
    if (pathname === "/register-player") {
      dispatch(createPlayers({ userData, playerData, navigate }));
    } else if (pathname === "/register-official") {
      dispatch(createOfficials({ userData, playerData, navigate }));
    }
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
        const formData:any = new FormData();
        if(formData){
          console.log(event.target.name)

          formData.append(
            "file", 
            event.target.files[0]
          )
          formData.append(
            "folder", 
            "passportphotograph"
          )
          formData.append(
            "fileid", 
            "passpo"
          )

          dispatch(postFile(formData))
        // Display the key/value pairs
        for (var pair of formData.entries()) {
          console.log(pair[0]+ ', ' + pair[1]); 
        }
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // };
   
  };

  return (
    <Container>
      <Content>
        <ContentHeader
          title={
            pathname === "/register-player"
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
              <Section>
                <FormHolder>
                  <>{image ? <Image src={image} alt="players" /> : ""}</>
                  <button onClick={handleClick} className="file-btn">
                    {" "}
                    Upload Passport Photograph
                  </button>
                  <input
                    type="file"
                    onChange={(e) =>onImageChange(e)}
                    ref={hiddenFileInput}
                    className="file"
                    id="group_image"
                    style={{ display: "none" }}
                  />
                </FormHolder>
              </Section>
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
                <Input
                  type="date"
                  name="datOfBirth"
                  required
                  onChange={(e) => handleChange(e)}
                />
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
                  <Label>NEAREST BUSSTOP</Label>
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
                  <Label>NEAREST BUSSTOP</Label>
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
                    type="text"
                    name="kinEmail"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <FormHolder>
                  <Label>PHONE NUMBER</Label>
                  <Input
                    type="text"
                    name="kinPhone"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </FormHolder>
                <Section>
                  <Label>ADDRESS</Label>
                  <Input
                    type="text"
                    name="kinAddress"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </Section>
              </Section>
              <BtnDiv>
                <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
              </BtnDiv>
            </Form>
          </Outlet>
        </Tab>
      </Content>
    </Container>
  );
};
