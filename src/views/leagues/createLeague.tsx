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
import { Tab } from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions
import {postLeague} from "../../redux/actions/leagues";

export const AddLeague: React.FC = () => {
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
    const stages = [];
     const data = {
      LeagueName: object.LeagueName,
      Abbreviation: object.Abbreviation,
      Format: object.Format,
      Stages: stages.push(object.stages),
      Seasons: 2022
     }
     dispatch(postLeague(data))
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title="CREATE LEAGUE">
          <Button onClick={() => navigate("/leagues")}>GO BACK</Button>
        </ContentHeader>
        <Tab>
          <Outlet>
            <Form onSubmit={submit}>
              <FormHolder>
                <Label>LEAGUE NAME </Label>
                <Input
                  type="text"
                  name="LeagueName"
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>ABBREVIATION</Label>
                <Input
                  type="text"
                  name="Abbreviation"
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>STAGES</Label>
                <Input
                  type="text"
                  name="Stages"
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>SEASON</Label>
                <Input
                  type="text"
                  name="Seasons"
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
