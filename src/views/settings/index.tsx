import React, { useEffect, useState } from "react";
import { Container, Content, Loader } from "./styles";
import { Dispatch } from "redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getleagues } from "../../redux/actions/leagues";
import { getSeasons } from "../../redux/actions/seasons";
import { getleagueStages } from "../../redux/actions/leagues";

// components
import ContentHeader from "../../components/ContentHeader";
import {
  Label,
  Form,
  CreateBtn,
  Section,
  Select,
  FormHolder,
  BtnDiv,
  Input
} from "../players/style";
import { postSettings, getSelectedItem, updateSettings, getSettings, getSingleSettings } from "../../redux/actions/settings";
import { getSports } from "../../redux/actions/sport";
import { Spinner } from "reactstrap";


function Setting() {
  const dispatch: Dispatch<any> = useDispatch()
  const navigate = useNavigate();
  const { id } = useParams();
  // Seasons
  const items = useSelector((state: any) => state.seasons);
  const selected = useSelector((state: any) => state.settings.getItem);
  const setting = useSelector((state: any) => state.settings.singleSettings);
  const seasonLoading = useSelector((state: any) => state.seasons.loading);
  const mainSeasonResult = items && items ? items.seasons : [];
  const leaguesItem = useSelector((state: any) => state.leagues);
  const leaguesResult = leaguesItem && leaguesItem ? leaguesItem.leagues : {};
  const settingResult = setting && setting ? setting.data : {};
  const { leaguesLoading, leagueStagesLoading } = items;
  const [activeSeason, setActiveSeason] = useState();
  const [activeLeague, setActiveLeague] = useState();
  const [url, setUrl] = useState("")
  const sportData = useSelector((state: any) => state.sports.sports)
  const sportLoading = useSelector((state: any) => state.sports.loading)
  const sportResult = sportData && sportData ? sportData : [];
  const leagueStagesResult = leaguesItem && leaguesItem ? leaguesItem.leagueStages : {};
  const [inputObject, setObject]: any = useState({
    CurrentSeason: "",
    CurrentSeasonId: "",
    CurrentLeague: "",
    CurrentStage: "",
    Sport: "",
    LeagueName: "",
    id: ""
  });


  // useEffect(() => {
  //   dispatch(getleagues(activeSeason));
  // }, [dispatch]);


  useEffect(() => {
    dispatch(getSeasons());
    dispatch(getSports());
    setUrl(window.location.pathname)
    if (window.location.pathname === `/edit-setting/${id}`) {
      dispatch(getSingleSettings(id));
      setObject({
        CurrentSeason: settingResult?.CurrentSeason?.SeasonName,
        CurrentSeasonId: settingResult?.CurrentSeason?._id,
        CurrentLeague: settingResult?.CurrentLeague,
        CurrentStage: settingResult?.CurrentStage,
        Sport: settingResult?.Sport,
        LeagueName: settingResult?.CurrentLeagueName,
        id: settingResult?._id
      })
    } else {

    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getleagues(activeSeason));
  }, [activeSeason]);

  useEffect(() => {
    dispatch(getleagueStages(activeLeague));
  }, [activeLeague]);

  const handleChange = (e: any) => {
    e.preventDefault();
    setObject({
      ...inputObject,
      [e.target.name]: e.target.value,
    });
    dispatch(getleagues(inputObject?.CurrentSeason));
  };

  const seasonHandleChange = (e: any) => {
    e.preventDefault();
    setActiveSeason(e.target.value)
  };

  const leagueHandleChange = (e: any) => {
    e.preventDefault();
    setActiveLeague(e.target.value)
  };

  const create = (e: any) => {
    e.preventDefault();
    const details = {
      CurrentSeason: activeSeason,
      CurrentLeague: activeLeague,
      CurrentStage: inputObject.CurrentStage,
      CurrentLeagueName: inputObject.LeagueName,
      Sport: inputObject.Sport
    }
    dispatch(postSettings(details));
  dispatch(getSettings());
  navigate("/settings")
  }

  const goBack = () => {
    navigate("/settings")
  }


  //    /teams
  // sending User ID
  return (
    <Container>
      <ContentHeader title="Settings(s)">
        <CreateBtn className="red" onClick={goBack} >
          GO BACK
        </CreateBtn>
      </ContentHeader>
      <Content>
        {seasonLoading ? <div style={{margin:"3rem auto", textAlign: "center",fontSize: "2rem" }}><Spinner /> </div> :
          <Form>
            <Section>
              <Label>LEAGUE NAME</Label>
              
                <Input
                  name="LeagueName"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
            </Section>
            <Section>
              <FormHolder>
                <Label>SEASON{window.location.pathname === `/edit-setting/${id}` ? <span>{inputObject?.CurrentSeason}</span> : ""}</Label>
                <Select
                  name="CurrentSeasonId"
                  onChange={(e) => seasonHandleChange(e)}
                >
                  <option>Select a Season</option>
                  {seasonLoading ? <Spinner /> :
                    mainSeasonResult?.length === 0 || mainSeasonResult === undefined ? "" :
                      mainSeasonResult && mainSeasonResult?.data?.map((item: any) => (
                        <option value={item._id} key={item.SeasonName}>{item?.SeasonName}</option>
                      ))}
                </Select>
              </FormHolder>
              <FormHolder>
                <Label>LEAGUE </Label>
                <Select
                  name="CurrentLeague"
                  onChange={(e) => leagueHandleChange(e)}
                >
                  <option>Select a League</option>
                  {leaguesLoading ? <Spinner /> :
                    leaguesResult?.map((item: any) => (
                      <option value={item._id} key={item.LeagueName}>{item?.LeagueName}</option>
                    ))}
                </Select>
              </FormHolder>
            </Section>
            <Section>
              <FormHolder>
                <Label>STAGE</Label>
                <Select
                  name="CurrentStage"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Select a Stage</option>
                  {leagueStagesResult?.map((item: any) => (
                    <option value={item._id} key={item.StageName}>{item?.StageName}</option>
                  ))}
                </Select>
              </FormHolder>
              <FormHolder>
              <Label>SPORT</Label>
                        <Select
                          name="Sport"
                          onChange={(e) => handleChange(e)}
                        >
                          <option>Select a Sport</option>
                          {sportLoading ? <Spinner/> :
                           sportResult === [] ? "" :
                           sportResult &&  sportResult?.map((item: any) => (
                            <option value={item._id} key={item._id}>{item?.SportName}</option>
                          ))}
                        </Select>
              </FormHolder>
            </Section>
            <BtnDiv style={{ marginBottom: "2rem" }}>
              <CreateBtn className="red" onClick={(e) => create(e)}
                style={{ color: "white", marginRight: "1rem", float: "right" }} >SAVE</CreateBtn>
            </BtnDiv>
          </Form>
        }
      </Content>

    </Container>
  );
}

export default Setting;