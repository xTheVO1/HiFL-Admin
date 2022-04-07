import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  Outlet
} from "../players/style";
import { Tab} from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions
import {postInstitution} from "../../redux/actions/institutions";

export const AddInstitution: React.FC = () => {
  const dispatch = useDispatch();
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
     const instituteData = {
      InstitutionName: object.InstitutionName,
      Abbreviation: object.Abbreviation,
      InstitutionType: object.InstitutionType,
      Description: object.Description,
      Location: object.Location
     }
     dispatch(postInstitution({instituteData, navigate}))
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
            <FormHolder>
              <Label> NAME OF INSTITUTION</Label>
              <Input
                type="text"
                name="InstitutionName" required
                onChange={(e) => handleChange(e)}
              />
            </FormHolder>
            <FormHolder>
              <Label>ABBREVIATION</Label>
              <Input
                type="text"
                name="Abbreviation" required
                onChange={(e) => handleChange(e)}
              />
            </FormHolder>
            <FormHolder>
              <Label>INSTITUTION TYPE</Label>
              <Input
                type="text"
                name="InstitutionType" required
                onChange={(e) => handleChange(e)}
              />
            </FormHolder>
            <FormHolder>
              <Label>DESCRIPTION</Label>
              <Input
                type="text"
                name="Description" required
                onChange={(e) => handleChange(e)}
              />
            </FormHolder>
            <FormHolder>
              <Label>LOCATION</Label>
              <Input
                type="text"
                name="Location" required
                onChange={(e) => handleChange(e)}
              />
            </FormHolder>
            
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
