import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
// import AWS from 'aws-sdk';
import FormData from "form-data";

// components
import ContentHeader from "../../components/ContentHeader";
import {
  Container,
  Label,
  Content,
  Form,
  FormHolder,
  CreateBtn,
  BtnDiv,
  Outlet,
  Section,
  Image,
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import Player from "../../assests/player.png";
import { getPlayerById, updatePlayer } from "../../redux/actions/players";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import {fileUpload} from "../../utils/file";



export const UpdatePlayer: React.FC = () => {
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");
  const [, setImage] = useState();
  const [files, setFileUpload] = useState({});
  const [progress , setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e: any) => {
      setSelectedFile(e.target.files[0]);
  }
  const [inputObject, setObject] = useState({
    Firstname: "",
    Lastname: "",
    Email: "",
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
    Allergies: "",
    PassportPhotograph: "",
    MedicalCert: "",
    SchoolID: "",
    JerseyNumber: "",
    CourseStudy: "",
    CourseLevel: "",
  });
  const dispatch: Dispatch<any> = useDispatch();
  const { id } = useParams();
  const store = useSelector((state: RootState) => state.player);
  const { loading, singlePlayer } = store;
  const teamId = sessionStorage.getItem("Teamid");
  const mainData = singlePlayer && singlePlayer ? singlePlayer : {};

  useLayoutEffect(() => {
    const getOfficial = async () => {
      dispatch(getPlayerById(id));
    };
    getOfficial();
    const {
      Address,
      NextOfKin,
      SchoolAddress,
      MedicalRecord,
      DocumentUploads,
      SportRecord,
    } = mainData;
    if (Address) {
      setObject({
        ...inputObject,
        FullNameOfKin: NextOfKin?.FullNameOfKin,
        KinRelationship: NextOfKin?.KinRelationship,
        KinPhone: NextOfKin?.KinContact?.PhoneNumber,
        KinAddress: NextOfKin?.KinContact?.Address,
        KinEmail: NextOfKin?.KinContact?.Email,
        StreetAddress: Address?.HomeAddress?.StreetAddress,
        LocalGovt: Address?.HomeAddress?.LocalGovt,
        NearestBusStop: Address?.HomeAddress?.NearestBusStop,
        State: Address?.HomeAddress?.LocalGovt,
        SchoolAddress: SchoolAddress?.StreetAddress,
        SchoolLocalGovt: SchoolAddress?.LocalGovt,
        SchoolNearestBusStop: SchoolAddress?.NearestBusStop,
        SchoolState: SchoolAddress?.LocalGovt,
        Position: SportRecord?.Position,
        JerseyNumber: SportRecord?.JerseyNumber,
        Genotype: MedicalRecord.Genotype,
        BloodGroup: MedicalRecord.BloodGroup,
        // AnyAllergies: MedicalRecord.AnyAllergies,
        PassportPhotograph: DocumentUploads.PassportPhotograph,
        MedicalCert: DocumentUploads.MedicalCert,
        SchoolID: DocumentUploads.SchoolID,
      });
    }
    // eslint-disable-next-line
  }, [dispatch]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
  };

  const editPlayer = (e: any) => {
    e.preventDefault();
    const details = {
      Team: teamId,
      AcademicRecord: {
        CourseLevel: inputObject.CourseLevel,
        CourseStudy: inputObject.CourseStudy,
      },
      SportRecord: {
        Position: inputObject.Position,
        JerseyNumber: inputObject.JerseyNumber,
      },
      // Phonenumber: object.phone,
      DateOfBirth: inputObject.Dateofbirth,
      Age: inputObject.Age,
      TermsAndConditions: true,
      NextOfKin: {
        FullNameOfKin: inputObject.FullNameOfKin,
        KinRelationship: inputObject.KinRelationship,
        KinContact: {
          PhoneNumber: inputObject.KinPhone,
          Email: inputObject.KinEmail,
          Address: inputObject.KinAddress,
        },
      },
      SchoolAddress: {
        StreetAddress: inputObject.SchoolAddress,
        LocalGovt: inputObject.SchoolLocalGovt,
        State: inputObject.State,
        NearestBusStop: inputObject.NearestBusStop,
      },
      MedicalRecord: {
        Genotype: inputObject.Genotype,
        BloodGroup: inputObject.BloodGroup,
        AnyAllergies: inputObject.Allergies,
      },
      DocumentUploads: {
        PassportPhotograph: inputObject.PassportPhotograph,
        MedicalCert: inputObject.MedicalCert,
        SchoolID: inputObject.SchoolID,
      },
    };

    
    const payload = { _id: id, params: details };
    dispatch(updatePlayer(payload));
    dispatch(getPlayerById(id));
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        setImage(e.target.result);
        setFileUpload({ 
          ...files,
          [event.target.name]: event.target.files[0]
        })
        fileUpload(files)
        const formData = new FormData();
        // formData.append()
        console.log(files, event, event.target.files[0])
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const S3_BUCKET ='fra1';
  const REGION ='YOUR_DESIRED_REGION_HERE';
//   AWS.config.update({
//     accessKeyId: 'NI7S7OYIIAK5FS2WN4AD',
//     secretAccessKey: 'Iz8ngfgip4Ig2uUDJQWyGTELVgpuebrdiNhU1K0sNi0'
// })

// const myBucket = new AWS.S3({
//     params: { Bucket: S3_BUCKET},
//     region: REGION,
// })

const uploadFile = (file: any) => {

  const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
  };

  // myBucket.putObject(params)
  //     .on('httpUploadProgress', (evt) => {
  //         setProgress(Math.round((evt.loaded / evt.total) * 100))
  //     })
  //     .send((err) => {
  //         if (err) console.log(err)
  //     })
}
  return (
    <Container>
      <Content>
        <ContentHeader title={"Player Profile"}>
          <Button onClick={() => navigate("/players")}>Go Back</Button>
        </ContentHeader>
        {loading ? (
          <Loader />
        ) : (
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
                <Form onSubmit={editPlayer}>
                  <Section>
                    <FormHolder>
                      {/* <Image src={!inputObject.PassportPhotograph ? `https://hifl-temp.herokuapp.com/api/v1/${mainData.DocumentUploads.PassportPhotograph}` : `https://hifl-temp.herokuapp.com/api/v1/${inputObject.PassportPhotograph}`} alt="players" /> */}
                      <Image src={Player} alt="players" />
                    </FormHolder>
                  </Section>
                  <FormHolder>
                    <Label>FIRST NAME </Label>
                    <Input
                      type="text"
                      name="Firstname"
                      onChange={(e) => handleChange(e)}
                      disabled={true}
                      value={mainData.User ? mainData.User.Firstname : ""}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>LAST NAME</Label>
                    <Input
                      type="text"
                      name="Lastname"
                      onChange={(e) => handleChange(e)}
                      disabled={true}
                      value={mainData.User ? mainData.User.Lastname : ""}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>MIDDLE NAME</Label>
                    <Input
                      type="text"
                      name="MiddleName"
                      onChange={(e) => handleChange(e)}
                      disabled={true}
                      value={mainData.MiddleName}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>DATE OF BIRTH</Label>
                    <Input
                      type="date"
                      name="DateOfBirth"
                      disabled={true}
                      onChange={(e) => handleChange(e)}
                    />
                  </FormHolder>
                  <Section>
                    <Label>EMAIL</Label>
                    <Input
                      type="text"
                      name="Email"
                      disabled={true}
                      onChange={(e) => handleChange(e)}
                      value={mainData.User ? mainData.User.Email : ""}
                    />
                  </Section>
                  <Section>
                    <Section>
                      <h4>HOME ADDRESS</h4>
                    </Section>
                    <FormHolder>
                      <Label>STREET ADDRESS</Label>
                      <Input
                        type="text"
                        name="StreetAddress"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.StreetAddress
                            ? mainData?.Address?.HomeAddress?.StreetAddress
                            : inputObject.StreetAddress
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="LocalGovt"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.LocalGovt
                            ? mainData?.Address?.HomeAddress?.LocalGovt
                            : inputObject.LocalGovt
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="State"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.State
                            ? mainData?.Address?.HomeAddress?.State
                            : inputObject.State
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="NearestBusStop"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.NearestBusStop
                            ? mainData?.Address?.HomeAddress?.NearestBusStop
                            : inputObject.NearestBusStop
                        }
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
                        name="SchoolAddress"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.SchoolAddress
                            ? mainData?.SchoolAddress?.StreetAddress
                            : inputObject.SchoolAddress
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="SchoolLocalGovt"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.SchoolLocalGovt
                            ? mainData?.SchoolAddress?.LocalGovt
                            : inputObject.SchoolLocalGovt
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="SchoolState"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.SchoolState
                            ? mainData?.SchoolAddress?.State
                            : inputObject.SchoolState
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="SchoolNearestBusstop"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.SchoolNearestBusStop
                            ? mainData?.SchoolAddress?.NearestBusStop
                            : inputObject.SchoolNearestBusStop
                        }
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
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.FullNameOfKin
                            ? mainData?.NextOfKin?.FullNameOfKin
                            : inputObject.FullNameOfKin
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEXT OF KIN RELATIONSHIP</Label>
                      <Input
                        type="text"
                        name="KinRelationship"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.KinRelationship
                            ? mainData?.NextOfKin?.KinRelationship
                            : inputObject.KinRelationship
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>EMAIL</Label>
                      <Input
                        type="text"
                        name="KinEmail"
                        onChange={(e) => handleChange(e)}
                        value={
                          !inputObject.KinEmail
                            ? mainData?.NextOfKin?.KinContact?.Email
                            : inputObject.KinEmail
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>PHONE NUMBER</Label>
                      <Input
                        type="text"
                        name="KinPhone"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.KinPhone
                            ? mainData?.NextOfKin?.KinContact?.PhoneNumber
                            : inputObject.KinPhone
                        }
                      />
                    </FormHolder>
                    <Section>
                      <Label>ADDRESS</Label>
                      <Input
                        type="text"
                        name="KinAddress"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.KinAddress
                            ? mainData?.NextOfKin?.KinContact?.Address
                            : inputObject.KinAddress
                        }
                      />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
                    <CreateBtn className="submit">
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab2" ? (
                <Form onSubmit={editPlayer}>
                  <Section>
                    <FormHolder>
                      <Label>POSITION</Label>
                      <Input
                        type="text"
                        name="Position"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.Position
                            ? mainData?.Position
                            : inputObject.Position
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>JERSEY NUMBER</Label>
                      <Input type="number" name="jerseyNumber" />
                    </FormHolder>
                  </Section>
                  <Section>
                    <Section>
                      <h4>MEDICAL RECORD</h4>
                    </Section>
                    <FormHolder>
                      <Label>GENOTYPE</Label>
                      <Input
                        type="text"
                        name="Genotype"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.Genotype
                            ? mainData?.MedicalRecord?.Genotype
                            : inputObject.Genotype
                        }
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>BLOOD GROUP</Label>
                      <Input
                        type="text"
                        name="BloodGroup"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.BloodGroup
                            ? mainData?.MedicalRecord?.BloodGroup
                            : inputObject.BloodGroup
                        }
                      />
                    </FormHolder>
                    <Section>
                      <Label>ALLERGIES</Label>
                      <Input
                        type="text"
                        name="Allergies"
                        onChange={(e) => handleChange(e)}
                        value={
                          inputObject.Allergies
                            ? mainData?.MedicalRecord?.AnyAllergies
                            : inputObject.Allergies
                        }
                      />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE & CONTINUE</CreateBtn>
                    <CreateBtn className="submit">
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn>
                  </BtnDiv>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab3" ? (
                <Form onSubmit={editPlayer}>
                  <FormHolder>
                    <Label>LATEST COURSE REGISTRATION</Label>
                    <Input type="text" name="LatestCourseRegistration" />
                  </FormHolder>
                  <FormHolder>
                    <Label>COURSE LEVEL</Label>
                    <Input type="text" name="CourseLevel" />
                  </FormHolder>
                  <FormHolder>
                    <Label>COURSE STUDY</Label>
                    <Input type="text" name="CourseStudy" />
                  </FormHolder>
                </Form>
              ) : (
                ""
              )}
              {activeTab === "tab4" ? (
                <Form onSubmit={editPlayer}>
                  <FormHolder>
                    <Label>MEDICAL CERTIFICATE</Label>
                    <Input
                      type="file"
                      name="MedicalCert"
                      onChange={(e) => onImageChange(e)}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>SCHOOL ID</Label>
                    <Input
                      type="file"
                      name="SchoolId"
                      onChange={(e) => onImageChange(e)}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>PASSPORT PHOTOGRAPH</Label>
                    <Input
                      type="file"
                      name="PassportPhotograph"
                      onChange={(e) => onImageChange(e)}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>JAMB PHOTOGRAPH</Label>
                    <Input
                      type="file"
                      name="JambPhotograph"
                      onChange={(e) => onImageChange(e)}
                    />
                  </FormHolder>
                </Form>
              ) : (
                ""
              )}
            </Outlet>
          </Tab>
        )}
      </Content>
    </Container>
  );
};
