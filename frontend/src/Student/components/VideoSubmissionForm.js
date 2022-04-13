import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Loading from '../../shared/components/Loading'
import SubmissionForm from './SubmissionForm'

class VideoSubmissionForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }

    this.renderForm = this.renderForm.bind(this)
  }

  componentDidUpdate () {
    if (this.props.data.error) {
      this.props.data.error.graphQLErrors.forEach(e => {
        this.props.handleError(e.message)
      })
    }
  }

  renderForm () {
    const forShow = {
      id: parseInt(this.props.data.show.id),
      name: this.props.data.show.name
    }

    // calculate whether the user is beyond their single submissions
    const numSingleEntries = this.props.data.show.entries.filter(e => !e.group).length
    const canSubmitAsSingle = numSingleEntries < this.props.data.show.entryCap

    return (
      <SubmissionForm
        type = 'Video'
        forShow = {forShow}
        canSubmitAsSingle = {canSubmitAsSingle}
        showModal = {this.showModal}
        {...this.props}
      />
    )
  }

  render () {
    if (this.props.loading) return <Loading />
    return (this.props.data.show) ? this.renderForm() : null
  }
}

VideoSubmissionForm.propTypes = {
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
    })
  }).isRequired,
  create: PropTypes.func.isRequired,
  done: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired
}

export default VideoSubmissionForm
