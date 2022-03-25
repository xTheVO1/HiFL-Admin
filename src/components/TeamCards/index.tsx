import { useNavigate } from "react-router-dom";
import { Card, CardText, ImgCard, P, SideText } from "./styles";


type TeamCardPropsType = {
    title: string
    teamLogo: string
    teamId: string,
    TeamName: string
}

function TeamCard({title, TeamName, teamId}: TeamCardPropsType) {
    const navigate = useNavigate();
    
    const viewPlayers = () => {
        sessionStorage.removeItem('Teamid');
        sessionStorage.removeItem('Teamname');
        sessionStorage.setItem('Teamid', teamId);
        sessionStorage.setItem('Teamname', TeamName);
        navigate("/players");
    }
    return (
        <Card onClick={viewPlayers}>
               <ImgCard>
               {/* <Img src={teamLogo} alt="Team log"/> */}
               </ImgCard>
                <SideText>
                    <CardText>{title}</CardText>
                    <P>Lorem lorem lorem</P>
                </SideText>
           </Card>
    );
}

export default TeamCard;