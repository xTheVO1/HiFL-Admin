import * as React from "react"

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Card} from "./styles";

export const Guidelines: React.FC = () => {

  return (
    <Container>
        <div className="header">
            <ContentHeader title="Guidelines">
            Guidelines for Participation in HiFL 2022  Season
            </ContentHeader>
        </div>
      <Content>
            <div className="container">
            <Card>
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            </Card>
            <Card>
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            </Card> 
            <Card>
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            Guidelines for Participation in HiFL 2022  Season
            </Card>
            </div>
      </Content>
    </Container>
  )
}