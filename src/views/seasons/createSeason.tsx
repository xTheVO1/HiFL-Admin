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
    const seasonData = {
      SeasonName: object.SeasonName,
      SeasonYear: object.Season,
      Leagues: [{}]
     }
     dispatch(postSeason({seasonData, navigate}))
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title="CREATE SEASON">
          <Button onClick={() => navigate("/seasons")}>GO BACK</Button>
        </ContentHeader>
        <Tab>
          <Outlet>
            <Form onSubmit={submit}>
              <FormHolder>
                <Label>SEASON NAME </Label>
                <Input
                  type="text"
                  name="SeasonName"
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>SEASON YEAR</Label>
                <Input
                  type="number"
                  name="Season"
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
