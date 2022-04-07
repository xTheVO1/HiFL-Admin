import styled from "styled-components";

export const Container = styled.input`
    width: 100%;

    margin: 5px 0;
    padding: 6px;

    border-radius: 0px;

    border: 1px solid ${props => props.theme.colors.gray};
`;