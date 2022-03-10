import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import PortfolioPeriods from '../../components/portfolio/PortfolioPeriods'
import { displayError } from '../../../shared/actions'

// Graph QL queries
import PortfolioPeriodsQuery from "../../queries/portfolio/portfolioPeriods.graphql"

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(PortfolioPeriodsQuery, {
    props: ({ ownProps, data: { portfolioPeriods, loading, error } }) => ({
      portfolioPeriods: portfolioPeriods,
      loading,
      error
    })
  })
)(PortfolioPeriods)