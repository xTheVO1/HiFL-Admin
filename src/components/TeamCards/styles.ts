import styled from "styled-components";

export const Container = styled.div`
    grid-area: CT;
    background-color: ${props => props.theme.colors.primary};
    padding: 20px;
    height: calc(100vh - 80px);
    overflow-y: scroll;
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.secondary};
    }
`;
export const Card = styled.div`
    background: ${props => props.theme.colors.secondary};
    padding: 2.5rem 1rem;
    display: flex;
    width: 30%;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity .3s;
    margin-bottom: .5rem;
    margin-right: 1rem;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.08);
    &:hover{
    }
`
export const ImgCard = styled.div`
    width: 80px;
    height: 80px;
    background: red;
    border-radius: 50%;
    margin-right: 1rem;
`
export const SideText = styled.div`
    width: 69%;
`
export const Img = styled.img`
    width: 100%;
    object-fit: cover;
    
`

export const CardText = styled.p`
   font-weight: 700;
   font-size: 1.2rem;
   width: 97%;
   line-break: anywhere;
   margin-bottom: .2rem;
   transition: opacity .3s;
   padding-top: 1rem;
   &:hover{
   }
`
export const P = styled.p`
   font-size: .8rem;
   font-weight: 100;
   &:hover{
   }
`