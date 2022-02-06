import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { uploadPDF, uploadImage, clearPreview } from '../actions'
import { displayError, setUserHometown, setUserDisplayName} from '../../shared/actions'

//import PortfolioSubmissionForm from '../components/PortfolioSubmissionForm'
import CreatePortfolio from '../mutations/createPortfolio.graphql'
import CurrentStudentPortfolio from '../queries/currentStudentPortfolio.graphql'
import PortfolioSubmission from '../components/PortfolioSubmissionForm'

const mapStateToProps = state => ({
  previewImage: state.student.ui.submission.previewFile || {},
  user: state.shared.auth.user
})

const mapDispatchToProps = dispatch => ({
  done: () => dispatch(push('/')),
  handlePDFUpload: file => dispatch(uploadPDF(file)),
  handleImageUpload: file => dispatch(uploadImage(file)),
  handleHometown: hometown => dispatch(setUserHometown(hometown)),
  handleDisplayName: displayName => dispatch(setUserDisplayName(displayName)),
  clearPreview: () => dispatch(clearPreview()),
  handleError: message => dispatch(displayError(message))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(CreatePortfolio, {
    props: ({ mutate }) => ({
      create: portfolio =>
        mutate({
          variables: { input: portfolio }
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
)(PortfolioSubmission)
