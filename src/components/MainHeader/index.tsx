// import { useState } from "react";
import { Container, Welcome, Username, Profile } from "./styles";

export default function MainHeader () {
    // const handleChangeTheme = () => {
    //     setDarkTheme(!darkTheme);
    //     toggleTheme();
    // }

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