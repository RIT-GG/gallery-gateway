import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import Loading from '../../../shared/components/Loading'
import PortfolioCard from './PortfolioCard'
import { Col, Container, Row } from 'reactstrap'
import PortfolioPeriodCard from './PortfolioPeriodCard'


function Portfolios(props) {
  const [portfolioPeriodPortfolios, setPortfolioPeriodPortfolios] = useState(new Set());

  /**
   * Handles displaying GraphQL erros
   */
  useEffect(() => {
    if (props.error) {
      props.error.graphQLErrors.forEach(e => {
        props.handleError(e.message)
      })
    }
  }, [props.error, props.handleError])

  /**
   * Handles building a relation between active portfolio periods and portfolios
   * for tracking if a portfolio period has been submitted to
   */
  useEffect(() => {
    let periodsAndPortfolios = {}

    for (let i = 0; i < props.activePortfolioPeriods.length; i++) {
      const curr_period = props.activePortfolioPeriods[i];
      periodsAndPortfolios[curr_period.id] = null;
    }

    for (let i = 0; i < props.portfolios.length; i++) {
      const curr_portfolio = props.portfolios[i];
      if (periodsAndPortfolios[curr_portfolio.portfolioPeriodId] === null) {
        periodsAndPortfolios[curr_portfolio.portfolioPeriodId] = curr_portfolio
      }
    }
    setPortfolioPeriodPortfolios(periodsAndPortfolios)
  }, [props.activePortfolioPeriods, props.portfolios])

  const { loading, portfolios, activePortfolioPeriods } = props

  /**
   * Retrieves the portfolio submitted to the provided portfolio period.
   * @param {string} portfolioPeriodId Id of the portfolio period that we want the submitted portfolio for
   * @returns 
   */
  function getSubmittedPortfolioIdForPortfolioPeriod(portfolioPeriodId) {
    let value = ""
    const portfolio_for_period = portfolios.find(portfolio => portfolio.portfolioPeriodId === portfolioPeriodId)
    if (portfolio_for_period !== undefined) {
      value = portfolio_for_period.id
    }
    return value

  }

  function RenderPortfolios() {
    if (!Array.isArray(portfolios) || portfolios.length === 0) {
      return (
        <Col xs={12} lg={8}>
          <p className="h3">No portfolios found.</p>
        </Col>
      )
    }
    return (
      <Col xs={12}>
        <div className="d-flex flex-column">
          {portfolios.map((portfolio) => {
            return <PortfolioCard portfolio={portfolio} key={`portfolio.${portfolio.id}`} />
          })}
        </div>
      </Col>
    )
  }

  function RenderPortfolioPeriods() {
    if (!Array.isArray(activePortfolioPeriods) || activePortfolioPeriods.length === 0) {
      return (
        <Col xs={12} lg={8}>
          <p className="h3">No active portfolio periods.</p>
        </Col>
      )
    }
    return (
      <Col xs={12}>
        <div className="d-flex flex-column">
          {activePortfolioPeriods.map((portfolioPeriod) => {
            return (
              <PortfolioPeriodCard
                portfolioPeriod={portfolioPeriod}
                hasSubmitted={!!portfolioPeriodPortfolios[portfolioPeriod.id]}
                portfolioId={getSubmittedPortfolioIdForPortfolioPeriod(portfolioPeriod.id)}
                key={`portfolioPeriod.${portfolioPeriod.id}`} />
            )
          }
          )}
        </div>
      </Col>
    )
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Container >
      <h1 className="mb-4">Portfolio Periods</h1>
      <RenderPortfolioPeriods />
      <h1 className="my-4">Your portfolios</h1>
      <RenderPortfolios />
    </Container>
  )
}

Portfolios.propTypes = {
  activePortfolioPeriods: PropTypes.array,
  portfolios: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object
}

Portfolios.defaultProps = {
  portfolios: [],
  activePortfolioPeriods: [],
}

export default Portfolios
