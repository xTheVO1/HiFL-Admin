import {MdNotifications, MdHome} from 'react-icons/md'
import { Container, Welcome, Username, Profile } from "./styles";

export default function MainHeader () {
    const teamName = sessionStorage.getItem('Teamname');
    const data:any = sessionStorage.getItem("userData");
    const user = JSON.parse(data);

    return (
        <Container>
            <div></div>
            {/* <Toggle checked={darkTheme} labelLeft="Light" labelRight="Dark" onChange={handleChangeTheme}/> */}
            <Profile>
            {teamName ? <Welcome><MdHome/> teamName  <span></span></Welcome> : ""}
                <Welcome><MdNotifications/> NOTIFICATIONS<span></span></Welcome>
                <Username>
                   <div className="profile-img">
                       <h1><span>{user.Firstname.charAt(0) + " " + user.Lastname.charAt(0)}</span></h1>
                       </div> 
                   <div className="details">
                       <h4>{user.Firstname + " " + user.Lastname}</h4>
                       <p>{user.Role}</p>
                   </div>
                </Username>
            </Profile>
        </Container>
    )
}