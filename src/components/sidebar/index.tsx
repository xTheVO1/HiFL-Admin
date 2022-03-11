import { Container, Header, LogoImg, MenuNavigator, MenuItemLink, MenuItemBottom, ToggleMenu, Signout, Svg} from "./styles";
import logoImg from '../../assests/logo.png';
import { MdDashboard, MdArrowUpward,  MdOutlineLogout, MdClose, MdMenu, MdOutlineSupervisorAccount } from 'react-icons/md';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Aside () {
    const [toggleMenuOpened, setToggleMenuOpened] = useState<boolean>(false)
    const handleToggleMenu = () => setToggleMenuOpened(!toggleMenuOpened)
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear();
        navigate('/')
    }
    
    return (
        <Container menuIsOpen={toggleMenuOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    { toggleMenuOpened ? <MdClose /> : <MdMenu />  }
                </ToggleMenu>
                <LogoImg src={logoImg} alt="Logo Application" />
                {/* <TitleHeader>
                    ADMIN
                </TitleHeader> */}
            </Header>
            <MenuNavigator>
                <MenuItemLink href="/dashboard">
                        <MdDashboard />
                    DASHBOARD
                </MenuItemLink>
                <MenuItemLink href="/team-manager">
                    <MdOutlineSupervisorAccount/>
                    TEAMS
                </MenuItemLink>
                <MenuItemLink href="/teams">
                    <MdArrowUpward />
                    GUIDELINES
                </MenuItemLink>
                <MenuItemLink href="/teams">
                    <MdArrowUpward />
                    SUPPORT
                </MenuItemLink>
            </MenuNavigator>
            <Signout>
            <MenuItemBottom onClick={logout}>
                    <MdOutlineLogout />
                    LOGOUT
                </MenuItemBottom>
            </Signout>
        </Container>
    )
}