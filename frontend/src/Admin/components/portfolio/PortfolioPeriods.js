import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import PortfolioPeriodCard from './PortfolioPeriodCard'
import Loading from '../../../shared/components/Loading'

function PortfolioPeriods(props) {
  const { loading } = props
  const [pastPortfolioPeriods, setPastPortfoliosPeriods] = useState([]);
  const [activePortfolioPeriods, setActivePortfolioPeriods] = useState([]);
  const [futurePortfolioPeriods, setFuturePortfolioPeriods] = useState([]);

  /**
   * Handles updating portfolio periods state whenever the portfolioPeriods prop changes
   * Also helps ensure portfolioPeriods is always an array
   */
  useEffect(() => {
    if (Array.isArray(props.portfolioPeriods)) {
      const newPastPPs = [];
      const newActivePPs = [];
      const newFuturePPs = [];

      const today = new Date();
      for (let i = 0; i < props.portfolioPeriods.length; i++) {
        const curr_portfolio = props.portfolioPeriods[i];
        const submission_start_date = new Date(curr_portfolio.startDate);
        const judging_end_date = new Date(curr_portfolio.judgingEndDate);
        // Portfolios with end dates before today are past portfolios
        if (judging_end_date < today) {
          newPastPPs.push(curr_portfolio);
        }
        // Portfolios with judging end dates of today or later AND a submission start date before today are active
        else if (submission_start_date < today) {
          newActivePPs.push(curr_portfolio);
        }
        // All other portfolios are future portfolio periods
        else {
          newFuturePPs.push(curr_portfolio);
        }
      }
      setPastPortfoliosPeriods(newPastPPs);
      setActivePortfolioPeriods(newActivePPs);
      setFuturePortfolioPeriods(newFuturePPs);
    }
  }, [props.portfolioPeriods])

  /**
   * Handles displaying errors sent from GraphQL API
   */
  useEffect(() => {
    const { error, handleError } = props
    if (error) {
      error.graphQLErrors.forEach(e => {
        handleError(e.message)
      })
    }
  }, [props.error, props.handleError])

  if (loading) {
    return <Loading />
  }

  return (
    <div className='pb-5 pt-3'>
      <div className='mb-5'>
        <h3 className='mb-3'>Active Period</h3>
        {activePortfolioPeriods.length === 0 ?
          <p>There is no active portfolio period. <a href="/portfolio-period/new">Create portfolio period</a></p>
          : activePortfolioPeriods.map(portfolio_period =>
            <PortfolioPeriodCard key={portfolio_period.id} {...portfolio_period} />
          )}
      </div>

      <div className='mb-5'>
        <h3 className='mb-3'>Future Portfolio Periods</h3>
        {futurePortfolioPeriods.length === 0 ?
          <p>No past active portfolio periods.</p>
          : futurePortfolioPeriods.map(portfolio_period =>
            <PortfolioPeriodCard key={portfolio_period.id} {...portfolio_period} />
          )}
      </div>

      <div className='mb-5'>
        <h3 className='mb-3'>Past Portfolio Periods</h3>
        {pastPortfolioPeriods.length === 0 ?
          <p>No past portfolio periods.</p>
          : pastPortfolioPeriods.map(portfolio_period =>
            <PortfolioPeriodCard key={portfolio_period.id} {...portfolio_period} />
          )}
      </div>
    </div>
  )
}

PortfolioPeriods.propTypes = {
  portfolioPeriods: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}


export default PortfolioPeriods
