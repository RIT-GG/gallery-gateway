import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { displayError } from '../../../shared/actions'

import JudgesForPortfolioPeriodQuery from '../../queries/portfolio/judgesForPortfolioPeriod.graphql'

import AssignJudgesToPortfolioPeriodMutation from '../../mutations/portfolio/assignJudgesToPortfolioPeriod.graphql'
import RemoveJudgesFromPortfolioPeriodMutation from '../../mutations/portfolio/removeJudgesFromPortfolioPeriod.graphql'

import AssignJudgesPortfolioPeriodTable from '../../components/portfolio/AssignJudgesPortfolioPeriodTable'
import { fetchJudges } from '../../actions'

const mapDispatchToProps = (dispatch) => ({
  handleError: message => dispatch(displayError(message)),
  fetchJudges: () => dispatch(fetchJudges())
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(JudgesForPortfolioPeriodQuery, {
    props: ({ ownProps, data: { portfolioPeriod, loading, error } }) => {
      return ({
      portfolioPeriod,
      loading,
      error
    })
  }
  }),
  graphql(AssignJudgesToPortfolioPeriodMutation, {
    props: ({ ownProps, mutate }) => ({
      assign: usernames =>
        mutate({
          variables: {
            input: {
              portfolioPeriodId: ownProps.portfolioPeriodId,
              usernames
            }
          },
          refetchQueries: [
            {
              query: JudgesForPortfolioPeriodQuery,
              variables: {
                id: ownProps.portfolioPeriodId
              }
            }
          ]
        })
    })
  }),
  graphql(RemoveJudgesFromPortfolioPeriodMutation, {
    props: ({ ownProps, mutate }) => ({
      unassign: usernames =>
        mutate({
          variables: {
              portfolioPeriodId: ownProps.portfolioPeriodId,
              usernames
          },
          refetchQueries: [
            {
              query: JudgesForPortfolioPeriodQuery,
              variables: {
                id: ownProps.portfolioPeriodId
              }
            }
          ]
        })
    })
  })
)(AssignJudgesPortfolioPeriodTable)
