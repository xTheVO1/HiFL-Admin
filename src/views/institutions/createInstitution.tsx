import React, { useState } from "react";
// import { useDispatch } from "react-redux";
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
  Outlet
} from "../players/style";
import { Tab} from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions

export const AddInstitution: React.FC = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [object, setObject]: any = useState({});

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  };
  
  const submit = (e: any) => {
    e.preventDefault();
    //  const data = {
    //   InstitutionName: object.InstitutionName,
    //   Abbreviation: object.Abbreviation,
    //   InstitutionType: object.InstitutionType,
    //   Description: object.Description,
    //   Location: object.Location
    //  }
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title="CREATE INSTITUTION">
          <Button onClick={() => navigate("/institutions")}>GO BACK</Button>
        </ContentHeader>
        <Tab>
        <Outlet>
          <Form onSubmit={submit}>
            <FormData>
              <Label>INSTITUTION NAME </Label>
              <Input
                type="text"
                name="InstitutionName"
                onChange={(e) => handleChange(e)}
              />
            </FormData>
            <FormData>
              <Label>ABBREVIATION</Label>
              <Input
                type="text"
                name="Abbreviation"
                onChange={(e) => handleChange(e)}
              />
            </FormData>
            <FormData>
              <Label>INSTITUTION TYPE</Label>
              <Input
                type="text"
                name="InstitutionTypee"
                onChange={(e) => handleChange(e)}
              />
            </FormData>
            <FormData>
              <Label>DESCRIPTION</Label>
              <Input
                type="text"
                name="description"
                onChange={(e) => handleChange(e)}
              />
            </FormData>
            <FormData>
              <Label>LOCATION</Label>
              <Input
                type="text"
                name="location"
                onChange={(e) => handleChange(e)}
              />
            </FormData>
            
            <BtnDiv>
              <CreateBtn type="submit">SUBMIT</CreateBtn>
            </BtnDiv>
          </Form>
        </Outlet>
        </Tab>
      </Content>
    </Container>
  );
};
