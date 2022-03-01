import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PortfolioPeriodCard from '../components/PortfolioPeriodCard'
import Loading from '../../shared/components/Loading'

class PortfolioPeriods extends Component {
  static propTypes = {
    portfolioPeriods: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  }

  static defaultProps = {
    portfolioPeriods: []
  }

  componentDidUpdate() {
    const { error, handleError } = this.props
    if (error) {
      error.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
  }

  render() {
    const { loading, portfolioPeriods, activePortfolioPeriod } = this.props

    if (loading) {
      return <Loading />
    }
    
    return (
      <div>
        <h3>Active Period</h3>
        {activePortfolioPeriod === undefined ?
          <p>There is no active portfolio period.</p>
          : <PortfolioPeriodCard {...activePortfolioPeriod} />
        }
        <h3 className='mt-5'>Past Periods</h3>
        {portfolioPeriods.map(portfolioperiod =>
          <PortfolioPeriodCard key={portfolioperiod.id} {...portfolioperiod} />
        )}
      </div>
    )
  }
}

export default PortfolioPeriods
