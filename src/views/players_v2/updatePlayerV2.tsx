import React, { Component } from "react";
import { connect } from 'react-redux';
import { RootState } from "../../redux/reducers";
import { Players} from "./index";
import { Dispatch } from "redux";
import { NavLink } from "react-router-dom";
import FormData from "form-data";
import {
  POST_FILE_STARTED,
  POST_FILE_SUCCESSFUL,
  POST_FILE_FAILED
} from "../../redux/actions/actionTypes";
import moment from "moment";
import { MdCheck } from "react-icons/md";
import { privateHttp } from "../../baseUrl";
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
  Select,
  FileHolder,
} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";
import { getPlayerById, updatePlayer } from "../../redux/actions/players";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import queryString from "query-string"
interface PropsType {
    id: string;
    match: any;
    getPlayerById: any;
    loading: boolean;
    singlePlayer: any;
    player: {};
    updatePlayer: any;
}

interface StateType {
    activeTab: string;
}
class PlayerUpdate extends Component<PropsType, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            id: "",
            activeTab: "tab1",
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
                DateOfBirth: 0,
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
                JerseyNumber: "",
                CourseStudy: "",
                CourseLevel: "",
                MatricNumber: "",
                JambRegNumber: "",
                LatestCourseRegistration: "",
                JambPhotograph: "",
                JambResultSlip: "",
                SchoolPortalPassword: "",
                SchoolPortalID: "",
                Programme: "",
                CourseFaculty: "",
                fileName: "",
                teamId: sessionStorage.getItem("Teamid")
        }
    }

    componentDidMount() {
        const url =window.location.pathname.split("/")
       this.setState({
            id:  url[2]
       }) 
        this.props.getPlayerById(url[2])
    }

    componentDidUpdate() {
        const mainData = this.props.singlePlayer && this.props.singlePlayer ? this.props.singlePlayer : {};
        const {
            Address,
            NextOfKin,
            MedicalRecord,
            DocumentUploads,
            SportRecord,
            AcademicRecord, User, MiddleName, Age,DateOfBirth
          } = mainData;
            this.setState({
                Firstname: mainData?.User?.Firstname,
                Lastname: mainData?.User?.Lastname,
                Email: mainData?.User?.Email,
                DateOfBirth: mainData?.DateOfBirth,
                Age: mainData?.Age,
                MiddleName: mainData?.MiddleName,
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
                Position: SportRecord?.Position,
                JerseyNumber: SportRecord?.JerseyNumber,
                Genotype: MedicalRecord?.Genotype,
                BloodGroup: MedicalRecord?.BloodGroup,
                AnyAllergies: MedicalRecord?.AnyAllergies,
                MatricNumber: AcademicRecord?.MatricNumber,
                JambRegNumber: AcademicRecord?.JambRegNumber,
                CourseFaculty: AcademicRecord?.CourseFaculty,
                Programme: AcademicRecord?.Programme,
                SchoolPortalID: AcademicRecord?.SchoolPortalID,
                SchoolPortalPassword: AcademicRecord?.SchoolPortalPassword,
                PassportPhotograph: DocumentUploads?.PassportPhotograph,
                MedicalCert: DocumentUploads?.MedicalCert,
                SchoolID: DocumentUploads?.SchoolID,
                JambResultSlip: DocumentUploads?.JambResultSlip,
                JambPhotograph: DocumentUploads?.JambPhotograph,
                LatestCourseRegistration: DocumentUploads?.LatestCourseRegistration
              });
    }
    
    
    changeTab = (tab: any) => {
        this.setState({
            activeTab: tab
        })
    
      }
      
      handleChange = (e: any) => {
        e.preventDefault();
        this.setState({
          [e.target.name]: e.target.value
        });
      };

      editPlayer = async (e: any) => {
        e.preventDefault();
        const {Firstname,
            Lastname,
            Email,
            MiddleName,
            SchoolAddress,
            SchoolNearestBusStop,SchoolLocalGovt,
            SchoolState,DateOfBirth,
            StreetAddress,
            NearestBusStop,
            State,
            LocalGovt,
            SchLGA,
            Age,
            FullNameOfKin,
            KinRelationship,
            KinPhone,
            KinAddress,
            KinEmail,
            Position,
            Genotype,
            BloodGroup,
            AnyAllergies,
            PassportPhotograph,
            MedicalCert,
            SchoolID,
            JerseyNumber,
            CourseStudy,
            CourseLevel,
            MatricNumber,JambRegNumber,
            LatestCourseRegistration,
            JambPhotograph,
            JambResultSlip,
            SchoolPortalPassword,
            SchoolPortalID,
            Programme,
            CourseFaculty, teamId, CreatedBy, id } =  this.state;
        const newAge = moment(DateOfBirth).fromNow(true).split(" ")
        const details = {
          _id: id,
          params: {
            Firstname: Firstname,
            Lastname: Lastname,
            MiddleName:MiddleName,
            Team: teamId,
            DateOfBirth: DateOfBirth,
            Age: parseInt(newAge[0]),
            TermsAndConditions: true,
            NextOfKin: {
              FullNameOfKin: FullNameOfKin,
              KinRelationship: KinRelationship,
              KinContact: {
                PhoneNumber: KinPhone,
                Email: KinEmail,
                Address: KinAddress,
              },
            },
            Address: {
              HomeAddress: {
                StreetAddress: StreetAddress,
                LocalGovt: LocalGovt,
                State: State,
                NearestBusStop: NearestBusStop,
              },
              SchoolAddress: {
                StreetAddress: SchoolAddress,
                LocalGovt: SchoolLocalGovt,
                State: SchoolState,
                NearestBusStop: SchoolNearestBusStop,
              }
            },
            YearApplied: [
              {
                Year: 2022
              }
            ],
            MedicalRecord: {
              Genotype: Genotype,
              BloodGroup: BloodGroup,
              AnyAllergies: AnyAllergies,
            },
            SportRecord: {
              Position: Position,
              JerseyNumber: JerseyNumber,
            },
            // DocumentUploads: {
            //   PassportPhotograph: files.PassportPhotograph,
            //   MedicalCert: files.MedicalCert,
            //   SchoolID: files.SchoolID,
            //   JambResultSlip: files.JambResultSlip,
            //   JambPhotograph: files.JambPhotograph,
            //   LatestCourseRegistration: files.LatestCourseRegistration
            // },
            AcademicRecord: {
              CourseLevel: CourseLevel,
              CourseStudy: CourseStudy,
              MatricNumber: MatricNumber,
              JambRegNumber: JambRegNumber,
              CourseFaculty: CourseFaculty,
              Programme: Programme,
              SchoolPortalID: SchoolPortalID,
              SchoolPortalPassword: SchoolPortalPassword
            },
            CreatedBy: CreatedBy
          }
        };
       this.props.updatePlayer(details)
       this.props.getPlayerById(id)
      };

       positions = [
        { type: "Forward", value: "FW" },
        { type: "Midfielder", value: "MF" },
        { type: "Defender", value: "DF" },
        { type: "Goal Keeper", value: "GK" }
      ]
    
       fileType = [
        { type: "Passport Photograph", value: "PassportPhotograph" },
        { type: "Medical Certificate", value: "MedicalCert" },
        { type: "School ID", value: "SchoolID" },
        { type: "Jamb Photograph", value: "JambPhotograph" },
        { type: "Jamb Result Slip", value: "JambResultSlip" },
        { type: "Latest Course Registration", value: "LatestCourseRegistration" }
      ]

      render () {
        const {activeTab,Firstname,
        Lastname,
        Email,
        MiddleName,
        SchoolAddress,
        SchoolNearestBusStop,SchoolLocalGovt,
        SchoolState,DateOfBirth,
        StreetAddress,
        NearestBusStop,
        State,
        LocalGovt,
        SchLGA,
        Age,
        FullNameOfKin,
        KinRelationship,
        KinPhone,
        KinAddress,
        KinEmail,
        Position,
        Genotype,
        BloodGroup,
        AnyAllergies,
        PassportPhotograph,
        MedicalCert,
        SchoolID,
        JerseyNumber,
        CourseStudy,
        CourseLevel,
        MatricNumber,JambRegNumber,
        LatestCourseRegistration,
        JambPhotograph,
        JambResultSlip,
        SchoolPortalPassword,
        SchoolPortalID,
        Programme,
        CourseFaculty } =  this.state;
        const {loading, singlePlayer, player} = this.props;
        return (
            <Container>
            <Content>
              <ContentHeader title={"Player Profile"}>
                <Button ><NavLink to={"/players_v2"} >Go Back</NavLink></Button>
              </ContentHeader>
              {loading ? (
          <Loader />) : 
          !singlePlayer && !singlePlayer ? "NO DATA FOUND" :(
              <Tab>
            <Nav>
              <List
                className={activeTab === "tab1" ? "active" : ""}
                onClick={() => this.changeTab("tab1")}
              >
                PERSONAL
              </List>
              <List
                className={activeTab === "tab2" ? "active" : ""}
                onClick={() => this.changeTab("tab2")}
              >
                SPORT & MEDICAL
              </List>
              <List
                className={activeTab === "tab3" ? "active" : ""}
                onClick={() => this.changeTab("tab3")}
              >
                ACADEMIC
              </List>
              {/* <List
                className={activeTab === "tab4" ? "active" : ""}
                onClick={() => changeTab("tab4")}
              >
                DOCUMENT UPLOADS
              </List> */}
            </Nav>
            <Outlet>
              {activeTab === "tab1" ? 
                <Form onSubmit={this.editPlayer}>
               <Section>
                 <FormHolder>
                   {/* <Image src={!PassportPhotograph ? `https://hifl-temp.herokuapp.com/api/v1/${mainData.DocumentUploads.PassportPhotograph}` : `https://hifl-temp.herokuapp.com/api/v1/${PassportPhotograph}`} alt="players" /> */}
                   {/* <Image src={"https://prod-hiv.fra1.digitaloceanspaces.com/hifl-fileserver/jhaga/plojd_B6J340GJB5_.png"} alt="players" /> */}
                 </FormHolder>
               </Section>
               <FormHolder>
                 <Label>FIRST NAME </Label>
                 <Input
                   type="text"
                   name="Firstname"
                   onChange={(e) => this.handleChange(e)}
                   defaultValue={!Firstname ? "" : Firstname}
                 />
               </FormHolder>
               <FormHolder>
                    <Label>LAST NAME</Label>
                    <Input
                      type="text"
                      name="Lastname"
                      onChange={(e) => this.handleChange(e)}
                      value={Lastname}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>MIDDLE NAME</Label>
                    <Input
                      type="text"
                      name="MiddleName"
                      onChange={(e) => this.handleChange(e)}
                      value={MiddleName}
                    />
                  </FormHolder>
                  <FormHolder>
                    <Label>DATE OF BIRTH <span>{moment(DateOfBirth).format("LL")}({Age} Years)</span></Label>
                    <Input
                      type="date"
                      name="DateOfBirth" max="2006-12-31" min="1993-01-01"
                      onChange={(e) => this.handleChange(e)}
                    />
                   
                  </FormHolder>
                  <Section>
                    <Label>EMAIL</Label>
                    <Input
                      type="text"
                      name="Email"
                      onChange={(e) => this.handleChange(e)}
                      disabled={true}
                      value={Email}
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
                        onChange={(e) => this.handleChange(e)}
                        required
                        value={StreetAddress}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="LocalGovt"
                        onChange={(e) => this.handleChange(e)} 
                        required
                        value={LocalGovt}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="State"
                        onChange={(e) => this.handleChange(e)}
                        value={State} required
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="NearestBusStop"
                        onChange={(e) => this.handleChange(e)}
                         required
                        value={NearestBusStop}
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
                        onChange={(e) => this.handleChange(e)} 
                        required
                        value={SchoolAddress}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>LOCAL GOVERNMENT</Label>
                      <Input
                        type="text"
                        name="SchoolLocalGovt"
                        onChange={(e) => this.handleChange(e)} required
                        value={SchoolLocalGovt}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>STATE</Label>
                      <Input
                        type="text"
                        name="SchoolState"
                        onChange={(e) => this.handleChange(e)} required
                        value={SchoolState}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEAREST BUSSTOP</Label>
                      <Input
                        type="text"
                        name="SchoolNearestBusStop"
                        onChange={(e) => this.handleChange(e)} 
                        required
                        value={SchoolNearestBusStop}
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
                        onChange={(e) => this.handleChange(e)} required
                        value={FullNameOfKin}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>NEXT OF KIN RELATIONSHIP</Label>
                      <Input
                        type="text"
                        name="KinRelationship"
                        onChange={(e) => this.handleChange(e)} required
                        value={KinRelationship}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>EMAIL</Label>
                      <Input
                        type="text"
                        name="KinEmail"
                        onChange={(e) => this.handleChange(e)} 
                        required
                        value={KinEmail}
                      />
                    </FormHolder>
                    <FormHolder>
                      <Label>PHONE NUMBER</Label>
                      <Input
                        type="number"
                        name="KinPhone"
                        onChange={(e) => this.handleChange(e)} 
                        required
                        value={KinPhone}
                      />
                    </FormHolder>
                    <Section>
                      <Label>ADDRESS</Label>
                      <Input
                        type="text"
                        name="KinAddress"
                        onChange={(e) => this.handleChange(e)}
                        required
                        value={KinAddress}
                      />
                    </Section>
                  </Section>
                  <BtnDiv>
                    <CreateBtn type="submit">SAVE</CreateBtn>
                    {/* <CreateBtn className="submit" disabled={true}>
                      SUBMIT FOR ACCREDITATION
                    </CreateBtn> */}
                  </BtnDiv>
               </Form>: ""}
              {activeTab === "tab2" ? 
            <Form onSubmit={this.editPlayer}>
            <Section>
              <FormHolder>
                <Label>POSITION</Label>
                    <Select
                    name="Position"
                    onChange={(e) => this.handleChange(e)}
                    value={
                     Position}
                  >
                    <option>Select a Position</option>
                    {this.positions.map(item => (
                      <option value={item.value}>{item.type}</option>
                    ))}
                  </Select>
              </FormHolder>
              <FormHolder>
                <Label>JERSEY NUMBER</Label>
                <Input type="number"
                  name="JerseyNumber"
                  onChange={(e) => this.handleChange(e)}
                  value={JerseyNumber} />
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
                  onChange={(e) => this.handleChange(e)}
                  value={
                   Genotype}
                />
              </FormHolder>
              <FormHolder>
                <Label>BLOOD GROUP</Label>
                <Input
                  type="text"
                  name="BloodGroup"
                  onChange={(e) => this.handleChange(e)}
                  value={
                   BloodGroup }
                />
              </FormHolder>
              <Section>
                <Label>ALLERGIES</Label>
                <Input
                  type="text"
                  name="AnyAllergies"
                  onChange={(e) => this.handleChange(e)}
                  value={
                   AnyAllergies}
                />
              </Section>
            </Section>
            <BtnDiv>
              <CreateBtn type="submit">SAVE</CreateBtn>
            </BtnDiv>
          </Form>
              : ""}
              {activeTab === "tab3" ? 
              <Form onSubmit={this.editPlayer}>
              <FormHolder>
                <Label>MATRICULATION NUMBER</Label>
                <Input type="text"
                  name="MatricNumber"
                  onChange={(e) => this.handleChange(e)}
                  value={ MatricNumber} />
              </FormHolder>
              <FormHolder>
                <Label>JAMB REGISTRATION NUMBER</Label>
                <Input type="text"
                  name="JambRegNumber"
                  onChange={(e) => this.handleChange(e)}
                  value={JambRegNumber} />
              </FormHolder>
              <FormHolder>
                <Label>COURSE LEVEL</Label>
                <Input type="text"
                  name="CourseLevel"
                  onChange={(e) => this.handleChange(e)}
                  value={CourseLevel} />
              </FormHolder>
              <FormHolder>
                <Label>SCHOOL PORTAL ID</Label>
                <Input type="text"
                  name="SchoolPortalID"
                  onChange={(e) => this.handleChange(e)}
                  value={SchoolPortalID} />
              </FormHolder>
              <FormHolder>
                <Label>COURSE STUDY</Label>
                <Input type="text"
                  name="CourseStudy"
                  onChange={(e) => this.handleChange(e)}
                  value={
                   CourseStudy}
                />
              </FormHolder>
              <FormHolder>
                <Label>SCHOOL PORTAL PASSWORD</Label>
                <Input type="text"
                  name="SchoolPortalPassword"
                  onChange={(e) => this.handleChange(e)}
                  value={
                   SchoolPortalPassword} />
              </FormHolder>
              <FormHolder>
                <Label>PROGRAMME</Label>
                <Select onChange={(e) => this.handleChange(e)}>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="postGraduate">Post-Graduate</option>
                </Select>
              </FormHolder>
              <FormHolder>
                <Label>COURSE FACULTY</Label>
                <Input type="text"
                  name="CourseFaculty"
                  onChange={(e) => this.handleChange(e)}
                  value={
                   CourseFaculty} />
              </FormHolder>
              <BtnDiv>
                <CreateBtn type="submit">SAVE</CreateBtn>
              </BtnDiv>
            </Form>
               : ""}
              {activeTab === "tab4" ? "Tab 4" : ""}
              </Outlet>
            </Tab>
          )}
            </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state: any) => {
    const {  loading, singlePlayer, player } = state.player;
    return {
        loading, singlePlayer, player
    }
  }
  export default connect(mapStateToProps, { getPlayerById, updatePlayer })(PlayerUpdate);
  