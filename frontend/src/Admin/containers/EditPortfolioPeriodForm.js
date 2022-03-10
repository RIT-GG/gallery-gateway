import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose, mapProps } from 'recompose'
import { displayError } from '../../shared/actions'

//import PortfolioPeriodsQuery from '../queries/portfolioPeriods.graphql'
//import EditPortfolioPeriodMutation from '../mutations/editPortfolioPeriod.graphql'
import EditPortfolioPeriodForm from '../components/EditPortfolioPeriodForm'

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  // graphql(EditPortfolioPeriodMutation, {
  //   props: ({ mutate, ownProps }) => ({
  //     update: portfolioPeriod =>
  //       mutate({
  //         variables: { id: ownProps.portfolioPeriod.id, input: portfolioPeriod }
  //       })
  //   }),
  //   options: () => ({
  //     refetchQueries: [
  //       {
  //         query: PortfolioPeriodsQuery
  //       }
  //     ]
  //   })
  // })
)(EditPortfolioPeriodForm)