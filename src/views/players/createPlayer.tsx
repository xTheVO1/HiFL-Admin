import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import Button from "../../components/Button";

//actions
import { createPlayers } from "../../redux/actions/players";
import { createOfficials } from "../../redux/actions/officials";

export const AddPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [object, setObject]: any = useState({});
  const [image, setImage] = useState();
  const hiddenFileInput: any = React.useRef(null);
  const pathname = window.location.pathname;

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
        // console.log(event.target.files, e.target.result )
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // };
    // const blob = event.target.files[0];
    // const params = { Body: blob,
    //                  Bucket: `${Config.bucketName}`,
    //                  Key: blob.name};
    // Sending the file to the Spaces
    //  S3.putObject(params)
    //    .on('build', request => {
    //      request.httpRequest.headers.Host = `${Config.digitalOceanSpaces}`;
    //      request.httpRequest.headers['Content-Length'] = blob.size;
    //      request.httpRequest.headers['Content-Type'] = blob.type;
    //      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    //   })
    //   .send((err) => {
    //     if (err) errorCallback();
    //     else {
    //     // If there is no error updating the editor with the imageUrl
    //     const imageUrl = `${Config.digitalOceanSpaces}` + blob.name
    //     callback(imageUrl, blob.name)
    //    }
    // });
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
                <FormData>
                  <>{image ? <Image src={image} alt="players" /> : ""}</>
                  <button onClick={handleClick} className="file-btn">
                    {" "}
                    Upload Passport Photograph
                  </button>
                  <input
                    type="file"
                    onChange={onImageChange}
                    ref={hiddenFileInput}
                    className="file"
                    id="group_image"
                    style={{ display: "none" }}
                  />
                </FormData>
              </Section>
              <FormData>
                <Label>FIRST NAME </Label>
                <Input
                  type="text"
                  name="Firstname"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>LAST NAME</Label>
                <Input
                  type="text"
                  name="Lastname"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>MIDDLE NAME</Label>
                <Input
                  type="text"
                  name="Middlename"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>DATE OF BIRTH</Label>
                <Input
                  type="date"
                  name="datOfBirth"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>EMAIL</Label>
                <Input
                  type="text"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>PHONE</Label>
                <Input
                  type="text"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <Section>
                <Section>
                  <h4>HOME ADDRESS</h4>
                </Section>
                <FormData>
                  <Label>STREET ADDRESS</Label>
                  <Input
                    type="text"
                    name="streetAddress"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input
                    type="text"
                    name="localGovt"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="state"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>NEAREST BUSSTOP</Label>
                  <Input
                    type="text"
                    name="nearestBusstop"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
              </Section>
              <Section>
                <Section>
                  <h4>SCHOOL ADDRESS</h4>
                </Section>
                <FormData>
                  <Label>STREET ADDRESS</Label>
                  <Input
                    type="text"
                    name="schoolAddress"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>LOCAL GOVERNMENT</Label>
                  <Input
                    type="text"
                    name="schLGA"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="schoolState"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>NEAREST BUSSTOP</Label>
                  <Input
                    type="text"
                    name="schBusstop"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
              </Section>
              <Section>
                <Section>
                  <h4>NEXT OF KIN</h4>
                </Section>
                <FormData>
                  <Label>FULL NAME</Label>
                  <Input
                    type="text"
                    name="FullNameOfKin"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>NEXT OF KIN RELATIONSHIP</Label>
                  <Input
                    type="text"
                    name="kinRelationship"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>EMAIL</Label>
                  <Input
                    type="text"
                    name="kinEmail"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <FormData>
                  <Label>PHONE NUMBER</Label>
                  <Input
                    type="text"
                    name="kinPhone"
                    onChange={(e) => handleChange(e)}
                  />
                </FormData>
                <Section>
                  <Label>ADDRESS</Label>
                  <Input
                    type="text"
                    name="kinAddress"
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
