import styled from "styled-components";
import ToggleComponent from "../Toggle";

export const Container = styled.div`
    grid-area: MH;
    // background-color: ${props => props.theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;

    border-bottom: 1px solid ${props => props.theme.colors.tertiary};
`;

export const Profile = styled.div`
    color: ${props => props.theme.colors.white};
    display: flex;
    padding: 1rem 1rem;
`;

export const Welcome = styled.h4`
color:  ${props => props.theme.colors.primary};
margin-right: 1.5rem;
font-size: 1.2rem;
display: flex;
padding-top: 1.7rem;
svg{
    color: ${props => props.theme.colors.tertiary};
    margin-right: .4rem;
}
span{
   background: ${props => props.theme.colors.gray};
    margin-left: 1rem;
    padding: .2px;
    height: 30px;
}
`;

export const Username = styled.div`
display: flex;
.profile-img{
    margin-top: 1rem;
    margin-right: 1rem;
    h1 {
        font-size: 1rem;
        border-radius: 50%;
        background: ${props => props.theme.colors.primary};
        color:white;
        width: 50px;
        height: 50px;
        text-align: center;
        padding: .8em 0em;
        display: inline-block;
    }
}
p{
    font-size: .7rem;
    color:${props => props.theme.colors.gray};
    margin-top: -.5rem;
}
.details{
    color:${props => props.theme.colors.gray};
    padding-top: 1.5rem;
    p{
        text-transform: uppercase;
    }
}
`;

export const Toggle = styled(ToggleComponent)`
    @media(max-width: 600px) {

    }
`;