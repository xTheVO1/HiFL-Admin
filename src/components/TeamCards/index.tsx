import { useNavigate } from "react-router-dom";
import { Card, CardText, ImgCard, P, SideText } from "./styles";


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