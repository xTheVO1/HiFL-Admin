import {
  Container,
  Header,
  LogoImg,
  MenuNavigator,
  MenuItemLink,
  ToggleMenu,
  // Signout,
} from "./styles";
import logoImg from "../../assests/logo.png";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teamManagerMenu, AdminMenu, SuperAdminMenu, AccreditorMenu } from "../../utils/menu";

export default function Aside() {
    const [toggleMenuOpened, setToggleMenuOpened] = useState<boolean>(false)
    const handleToggleMenu = () => setToggleMenuOpened(!toggleMenuOpened)
    const navigate = useNavigate()
    const data: any = sessionStorage.getItem("userData");
    const user = JSON.parse(data);
    const logout = () => {
        sessionStorage.clear();
        navigate('/')
    }

    const empty = () => {
     
  }
  return (
    <Container menuIsOpen={toggleMenuOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuOpened ? <MdClose /> : <MdMenu />}
        </ToggleMenu>
        <LogoImg src={logoImg} alt="Logo Application" />
      </Header>
      <MenuNavigator>
        {user.Role === "TeamManager" ? (
          <>
            {" "}
            {teamManagerMenu &&
              teamManagerMenu.map((menu) => (
                <MenuItemLink href={menu.href} key={menu.id} onClick={menu.title === "LOGOUT" ? logout : empty}>
                  {menu.icon}
                  {menu.title}
                </MenuItemLink>
              ))}{" "}
          </>
        ) : (
          ""
        )}
        {user.Role === "Admin"
          ? AdminMenu &&
            AdminMenu.map((menu) => (
              <MenuItemLink href={menu.href} key={menu.id} onClick={menu.title === "LOGOUT" ? logout : empty}>
                {menu.icon}
                {menu.title}
              </MenuItemLink>
            ))
          : ""}
        {user.Role === "Accreditor"
          ? AccreditorMenu &&
          AccreditorMenu.map((menu) => (
              <MenuItemLink href={menu.href} key={menu.id} onClick={menu.title === "LOGOUT" ? logout : empty} >
                {menu.icon}
                {menu.title}
              </MenuItemLink>
            ))
          : ""}
          {user.Role === "SuperAdmin"
          ? SuperAdminMenu &&
            SuperAdminMenu.map((menu) => (
              <MenuItemLink onClick={menu.title === "LOGOUT" ? logout : empty} href={menu.href} key={menu.id} >
                {menu.icon}
                {menu.title}
              </MenuItemLink> 
            ))
          : ""}
      </MenuNavigator>
      {/* <Signout>
        <MenuItemBottom onClick={logout}>
          <MdOutlineLogout />
          LOGOUT
        </MenuItemBottom>
      </Signout> */}
    </Container>
  );
}
