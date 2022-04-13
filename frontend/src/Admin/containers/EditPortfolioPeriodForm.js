import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import { displayError } from '../../shared/actions'

import PortfolioPeriodsQuery from '../queries/portfolio/portfolioPeriods.graphql'
import UpdatePortfolioPeriodMutation from '../mutations/updatePortfolioPeriod.graphql'
import EditPortfolioPeriodForm from '../components/EditPortfolioPeriodForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(UpdatePortfolioPeriodMutation, {
    props: ({ mutate, ownProps }) => ({
      update: portfolioPeriod =>
        mutate({
          variables: { id: ownProps.portfolioPeriod.id, input: portfolioPeriod }
        })
    }),
    options: () => ({
      refetchQueries: [
        {
          query: PortfolioPeriodsQuery
        }
      ]
    })
  })
)(EditPortfolioPeriodForm)