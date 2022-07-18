import React, {useEffect} from "react";
import { Table } from "reactstrap";
import moment from "moment";
import { H2 } from "../institutions/styles";

const ViewFixture = ({toggle, fixtures}:any ) => {

    useEffect(() => {

    }, [fixtures]);
    return(
        <Table hover>
            {fixtures && fixtures?.length > 0 ?
            <>
            <thead>
                <tr>
                    <th>#</th>
                    <th>MATCH NO</th>
                    <th >MATCH</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TIME</th>
                </tr>
            </thead>
            <tbody>
                {fixtures && fixtures.map((item: any, index: any) => (
                    <tr key={index} onClick={() => toggle(item)}>
                        <th scope="row">{index + 1}.</th>
                        <td>{item?.MatchNumer}</td>
                        <td>{item?.HomeTeam?.TeamAbbreviation} <strong style={{color: "red"}}>VS</strong> { item?.AwayTeam?.TeamAbbreviation}</td>
                        <td>{item?.MatchStatus}</td>
                        <td>{moment(item?.MatchDate).format("MMM Do YY")}</td>
                        <td>{item?.MatchTime}</td>
                    </tr>
                ))
                }

            </tbody>
            </> : 
            <H2>NO FIXTURE FOUND</H2>}
        </Table>
    )
}

export default ViewFixture;