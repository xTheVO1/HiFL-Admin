import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Dispatch } from "redux";
// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Label, Content, FormData, Form, CreateBtn, BtnDiv, Outlet, Section} from "./style";
import { Tab, Nav, List } from "../../components/tab/style";
import Input from "../../components/Input";

export const AddPlayer: React.FC = () => {
    const [activeTab, setActiveTab] = useState("tab1")
//   const dispatch: Dispatch<any> = useDispatch();

//   const addPlayer = () => {

//   }
  return (
    <Container>
    <Content>
    <ContentHeader title="Create Player">
   </ContentHeader>
    <Tab>
      <Nav>
        <List className={activeTab === "tab1" ? "active" : ""} onClick={() => setActiveTab("tab1")}>PERSONAL</List>
        <List className={activeTab === "tab2" ? "active" : ""} onClick={() => setActiveTab("tab2")}>SPORT</List>
        <List className={activeTab === "tab3" ? "active" : ""} onClick={() => setActiveTab("tab3")}>ACADEMIC</List>
        <List className={activeTab === "tab4" ? "active" : ""} onClick={() => setActiveTab("tab4")}>UPLOADS</List>
      </Nav>
      <Outlet>
          {activeTab === "tab1" ?  
          <Form>
          <FormData>
            <Label>FULL NAME </Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>LAST NAME</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>MIDDLE NAME</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>EMAIL</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>DATE OF BIRTH</Label>
            <Input type="date" name="datOfBirth"/>
          </FormData>
          <Section>
          <Section>
            <h4>HOME ADDRESS</h4>
          </Section>
          <FormData>
            <Label>STREET ADDRESS</Label>
            <Input type="text" name="streetAddress"/>
          </FormData>
          <FormData>
            <Label>LOCAL GOVERNMENT</Label>
            <Input type="text" name="localGovt"/>
          </FormData>
          <FormData>
            <Label>STATE</Label>
            <Input type="text" name="state"/>
          </FormData>
          <FormData>
            <Label>NEAREST BUSSTOP</Label>
            <Input type="text" name="nearestBusStop"/>
          </FormData>
          </Section>
          <Section>
            <Section>
              <h4>SCHOOL ADDRESS</h4>
            </Section>
          <FormData>
            <Label>STREET ADDRESS</Label>
            <Input type="text" name="schoolStreet"/>
          </FormData>
          <FormData>
            <Label>LOCAL GOVERNMENT</Label>
            <Input type="text" name="schLGA"/>
          </FormData> 
          <FormData>
            <Label>STATE</Label>
            <Input type="text" name="state"/>
          </FormData> 
          <FormData>
            <Label>NEAREST BUSSTOP</Label>
            <Input type="text" name="schBusstop"/>
          </FormData> 
          </Section>
          <Section>
          <Section>
            <h4>NEXT OF KIN</h4>
          </Section>
            <FormData>
            <Label>FULL NAME</Label>
            <Input type="text" name="FullNameOfKin"/>
          </FormData> 
          <FormData>
            <Label>NEXT OF KIN RELATIONSHIP</Label>
            <Input type="text" name="kinRelationship"/>
          </FormData> 
          <FormData>
            <Label>EMAIL</Label>
            <Input type="text" name="kinEmail"/>
          </FormData> 
          <FormData>
            <Label>PHONE NUMBER</Label>
            <Input type="text" name="kinPhone"/>
          </FormData> 
          <FormData>
            <Label>ADDRESS</Label>
            <Input type="text" name="kinAddress"/>
          </FormData> 
          </Section>
          <Section>
            <Section>
              <h4>MEDICAL RECORD</h4>
            </Section>
        <FormData>
          <Label>GENOTYPE</Label>
          <Input type="text" name="Genotype"/>
        </FormData>
        <FormData>
          <Label>BLOOD GROUP</Label>
          <Input type="text" name="BloodGroup"/>
        </FormData>
        </Section>
        </Form> : 
        ""}
        {activeTab === "tab2" ?  
        <Form>
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
      </Form> : ""}
        {activeTab === "tab3" ?  
        <Form>
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
         </Form>  
         : ""}
        {activeTab === "tab4" ?  
        <Form>
          <FormData>
            <Label>Year</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData>
         </Form>  
         : ""}
         <BtnDiv>
              <CreateBtn>SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
          </BtnDiv>
      </Outlet>
    </Tab>
      </Content>
    </Container>
  )
}