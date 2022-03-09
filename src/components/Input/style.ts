import styled from "styled-components";

export const Container = styled.input`
    width: 100%;

    margin: 7px 0;
    padding: 14px;

    border-radius: 5px;

    border: 1px solid ${props => props.theme.colors.gray};
`;