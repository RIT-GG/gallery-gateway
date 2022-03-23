import React from "react"
import { Container } from "reactstrap"
import ScholarshipCard from "./ScholarshipCard";

function Scholarships(props) {
    const { scholarships } = props

    return (
        <Container>
            <h1 className="mt-3 mb-5">Scholarships</h1>
            {!Array.isArray(scholarships) || scholarships.length === 0 ? (
                <p>There are no scholarships to apply to</p>
            ) : (
                <React.Fragment>
                    {scholarships.map(scholarship => <ScholarshipCard scholarship={scholarship} />)}
                </React.Fragment>
            )}
        </Container>
    )
}

export default Scholarships;