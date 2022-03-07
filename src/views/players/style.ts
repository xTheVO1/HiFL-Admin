import styled from "styled-components";


export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const Container = styled.div`
    
`;
export const Card = styled.div`
    background: ${props => props.theme.colors.secondary};
    padding: 1rem 2rem;
    display: flex;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: opacity .3s;
    margin-bottom: .5rem;
    &:hover{
    }
`

export const ImgCard = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: red;
    margin-right: 2rem;

`
export const CardText = styled.div`
   font-weight: 600;
   padding-top: .5rem;
   transition: opacity .3s;
   color:${props => props.theme.colors.white};
   &:hover{
   }
`
export const Btn = styled.div`
    padding: .4rem 1rem;
    border-radius: 15px;
    background: #eef4ff;
    font-weight: 200;
    color: ${props => props.theme.colors.white};
   margin-top: .5rem;

`;
export const Icon = styled.div`
    color: ${props => props.theme.colors.white};
    font-size: 2rem;
   margin-top: .5rem;

`;
export const Small = styled.p`
    color: ${props => props.theme.colors.white};
    `;
    export const Div = styled.div`
    display: flex;
    `;