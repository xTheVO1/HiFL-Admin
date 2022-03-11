import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Dispatch } from "redux";
// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Label, Content, FormData, Form, CreateBtn, BtnDiv, Outlet} from "./style";
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
            <Label>FIRST NAME</Label>
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
           {/*<FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>Name2</Label>
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
          <FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData>
          <FormData>
            <Label>Name</Label>
            <Input type="text" name="name"/>
          </FormData> */}
          <BtnDiv>
              <CreateBtn>SAVE & CONTINUE</CreateBtn>
              <CreateBtn className="submit">SUBMIT FOR ACCREDITATION</CreateBtn>
          </BtnDiv>
        </Form> : 
        ""}
        {activeTab === "tab2" ?  
        <Form>
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
      </Form> : ""}
        {activeTab === "tab3" ?  <Form>
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
         </Form>  : ""}
      </Outlet>
    </Tab>
      </Content>
    </Container>
  )
}