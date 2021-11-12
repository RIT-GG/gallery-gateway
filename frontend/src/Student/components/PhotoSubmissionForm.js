import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../shared/components/Loading'
import SubmissionForm from './SubmissionForm'

class PhotoSubmissionForm extends Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      hometown: PropTypes.string,
      displayName: PropTypes.string
    }).isRequired,
    data: PropTypes.shape({
      show: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        entries: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string,
            student: PropTypes.shape({
              username: PropTypes.string
            })
          })
        )
      }),
      error: PropTypes.object,
      loading: PropTypes.bool
    }).isRequired,
    handleUpload: PropTypes.func.isRequired,
    previewImage: PropTypes.object.isRequired,
    create: PropTypes.func.isRequired,
    done: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
    clearPreview: PropTypes.func.isRequired
  }

  static defaultProps = {
    previewImage: {}
  }

  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
    // We clear any uploaded files.
    // This resets the field if a user uploads a file, navigates to another page,
    // and comes back to this form, or a user makes a submission and comes back to
    // this page to make another submission.
    props.clearPreview()
  }

  // componentDidUpdate () {
  //   if (this.props.data.error) {
  //     this.props.data.error.graphQLErrors.forEach(e => {
  //       this.props.handleError(e.message)
  //     })
  //   }
  // }

  renderForm = () => {
    const forShow = {
      id: parseInt(this.props.data.show.id),
      name: this.props.data.show.name
    }

    // calculate whether the user is beyond their single submissions
    const numSingleEntries = this.props.data.show.entries.filter(e => !e.group).length
    const canSubmitAsSingle = numSingleEntries < this.props.data.show.entryCap
    const {handleUpload, ...submissionsFormProps} = this.props
    return (
      <SubmissionForm
        type = 'Photo'
        forShow = {forShow}
        canSubmitAsSingle = {canSubmitAsSingle}
        showModal = {this.showModal}
        handleImageUpload = {handleUpload}
        {...submissionsFormProps}
      />
    )
  }

  render () {
    if (this.props.loading) return <Loading />
    return (this.props.data.show) ? this.renderForm() : null
  }
}

export default PhotoSubmissionForm
