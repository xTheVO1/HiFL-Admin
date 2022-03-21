import styled from "styled-components";
import ToggleComponent from "../Toggle";

export const Container = styled.div`
    grid-area: MH;
    background-color: ${props => props.theme.colors.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 10px;

    border-bottom: 1px solid #FFB422;
`;

export const Profile = styled.div`
    color: ${props => props.theme.colors.white};
    display: flex;
    padding: 1rem 1rem;
`;

export const Welcome = styled.h4`
color: #000292;
margin-right: 1.5rem;
font-size: 1.2rem;
display: flex;
padding-top: 1.7rem;
svg{
    color: #FFB422;
    margin-right: .4rem;
}
span{
   background: #C7C7C7;
    margin-left: 1rem;
    padding: .2px;
    height: 30px;
}
`;

export const Username = styled.div`
display: flex;
.profile-img{
    background: red;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-top: 1rem;
    margin-right: 1rem;

}
p{
    font-size: .7rem;
    color:#C7C7C7;
    margin-top: -.5rem;
}
.details{
    padding-top: 1.5rem;
}
`;

export const Toggle = styled(ToggleComponent)`
    @media(max-width: 600px) {

    }
`;