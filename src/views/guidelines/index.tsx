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
          <Card>School Portal Address must be a .edu.ng domain.</Card>
          <Card>
            Please refer to the documents below for further information.
          </Card>
          <Card>
            Support Issues will ONLY be treated via email to
            techsupport@hiflng.com
          </Card>

          <Card>
            <CreateBtn
              onClick={() =>
                (window.location.href =
                  "https://prod-hiv.fra1.cdn.digitaloceanspaces.com/hifl-fileserver/docs/HiFL_GAME_REGULATIONS_2022.pdf;")
              }
            >
              HiFL 2022 Regulations
            </CreateBtn>{" "}
            <CreateBtn
              onClick={() =>
                (window.location.href =
                  "https://prod-hiv.fra1.cdn.digitaloceanspaces.com/hifl-fileserver/docs/HiFL_2022_Registration_Guidelines_v.05.pdf")
              }
            >
              HiFL 2022 Registration Guidelines
            </CreateBtn>
          </Card>
          <Card>
            <CreateBtn
              onClick={() =>
                (window.location.href =
                  "https://prod-hiv.fra1.cdn.digitaloceanspaces.com/hifl-fileserver/docs/HIFL_MEDICAL_CLEARANCE_FORM.pdf")
              }
            >
              Medical Clearance Template
            </CreateBtn>

            <CreateBtn
              onClick={() =>
                (window.location.href =
                  "https://prod-hiv.fra1.cdn.digitaloceanspaces.com/hifl-fileserver/docs/HiFL_2022_Covid_Protocol.pdf")
              }
            >
              HiFL 2022 COVID-19 Protocol
            </CreateBtn>
          </Card>
        </div>
      </Content>
    </Container>
  );
};
