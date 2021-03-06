// GraphQL and Redux State
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { displayError } from '../../shared/actions'
import ScholarshipCard from '../components/scholarships/ScholarshipCard'

import HasSubmittedScholarshipQuery from "../queries/scholarships/hasSubmittedToScholarship.graphql"
import CreateScholarshipSubmission from "../mutations/createScholarshipSubmission.graphql"

const mapStateToProps = state => ({
    studentUsername: state.shared.auth.user.username
})

const mapDispatchToProps = dispatch => ({
    handleError: message => dispatch(displayError(message))
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    // Query for if this scholarship has been submitted to with this portfolio
    graphql(HasSubmittedScholarshipQuery, {
        props: ({ data: { scholarshipSubmissions, loading, error } }) => ({
            scholarshipSubmissions,
            loading,
            error
        }),
        options: ({scholarship, portfolioId, portfolioPeriodId}) => ({
            variables: {
                scholarshipId: parseInt(scholarship.id),
                portfolioId,
                portfolioPeriodId
            }
        })
    }),
    graphql(CreateScholarshipSubmission, {
        props: ({ mutate }) => ({
            createScholarshipSubmission: submission =>
            mutate({
              variables: { input: submission }
            }),
        }),
        // refetch the HasSubmittedScholarshipQuery so that the card updates to submitted state when the mutation completes
        options: ({scholarship, portfolioId, portfolioPeriodId}) => ({
            refetchQueries: [
              {
                query: HasSubmittedScholarshipQuery,
                variables: {
                    scholarshipId: parseInt(scholarship.id),
                    portfolioId,
                    portfolioPeriodId
                }
              }
            ]
          })
      }),
)(ScholarshipCard)
