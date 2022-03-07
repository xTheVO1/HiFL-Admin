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
    padding: 1rem 1rem;
    display: flex;
    width: 24%;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity .3s;
    margin-bottom: .5rem;
    margin-right: 1rem;
    &:hover{
    }
`
export const ImgCard = styled.div`
    width: 25%;
`
export const CardText = styled.div`
   font-weight: 600;
   transition: opacity .3s;
   &:hover{
   }
`
export const Button = styled.button`
   transition: opacity .3s;
   font-size: .5rem;
   font-weight: 500;
   padding: .2rem 1rem;
   background-color: ${props => props.theme.colors.warning};
   border-radius: 3.5px;
   color: white;
   &:hover{
   }
`