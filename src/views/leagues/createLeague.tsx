import React, { useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
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
  Outlet,
  Select,
  Section
} from "../players/style";
import { Tab } from "../../components/tab/style";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";

//actions
import {postLeague, getleagues} from "../../redux/actions/leagues";
import { getSports} from "../../redux/actions/sport";

export const AddLeague: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // states
  const [object, setObject]: any = useState({});
  const sportData = useSelector((state: any) => state.sports)
  const sportLoading = useSelector((state: any) => state.sports.loading)
  const sportResult = sportData && sportData ? sportData.sports : [];

  React.useEffect(() => {
    dispatch(getSports());

  }, [dispatch]);
  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...object,
      [e.target.name]: e.target.value,
    });
  };
  
  const submit = (e: any) => {
    e.preventDefault();
     const data = {
      LeagueName: object.LeagueName,
      Abbreviation: object.Abbreviation,
      Format: object.Format,
      Season: id,
      LeagueLogo: "string",
      Sport: object.Sport,
      Settings: {
        RegistrationOpen: true,
        LeagueStatus: "OPEN",
        props: {}
      },
      Finalists: {
        Winner: "",
        SecondPlace:"",
       ThirdPlace:"",
       FourthPlace:""
      }

     }
     dispatch(postLeague(data));
     navigate(`/seasons/${id}`);
     dispatch(getleagues(id))
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
              <Section>
                  <Label>SPORT</Label>
                  <Select
                    name="Sport"
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Select a Sport</option>
                    {sportLoading ? Loader :
                      sportResult &&  sportResult.map((item: any) => (
                      <option value={item._id} key={item._id}>{item?.SportName}</option>
                    ))}
                  </Select>
                    </Section>
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
