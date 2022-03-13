import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import SinglePortfolioModal from "../../../Student/components/SinglePortfolioModal";


function PortfolioPeriodPortfoliosTab(props) {
    const { portfolioPeriod } = props
    const [active_portfolio_id, setActivePortfolioId] = useState("");

    if (portfolioPeriod && Array.isArray(portfolioPeriod.portfolios) && portfolioPeriod.portfolios.length > 0) {
        return (
            <Container fluid>
                <Row className={"d-none d-lg-flex mt-5"}>
                    <Col xs={4} className=" h5">
                        Title
                    </Col>
                    <Col xs={4} className=" h5">
                        Artist
                    </Col>
                    <Col xs={4} className="d-flex justify-content-end h5">
                        View
                    </Col>
                </Row>
                {portfolioPeriod.portfolios.map((portfolio, i) => {
                    return (
                        <Row className="my-3 p-3 border rounded">
                            <Col xs={6} lg={4} className="d-flex flex-column flex-lg-row align-items-lg-center">
                                <span className="d-lg-none text-muted">Title</span>
                                {portfolio.title}
                            </Col>
                            <Col xs={6} lg={4} className="d-flex flex-column flex-lg-row align-items-lg-center">
                                <span className="d-lg-none text-muted">Artist</span>
                                {portfolio.studentUsername}
                            </Col>
                            <Col xs={12} lg={4} className="d-flex justify-content-lg-end mt-3 mt-lg-0">
                                <button
                                    className="btn btn-primary w-100"
                                    onClick={() => { setActivePortfolioId(portfolio.id) }}
                                >
                                    View Portfolio
                                </button>
                            </Col>
                            <SinglePortfolioModal
                                isOpen={portfolio.id === active_portfolio_id}
                                toggle={() => { setActivePortfolioId("") }}
                                portfolio={portfolio}
                            />
                        </Row>
                    )
                })}
            </Container>
        )
    }
    return (
        <Container fluid>
            <Row>
                <Col xs={12}>

                </Col>
            </Row>
        </Container>
    )
}

export default PortfolioPeriodPortfoliosTab;