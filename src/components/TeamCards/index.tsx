import { useNavigate } from "react-router-dom";
import { Card, CardText, ImgCard, Button } from "./styles";


type TeamCardPropsType = {
    title: string
    teamLogo: string
}

function TeamCard({title, teamLogo}: TeamCardPropsType) {
    const navigate = useNavigate();
    
    const viewPlayers = () => {
        navigate("/players")
    }
    return (
        <Card onClick={viewPlayers}>
               <ImgCard>
               <img src={teamLogo} alt="Team log"/></ImgCard>
                <div>
                    <CardText>{title}</CardText>
                    <Button>Manage </Button>
                </div>
           </Card>
    );
}

export default TeamCard;