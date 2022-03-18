import { Container, Title, Controllers } from "./styles";
import {MdPerson} from 'react-icons/md';

type DashboardCardPropsType = {
    title: string;
    figure: number;
}

export default function DashboardCard ({ title, figure }: DashboardCardPropsType) {
    return (
        <Container >
            <Title >
                <MdPerson/>
            </Title>
            <Controllers>
                <h1>{figure}</h1>
                <p>{title}</p>
            </Controllers>
        </Container>
    )
}