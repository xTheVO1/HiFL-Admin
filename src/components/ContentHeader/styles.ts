import styled from "styled-components";

type TitleContainerTypeProps = {
    lineColor: string
}

export const Container = styled.div`
    width: 100%;
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    background: white;
    padding: 1.5rem 1rem;
    margin-bottom: 25px;
    border-radius: 5px;
`;

export const Title = styled.div<TitleContainerTypeProps>`
    > h1 {
            color: ${props => props.theme.colors.white};
    }

    &::after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 3px solid ${props => props.lineColor}
    }
`;

export const Controllers = styled.div`
    display: flex;
    align-items: center;
`;