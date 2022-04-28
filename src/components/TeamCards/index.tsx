import { useNavigate } from "react-router-dom";
import { Card, CardText, ImgCard, P, SideText } from "./styles";
import TeamImage from "../../assests/dashboard .png";

type TeamCardPropsType = {
  title: string;
  teamId: string;
  TeamName: string;
  Institution: string;
  Category: string;
  TeamLogo: string;
};

function TeamCard({
  title,
  TeamName,
  teamId,
  Institution,
  Category,
  TeamLogo,
}: TeamCardPropsType) {
  const navigate = useNavigate();
  
  const viewPlayers = () => {
    sessionStorage.removeItem("Teamid");
    sessionStorage.removeItem("Teamname");
    sessionStorage.setItem("Teamid", teamId);
    sessionStorage.setItem("Teamname", TeamName);
    navigate("/players");
  };
  
  return (
    <Card onClick={viewPlayers}>
      <ImgCard>
      <img src={!TeamLogo ? TeamImage : TeamLogo} alt={TeamName} />
      </ImgCard>
      <SideText>
        <CardText>{title}</CardText>
        <P>
          {Institution} | {Category}
        </P>
      </SideText>
    </Card>
  );
}

export default TeamCard;
