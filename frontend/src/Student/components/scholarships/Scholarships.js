import React from "react"
import { Alert, Container } from "reactstrap"
import {Link} from "react-router-dom"
import ScholarshipCard from "../../containers/ScholarshipCard";

function Scholarships(props) {
    const { scholarships, createScholarshipSubmission } = props
    // The portfolio period and portfolio id are provided via route params
    const path = new URLSearchParams(window.location.search)
    const portfolioId = path.get("portfolioId")
    const portfolioPeriodId = path.get("portfolioPeriodId")

    // Handle rendering inavlid or no scholarships
    if (!Array.isArray(scholarships) || scholarships.length === 0) {
        return (
            <Container>
                <h1 className="mt-3 mb-5">Scholarships</h1>
                <p>There are no scholarships to apply to.</p>
            </Container>
        )
    }

    function SubmissionAlert(){
        if(portfolioId) return <React.Fragment></React.Fragment>

        // Build the message for which pieces of required data are missing
        return (
            <Alert color="warning">
                You have not provided a portfolio to apply to scholarships. You may still view scholarships but you cannot apply. <Link to="/portfolios">Select a portfolio to apply.</Link>
            </Alert>
        )
    }

    return (
        <Container>
            <h1 className="mt-3 mb-5">Scholarships</h1>
            <SubmissionAlert />
            <React.Fragment>
                {scholarships.map(scholarship => (
                <ScholarshipCard 
                    disabled={!portfolioId} 
                    key={`scholarship.${scholarship.id}`} 
                    scholarship={scholarship} 
                    portfolioId={parseInt(portfolioId)}
                    portfolioPeriodId={parseInt(portfolioPeriodId)}
                />
                )
                )}
            </React.Fragment>
        </Container>
    )
}

export default Scholarships;