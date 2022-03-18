import { Container, Header, LogoImg, MenuNavigator, MenuItemLink, MenuItemBottom, ToggleMenu, Signout, SideImage, Image} from "./styles";
import logoImg from '../../assests/logo.png';
import dashboard from '../../assests/dashboard .png';
import { MdDashboard, MdArrowUpward,  MdOutlineLogout, MdClose, MdMenu, MdOutlineSupervisorAccount } from 'react-icons/md';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamManagerMenu } from "../../utils/menu";

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
                {teamManagerMenu && teamManagerMenu.map(menu => (
                <MenuItemLink href={menu.href} key={menu.id}>
                        {menu.icon}
                    {menu.title}
                </MenuItemLink>
                ))}
            </MenuNavigator>
            <SideImage>
                <Image src={dashboard} alt="dashboard "/>
            </SideImage>
            <Signout>
            <MenuItemBottom onClick={logout}>
                    <MdOutlineLogout />
                    LOGOUT
                </MenuItemBottom>
            </Signout>
        </Container>
    )
}