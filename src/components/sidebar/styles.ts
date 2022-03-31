import styled, { css } from "styled-components";
import Aside from "./index";

type AsideTypeProps = {
    menuIsOpen: boolean
}

export const Container = styled.div<AsideTypeProps>`
    grid-area: AS;
    background-color: #000292;
    padding-left: 20px;
    border-right: 1px solid ${props => props.theme.colors.gray};
    position: relative;
    @media(max-width: 600px) {
        padding-left: 8px;
        position: fixed;
        z-index: 2;
        width: 170px;

        height: ${props => props.menuIsOpen ? '100vh' : '80px'};
        overflow: hidden;

        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        `};
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    height: 80px;
`;

export const LogoImg  = styled.img`

    @media(max-width: 600px) {
        display: none;
    }
`;

export const TitleHeader = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 15px;
    @media(max-width: 600px) {
        display: none;
        width: 100px;
        font-size: 15px;
        margin-left: 5px;
    }
`;

export const MenuNavigator  = styled.nav`
    display: flex;
    flex-direction: column;
    justify-contenr: center;
    margin-top: 30px;
`;

export const MenuItemBottom = styled.button`
    font-size: 20px;
    display: flex;
    align-items: center;
    color: white;
    margin: 10px 0;
    background: none;
    padding: .5rem 1rem;
    &:hover {
     background: white;
     color:#000292;
 }
    transition: opacity .3s;
    > svg {
        margin-right: 5px;
    }
    & svg{
        color: #FFB422;
    };
`;

export const MenuItemLink = styled.a`
    display: flex;
    align-items: center;
     color:white;
    text-decoration: none;
    font-size: 20px;
    margin: 5px 0;
    padding: .5rem .3rem;
    transition: opacity .3s;
    &:hover {
        background: white;
        color:#000292;
    }
    > svg {
        margin-right: 5px;
    }
    & svg{
        color: #FFB422;
    };
`;

export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 22px;
    // background-color: ${props => props.theme.colors.warning};
    transition: opacity .3s;
    display: none;
    @media (max-width: 600px) {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const Signout = styled.span`
   position: fixed;
   bottom: 20px;
  
`;
export const SideImage = styled.div`
  width: 80%;
  margin: 1rem auto;
  margin-top: 2rem;
`;
export const Image = styled.img`
width: 100%;
object-fit: contain;
`
export const Icon = styled.svg`
  background: red;
`;
export const Svg = styled(Aside)`
  
  `