// GraphQL and Redux State
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'

// Portfolio related data
import ActivePortfolioPeriodsQuery from '../queries/activePortfolioPeriods.graphql'
import PortfoliosQuery from '../queries/portfolios.graphql'
import Portfolios from '../components/Portfolios'

const mapStateToProps = state => ({
  studentUsername: state.shared.auth.user.username
})

const mapDispatchToProps = dispatch => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(PortfoliosQuery, {
    props: ({ data: { portfolios, loading, error } }) => ({
      portfolios,
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        studentUsername: ownProps.studentUsername
      }
    })
  }),
  // Query for the active portfolio period, if one exists
  graphql(ActivePortfolioPeriodsQuery, {
    props: ({ data: { portfolioPeriods, loading, error } }) => ({
      activePortfolioPeriods: portfolioPeriods || [],
      loading,
      error
    }),
    options: ownProps => ({
      variables: {
        activeSubmission: true
      }
    })
  })
)(Portfolios)
