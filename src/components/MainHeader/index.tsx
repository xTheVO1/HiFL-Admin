import { useState } from "react";
import { Container, Welcome, Username, Profile, Toggle } from "./styles";
import { useTheme } from "../../hooks/theme";

export default function MainHeader () {
    const { toggleTheme, theme } = useTheme()

    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false)

    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    return (
        <Container>
            <div></div>
            {/* <Toggle checked={darkTheme} labelLeft="Light" labelRight="Dark" onChange={handleChangeTheme}/> */}
            <Profile>
                <Welcome>Gabriel Valin</Welcome>
                <Username>
                    Role
                </Username>
            </Profile>
        </Container>
    )
}