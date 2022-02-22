import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import Loading from '../../shared/components/Loading'
import PortfolioCard from './PortfolioCard'
import { Col, Container, Row } from 'reactstrap'

function Portfolios(props) {
  useEffect(() => {
    if (props.error) {
      props.error.graphQLErrors.forEach(e => {
        props.handleError(e.message)
      })
    }
  }, [props.error, props.handleError])

  const { loading, portfolios, activePortfolioPeriod } = props

  if (loading) {
    return <Loading />
  }

  if (!Array.isArray(portfolios) || portfolios.length === 0) {
    return (
      <Container >
        <Row>
          <Col xs={12} lg={8}>
            <h1 className="mb-4">Your portfolios</h1>
          </Col>
          <Col xs={12} lg={8}>
            <p className="h3">No portfolios found.</p>
            <p>{activePortfolioPeriod ? <React.Fragment>You can start by <a href="/portfolios/create">creating a portfolio</a>.</React.Fragment> : "You can only create portfolios during an active portfolio period"}</p>
          </Col>
        </Row>

      </Container>
    )
  }

  let activePortfolio = null;
  let pastPortfolios = [];
  // Extract the active portfolio from the past portfolios
  if (activePortfolioPeriod) {
    for (let idx = 0; idx < portfolios.length; idx++) {
      const curr_portfolio = portfolios[idx];
      if (curr_portfolio.portfolioPeriodId === activePortfolioPeriod.id) {
        activePortfolio = curr_portfolio;
      }
      else {
        pastPortfolios.push(curr_portfolio)
      }
    }
  }
  // No active portfolio period so all portfolios are past portfolios
  else {
    pastPortfolios = portfolios;
  }

  return (
    <Container >
      <h1 className="mb-4">Your portfolios</h1>
      <h3>Current Portfolio</h3>
      {activePortfolioPeriod === null ? <p>There is no active portfolio period</p>
        : activePortfolio ? <PortfolioCard portfolio={activePortfolio} key={activePortfolio.id} />
          : <p>You haven't created a portfolio for this portfolio period. You can <a href="/portfolios/create">create one here</a>.</p>
      }
      <h3>Previous Portfolios</h3>
      <div className="d-flex flex-column">
        {pastPortfolios.map((portfolio) => {
          return <PortfolioCard portfolio={portfolio} key={portfolio.id} />
        })}
      </div>
    </Container>
  )
}

Portfolios.propTypes = {
  portfolios: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object
}

Portfolios.defaultProps = {
  portfolios: []
}

export default Portfolios
