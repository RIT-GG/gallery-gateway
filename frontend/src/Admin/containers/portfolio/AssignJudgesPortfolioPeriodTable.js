import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { displayError } from '../../../shared/actions'

import JudgesQuery from '../../queries/judges.graphql'
import JudgesForPortfolioPeriodQuery from '../../queries/portfolio/judgesForPortfolioPeriod.graphql'

import AssignJudgesToPortfolioPeriodMutation from '../../mutations/portfolio/assignJudgesToPortfolioPeriod.graphql'
import RemoveJudgesFromPortfolioPeriodMutation from '../../mutations/portfolio/removeJudgesFromPortfolioPeriod.graphql'

import AssignJudgesPortfolioPeriodTable from '../../components/portfolio/AssignJudgesPortfolioPeriodTable'

const mapDispatchToProps = (dispatch, { portfolioPeriodId }) => ({
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(null, mapDispatchToProps),
  graphql(AssignJudgesToPortfolioPeriodMutation, {
    props: ({ ownProps, mutate }) => ({
      assign: usernames =>
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
            },
            {
              query: JudgesQuery
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
            },
            {
              query: JudgesQuery
            }
          ]
        })
    })
  })
)(AssignJudgesPortfolioPeriodTable)
