import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import PortfolioPeriodCard from '../components/PortfolioPeriodCard'
import Loading from '../../shared/components/Loading'

function PortfolioPeriods(props) {
  const { loading, activePortfolioPeriod } = props
  const [portfolioPeriods, setPortfolioPeriods] = useState([]);

  /**
   * Handles updating portfolio periods state whenever the portfolioPeriods prop changes
   * Also helps ensure portfolioPeriods is always an array
   */
  useEffect(() => {
    if(Array.isArray(props.portfolioPeriods)){
      let newPortfolioPeriods = props.portfolioPeriods;
      // Remove the active portfolio from the array
      if(props.activePortfolioPeriod){
        newPortfolioPeriods = newPortfolioPeriods.filter((portfolioPeriod) => {
          const keep = portfolioPeriod.id !== props.activePortfolioPeriod.id;
          console.log(keep);
          return keep;
        })
      }

      setPortfolioPeriods(newPortfolioPeriods);
    }
  }, [props.portfolioPeriods, props.activePortfolioPeriod])

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
    <div className='pb-5'>
      <h3 className='my-3'>Active Period</h3>
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

PortfolioPeriods.propTypes = {
  portfolioPeriods: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}


export default PortfolioPeriods
