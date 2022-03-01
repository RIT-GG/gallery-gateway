import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import ActivePortfolioPeriodQuery from '../queries/portfolio/activePortfolioPeriod.graphql'
import PortfolioPeriods from '../components/PortfolioPeriods'
import { displayError } from '../../shared/actions'

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(ActivePortfolioPeriodQuery, {
    props: ({ ownProps, data: { portfolioPeriod, loading, error } }) => ({
      activePortfolioPeriod: portfolioPeriod,
      loading,
      error
    })
  })
)(PortfolioPeriods)