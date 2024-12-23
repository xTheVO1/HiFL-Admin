import styled from "styled-components";

export const Container = styled.button`
    width: 100%;

    margin: 7px 0;
    padding: .4rem 1.5rem;
    font-weight: bold;
    font-size: 14px;
    color: white;
    background-color: ${props => props.theme.colors.warning};
    background:#000229;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }
`;