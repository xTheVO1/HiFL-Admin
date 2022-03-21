import {MdNotifications, MdHome} from 'react-icons/md'
import { Container, Welcome, Username, Profile } from "./styles";

export default function MainHeader () {

    return (
        <Container>
            <div></div>
            {/* <Toggle checked={darkTheme} labelLeft="Light" labelRight="Dark" onChange={handleChangeTheme}/> */}
            <Profile>
                <Welcome><MdHome/> FUTA TIGERS <span></span></Welcome>
                <Welcome><MdNotifications/> NOTIFICATIONS<span></span></Welcome>
                <Username>
                   <div className="profile-img"></div> 
                   <div className="details">
                       <h5>VICTOR OLAITAN</h5>
                       <p>TEAM MANAGER</p>
                   </div>
                </Username>
            </Profile>
        </Container>
    )
}