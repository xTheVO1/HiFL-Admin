import styled from "styled-components";

type TitleContainerTypeProps = {
}

export const Container = styled.div`
    width: 100%;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 1.5rem 1rem;
    border-bottom: 6px solid #F8F8F8;
`;

export const Title = styled.div<TitleContainerTypeProps>`
    > h1 {
            color: ${props => props.theme.colors.white};
    }

`;

export const Controllers = styled.div`
    display: flex;
    align-items: center;
`;