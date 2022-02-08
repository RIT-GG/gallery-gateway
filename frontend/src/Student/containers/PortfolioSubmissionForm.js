import { graphql } from 'react-apollo'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { uploadPDF, uploadImage, clearPreview } from '../actions'
import { displayError, setUserHometown, setUserDisplayName} from '../../shared/actions'

//import PortfolioSubmissionForm from '../components/PortfolioSubmissionForm'
import CreatePortfolio from '../mutations/createPortfolio.graphql'
import CurrentStudentPortfolio from '../queries/currentStudentPortfolio.graphql'
import CreatePhotoEntry from '../mutations/createPhotoEntry.graphql'
import CreateVideoEntry from '../mutations/createVideoEntry.graphql'
import CreateOtherMediaEntry from '../mutations/createOtherMediaEntry.graphql'
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
      createPortfolio: portfolio =>
        mutate({
          variables: { input: portfolio }
        }),
    })
  }),
  graphql(CreatePhotoEntry, {
    props: ({ mutate }) => ({
      createPhotoEntry: entry =>
        mutate({
          variables: { input: entry }
        }),
    })
  }),
  graphql(CreateVideoEntry, {
    props: ({ mutate }) => ({
      createVideoEntry: entry =>
        mutate({
          variables: { input: entry }
        }),
    })
  }),
  graphql(CreateOtherMediaEntry, {
    props: ({ mutate }) => ({
      createOtherMediaEntry: entry =>
        mutate({
          variables: { input: entry }
        }),
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
