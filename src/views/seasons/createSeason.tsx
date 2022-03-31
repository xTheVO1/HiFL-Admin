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
  Outlet
} from "../players/style";
import { Tab } from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";

//actions
import {postSeason} from "../../redux/actions/seasons"
export const AddSeason: React.FC = () => {
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
    const stages = []
    const data = {
      SeasonName: object.SeasonName,
      Abbreviation: object.Abbreviation,
      Format: object.Format,
      Stages: stages.push(object.stages),
      Seasons: object.Season
     }
     dispatch(postSeason(data))
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title="CREATE LEAGUE">
          <Button onClick={() => navigate("/seasons")}>GO BACK</Button>
        </ContentHeader>
        <Tab>
          <Outlet>
            <Form onSubmit={submit}>
              <FormData>
                <Label>SEASON NAME </Label>
                <Input
                  type="text"
                  name="SeasonName"
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
                <Label>FORMAT</Label>
                <Input
                  type="text"
                  name="format"
                  onChange={(e) => handleChange(e)}
                />
              </FormData>
              <FormData>
                <Label>SEASON</Label>
                <Input
                  type="number"
                  name="Season"
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
