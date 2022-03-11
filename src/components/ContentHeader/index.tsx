import { ReactNode } from "react";
import { Container, Title, Controllers } from "./styles";

type ContentHeaderPropsType = {
    title: string
    children: ReactNode
}

export default function ContentHeader ({ title, children }: ContentHeaderPropsType) {
    return (
        <Container>
            <Title >
                <h1>{title}</h1>
            </Title>
            <Controllers>
                {children}
            </Controllers>
        </Container>
    )
}