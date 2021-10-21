import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { uploadPortfolio, clearPreview } from '../actions'
import { displayError, setUserHometown, setUserDisplayName} from '../../shared/actions'

//import PortfolioSubmissionForm from '../components/PortfolioSubmissionForm'
import CreatePortfolio from '../mutations/createPortfolio.graphql'
import CurrentStudentPortfolio from '../queries/currentStudentPortfolio.graphql'

const mapStateToProps = state => ({
  previewImage: state.student.ui.submission.previewFile || {},
  user: state.shared.auth.user
})

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handleUpload: file => dispatch(uploadPortfolio(file)),
  handleHometown: hometown => dispatch(setUserHometown(hometown)),
  handleDisplayName: displayName => dispatch(setUserDisplayName(displayName)),
  clearPreview: () => dispatch(clearPreview()),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(CreatePortfolio, {
    props: ({ mutate }) => ({
      create: entries =>
        mutate({
          variables: { input: entries }
        })
    })
  }),
  graphql(CurrentStudentPortfolio, {
    options: ownProps => ({
      variables: {
        id: ownProps.id
      }
    })
  })
)(null)//(PortfolioSubmissionForm)
