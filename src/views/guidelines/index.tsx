import * as React from "react";

// components
import ContentHeader from "../../components/ContentHeader";
import { Container, Content, Card, CreateBtn } from "./styles";

export const Guidelines: React.FC = () => {
  return (
    <Container>
      <div className="header">
        <ContentHeader title="Guidelines">
          Guidelines for Participation in HiFL 2022 Season
        </ContentHeader>
      </div>
      <Content>
        <div className="container">
          <Card>
            Each Team must register a minimum of 23 players and a maximum of 30
            players before the registration deadline.
          </Card>
          <Card>
            If a minimum of 18 players get approved. Any number less than this
            equals automatic disqualification.
          </Card>
          <Card>
            You declare that the information that will be/are provided during
            this registration process is true, accurate and complete.
          </Card>
          <Card>
            You hereby consent for the organisers of HiFL and its affiliates to
            utilize the provided information in line with best practices and for
            the execution of the League.
          </Card>
          <Card>
            <CreateBtn>HiFL Regulations & Guidelines 2022</CreateBtn>
            <CreateBtn>League Guidelines</CreateBtn>
            <CreateBtn>Medical Form</CreateBtn>
            <CreateBtn>COVID-19 Protocol</CreateBtn>
          </Card>
        </div>
      </Content>
    </Container>
  );
};
