import React from "react"
import { Alert, Container } from "reactstrap"
import ScholarshipCard from "./ScholarshipCard";

function Scholarships(props) {
    const { scholarships } = props
    const path = new URLSearchParams(window.location.search);

    const portfolioPeriodId = path.get("portfolioPeriodId")
    const portfolioId = path.get("portfolioId")

    // Handle rending inavlid or no scholarships
    if (!Array.isArray(scholarships) || scholarships.length === 0) {
        return (
            <Container>
                <h1 className="mt-3 mb-5">Scholarships</h1>
                <p>There are no scholarships to apply to</p>
            </Container>
        )
    }

    function SubmissionAlert(){
        if( portfolioPeriodId && portfolioId) return <React.Fragment></React.Fragment>

        let message = "You have not provided a "
        if( !portfolioPeriodId){message += "portfolio period "}
        if( !portfolioId){
            if(!portfolioPeriodId) message += "or a "
            message += "portfolio "
        }
        message += "to apply to scholarships. You may still view scholarships but you cannot apply."

        return (
            <Alert color="warning">
                {message}
            </Alert>
        )
    }

    return (
        <Container>
            <h1 className="mt-3 mb-5">Scholarships</h1>
            <SubmissionAlert />
            <React.Fragment>
                {scholarships.map(scholarship => <ScholarshipCard scholarship={scholarship} disabled={!portfolioPeriodId || !portfolioId} key={`scholarship.${scholarship.id}`} />)}
            </React.Fragment>
        </Container>
    )
}

export default Scholarships;