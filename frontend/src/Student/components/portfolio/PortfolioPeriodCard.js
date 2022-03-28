import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Badge } from 'reactstrap'
import moment from 'moment'
import Moment from 'react-moment'

const Card = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

// NOTE: Only 1 child should be provided
const FormattedDate = (props) => (
    <Moment
        title={moment(props.children).format('MMMM D, YYYY hh:mm:ss a')}
        format='MMMM D, YYYY'
    >
        {props.children}
    </Moment>
)

function PortfolioPeriodCard(props) {
    const {portfolioPeriod, hasSubmitted, portfolioId} = props

    const {
        id,
        name,
        description,
        startDate,
        endDate,
        judgingStartDate,
        judgingEndDate
    } = portfolioPeriod

    const renderBody = () => {

        return (
            <Row>
                <Col xs='12' md='6' className="order-1">
                    <h4>Name</h4>
                    <p>{name || "Untitled"}</p>
                </Col>
                <Col xs='12' md='6' className="order-2">
                    <h4>Description</h4>
                    <p>{description || "N/A"}</p>
                </Col>
                <Col xs='12' md='6' className="order-3">
                    <h4>Submission Start Date</h4>
                    <p><FormattedDate>{startDate}</FormattedDate></p>
                </Col>
                <Col xs='12' md='6' className="order-4 order-md-5">
                    <h4>Submission End Date</h4>
                    <p><FormattedDate>{endDate}</FormattedDate></p>
                </Col>
                <Col xs='12' md='6' className="order-5 order-md-4">
                    <h4>Judging Start Date</h4>
                    <p><FormattedDate>{judgingStartDate}</FormattedDate></p>
                </Col>
                <Col xs='12' md='6' className="order-6">
                    <h4>Judging End Date</h4>
                    <p><FormattedDate>{judgingEndDate}</FormattedDate></p>
                </Col>
            </Row>
        )
    }

    const renderButtons = () => {
        return (
            <Row>
                <Col>
                    <Button
                        color='primary'
                        style={{ cursor: 'pointer' }}
                        tag={Link}
                        to={`/portfolios/create?portfolioPeriodId=${id}`}
                        block
                        outline
                        disabled={hasSubmitted === true}
                    >
                        {hasSubmitted === false ? "Create portfolio" : "You've already submitted a portfolio"}
                    </Button>
                </Col>
            </Row>
        )
    }

    return (
        <Card>
            <h2>{name}</h2>
            {renderBody()}
            {renderButtons()}
        </Card>
    )

}

PortfolioPeriodCard.propTypes = {
    portfolioPeriod: PropTypes.object,
    hasSubmitted: PropTypes.bool
}

export default PortfolioPeriodCard