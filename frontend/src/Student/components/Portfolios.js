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

  const { loading, portfolios, activePortfolioPeriods } = props

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
            return <PortfolioCard portfolio={portfolio} key={portfolio.id} />
          })}
        </div>
      </Col>
    )
  }

  if (loading) {
    return <Loading />
  }


  console.log(activePortfolioPeriods)
  return (
    <Container >
      <h1 className="mb-4">Your portfolios</h1>
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
