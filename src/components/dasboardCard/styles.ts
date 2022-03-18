import styled from "styled-components";

type TitleContainerTypeProps = {
}

export const Container = styled.div`
    width: 32%;
    padding: 3rem 1rem;
    display: flex;
    justify-content: left;
    background:#FCFCFC;
`;

export const Title = styled.div<TitleContainerTypeProps>`
   color: #FFB422;
   font-size: 2rem;
   height: 60px;
   width:60px;
   text-align: center;
   border-radius: 50%;
   border: 3px solid  #FFD583;
   margin-right: 2rem;
margin-left: 2rem;
`;

export const Controllers = styled.div`
    align-items: center;
    color:#000292;
    p{
        font-size: .8rem;
        font-weight: 400;
        margin-top: -1rem;
    }
`;