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
import {postLeagueStage, getleague} from "../../redux/actions/leagues";
import { getTeams} from "../../redux/actions/teams";

export const AddLeagueStage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // states
  const [object, setObject]: any = useState({});
  const teamData = useSelector((state: any) => state.team)
  const teamLoading = useSelector((state: any) => state.sports.loading)
  const teamResult = teamData && teamData ? teamData.team : [];

  React.useEffect(() => {
    dispatch(getTeams());

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
    const Team: [] = [];
     const data = {
      StageName: object.StageName,
      League: id,
      NoOfTeams: object.NoOfTeams,
      OrderNumber: object.OrderNumber,
      Teams : Team.concat(object.Teams),
      ActiveStage: object.ActiveStage === "OPENED" ? true : false,
      Fixtures: []
     }
     dispatch(postLeagueStage(data));
     dispatch(getleague(id))
     navigate(`/leagues/${id}`);
  }

  return (
    <Container>
      <Content>
        <ContentHeader
          title="CREATE LEAGUE">
          <Button onClick={() => navigate(`/leagues/${id}`)}>GO BACK</Button>
        </ContentHeader>
        <Tab>
          <Outlet>
            <Form onSubmit={submit}>
              <FormHolder>
                <Label>STAGE NAME </Label>
                <Input
                  type="text"
                  name="StageName" required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>NO OF TEAMS</Label>
                <Input
                  type="number"
                  name="NoOfTeams" required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>ORDER NUMBER</Label>
                <Input
                  type="number"
                  name="OrderNumber" required
                  onChange={(e) => handleChange(e)}
                />
              </FormHolder>
              <FormHolder>
                <Label>REGISTRATION STATUS</Label>
                <Select
                  name="ActiveStage"
                  onChange={(e) => handleChange(e)}
                   >
                    <option value="OPENED">OPENED</option>
                    <option value="CLOSED">CLOSED</option>
                    </Select>
              </FormHolder>
              <Section>
                  <Label>TEAMS</Label>
                  <Select
                    name="Teams"
                    onChange={(e) => handleChange(e)}
                  >
                    <option>Select a Team</option>
                    {teamLoading ? Loader :
                      teamResult &&  teamResult.map((item: any) => (
                      <option value={item._id} key={item._id}>{item?.TeamName}</option>
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
