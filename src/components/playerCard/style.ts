import styled from "styled-components";


export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  justify-content: space-between;
  div .complete{
      background: #03A430;
      color: white
    }
    div .incomplete{
      background: #FFD583;
    color: black;
  }
  div .red{
    background: red;
  color: white;
}
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
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 2rem;
    img{
        width: 100%;
        height: 100%;
    object-fit: cover;
    border-radius: 50%;
    }
    @media(max-width: 700px) {
        margin-right: 1rem;
    }
`
export const CardText = styled.div`
margin-top: .4rem;
   font-weight: 600;
   padding-top: .5rem;
   transition: opacity .3s;
   color:${props => props.theme.colors.white};
   &:hover{
   }
`
export const Btn = styled.div`
    padding: .4rem 2rem;
    border-radius: 30px;   
    font-weight: 200;
    color: ${props => props.theme.colors.white};
   margin-top: 1.2rem;
   cursor: pointer;
   @media(max-width: 930px) {
    display: none;
}
@media(min-width: 1000px) {
    font-weight: 500;
}
`;
export const Icon = styled.div`
    color: ${props => props.theme.colors.white};
    font-size: 2rem;
    margin-top: 1rem;
    @media(max-width: 700px) {
        font-size: 1rem;
    }
`;
export const Small = styled.p`
    color: ${props => props.theme.colors.white};
    font-size: .8rem;
    `;
    export const Div = styled.div`
    display: flex;
    `;
    export const SideText = styled.div`
    @media(max-width: 700px) {
        width: 70%;
    }

    `;