import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
  const { id } = useParams();

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
      Seasons: id,
      LeagueLogo: "string",
      Sport: "string",
      Settings: {
        RegistrationOpen: true,
        LeagueStatus: "OPEN",
        "props": {}
      },
      Finalists: {
        Winner: "",
        SecondPlace:"",
       ThirdPlace:"",
       FourthPlace:""
      }

     }
     dispatch(postLeague(data))
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
              <FormHolder>
                <Label>LEAGUE NAME </Label>
                <Input
                  type="text"
                  name="LeagueName" required
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
