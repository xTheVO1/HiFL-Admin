import { Container, Header, LogoImg, MenuNavigator, MenuItemLink, MenuItemBottom, ToggleMenu, Signout} from "./styles";
import logoImg from '../../assests/logo.png';
import { MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp, MdClose, MdMenu } from 'react-icons/md';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Aside () {
    const [toggleMenuOpened, setToggleMenuOpened] = useState<boolean>(false)
    const handleToggleMenu = () => setToggleMenuOpened(!toggleMenuOpened)
    const navigate = useNavigate()

    const logout = () => {
        // localStorage.removeItem('@minha-carteira:logged')
        navigate('/login')
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
                    Dashboard
                </MenuItemLink>
                <MenuItemLink href="/team-manager">
                    <MdArrowDownward />
                    Teams
                </MenuItemLink>
                <MenuItemLink href="/teams">
                    <MdArrowUpward />
                    Guidelines
                </MenuItemLink>
                <MenuItemLink href="/teams">
                    <MdArrowUpward />
                    Support
                </MenuItemLink>
            </MenuNavigator>
            <Signout>
            <MenuItemBottom onClick={logout}>
                    <MdExitToApp />
                    Logout
                </MenuItemBottom>
            </Signout>
        </Container>
    )
}