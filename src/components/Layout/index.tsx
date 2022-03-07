import { Grid } from "./styles";
import MainHeader from "../MainHeader";
import Sidebar from "../sidebar";
import Content from "../Content";

export default function Layout ({ children }: any) {
    return (
        <Grid>
            <MainHeader />
            <Sidebar />
            <Content>
                {children}
            </Content>
        </Grid>
    )
}