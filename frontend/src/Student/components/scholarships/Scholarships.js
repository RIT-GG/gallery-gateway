import React, { useState } from "react"
import { Alert, Col, Container, Row } from "reactstrap"
import { Link } from "react-router-dom"
import ScholarshipCard from "../../containers/ScholarshipCard";
import CreatePortfolioEntryCard from "../portfolio/CreatePortfolioEntryCard";

function Scholarships(props) {
    const { scholarships, createScholarshipSubmission } = props
    // The portfolio period and portfolio id are provided via route params
    const path = new URLSearchParams(window.location.search)
    const portfolioId = path.get("portfolioId")
    const portfolioPeriodId = path.get("portfolioPeriodId")

    const [essayPath, setEssayPath] = useState("")

    // Handle rendering inavlid or no scholarships
    if (!Array.isArray(scholarships) || scholarships.length === 0) {
        return (
            <Container>
                <h1 className="mt-3 mb-5">Scholarships</h1>
                <p>There are no scholarships to apply to.</p>
            </Container>
        )
    }

    /**
     * Saves the uploaded PDF on the server and then saves the link to the stored in the server in component state
     * @param {string} _ The action performed, since we only render the "other" entry type this will always be "file"
     * @param {*} file The pdf file submitted by the users
     */
    async function handleEssayUpload(_, file){
        const pdf_upload_response = await props.handlePDFUpload(file)
        const pdf_path = pdf_upload_response.path
        // Dont do anything if pdf upload failed
        if(typeof pdf_path !== "string") return
        setEssayPath(pdf_path)
    }

    function SubmissionAlert() {
        if (portfolioId) return <React.Fragment></React.Fragment>

        // Build the message for which pieces of required data are missing
        return (
            <Alert color="warning">
                You have not provided a portfolio to apply to scholarships. You may still view scholarships but you cannot apply. <Link to="/portfolios">Select a portfolio to apply.</Link>
            </Alert>
        )
    }

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h1 className="mt-3 mb-5">Scholarships</h1>
                    <SubmissionAlert />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <h3>Upload Essay</h3>
                    <CreatePortfolioEntryCard type="other" name="essayPath" handleChange={handleEssayUpload}/>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    {scholarships.map(scholarship => (
                        <ScholarshipCard
                            disabled={!portfolioId || essayPath === "" /* Disabled if no portfolio id provided OR no PDF has been uploaded */}
                            key={`scholarship.${scholarship.id}`}
                            scholarship={scholarship}
                            portfolioId={parseInt(portfolioId)}
                            portfolioPeriodId={parseInt(portfolioPeriodId)}
                            essayPath={essayPath}
                        />
                    )
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default Scholarships;