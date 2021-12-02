import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import Loading from '../../shared/components/Loading'
import PortfolioCard from './PortfolioCard'
import { Container } from 'reactstrap'

function Portfolios (props) {
  useEffect(() => {
    if (props.error) {
      props.error.graphQLErrors.forEach(e => {
        props.handleError(e.message)
      })
    }
  }, [props.error, props.handleError])

  const { loading, portfolios } = props

  if (loading) {
    return <Loading />
  }

  if (!Array.isArray(portfolios) || portfolios.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <p className="h3">No portfolios found. You can start by <a href="">creating a potfolio</a>.</p>
      </div>
    )
  }

  return (
    <Container md>
      <h1 className="mb-4">Your portfolios</h1>
      <div className="d-flex flex-column">
        {props.portfolios.map((portfolio) => { return <PortfolioCard portfolio={portfolio} key={portfolio.id}/> })}
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
