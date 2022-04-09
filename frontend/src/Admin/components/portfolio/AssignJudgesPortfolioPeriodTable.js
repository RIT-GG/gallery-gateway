import React, { Component, Fragment } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaLongArrowLeft from '@fortawesome/fontawesome-free-solid/faLongArrowAltLeft'
import FaLongArrowRight from '@fortawesome/fontawesome-free-solid/faLongArrowAltRight'
import FaExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle'

import JudgesTable from '../../components/JudgesTable'

class AssignJudgesPortfolioPeriodTable extends Component {

  static defaultProps = {
    data: {
      assignedJudges: [],
      unassignedJudges: []
    }
  }

  state = {
    selectedUnassignedJudges: {},
    selectedAssignedJudges: {},
    isUnassignConfirmationOpen: false
  }

  onComponentDidMount(){
    
  }

  onDismissUnassignConfirmation = () => {
    this.setState({
      isUnassignConfirmationOpen: false
    })
  }

  onDisplayUnassignConfirmation = () => {
    this.setState({
      isUnassignConfirmationOpen: true
    })
  }

  assign = () => {
    const judges = Object.keys(this.state.selectedUnassignedJudges)

    if (judges.length) {
      this.props
        .assign(judges)
        .then(() => {
          // Reset the checkboxes
          this.setState({
            selectedUnassignedJudges: {},
            selectedAssignedJudges: {}
          })
        })
        .catch(err => this.props.handleError(err.message))
    }
  }

  unassign = () => {
    const judges = Object.keys(this.state.selectedAssignedJudges)

    if (judges.length) {
      this.props
        .unassign(judges)
        .then(() => {
          // Reset the checkboxes
          this.setState({
            selectedUnassignedJudges: {},
            selectedAssignedJudges: {}
          })
        })
        .catch(err => this.props.handleError(err.message))
    }
  }

  handleAssignedJudgesChange = selectedAssignedJudges => {
    this.setState({ selectedAssignedJudges })
  }

  handleUnassignedJudgesChange = selectedUnassignedJudges => {
    this.setState({ selectedUnassignedJudges })
  }

  render () {
    const { data } = this.props

    return (
      <Fragment>
        <Modal
          isOpen={this.state.isUnassignConfirmationOpen}
          toggle={this.onDismissUnassignConfirmation}
          style={{ top: '25%' }}
        >
          <ModalHeader toggle={this.onDismissUnassignConfirmation}>
            Warning{' '}
            <FontAwesomeIcon
              icon={FaExclamationTriangle}
              className='align-middle'
            />
          </ModalHeader>
          <ModalBody>
            <p>
              Removing a judge will permanently delete any votes they have made
              in this portfolio period.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color='secondary'
              onClick={() => this.onDismissUnassignConfirmation()}
            >
              Cancel
            </Button>
            <Button
              color='danger'
              onClick={() => {
                this.onDismissUnassignConfirmation()
                this.unassign()
              }}
            >
              Continue
            </Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col xs='12' md='5'>
            <h2 style={{textAlign: 'center'}}>Unassigned</h2>
            <JudgesTable
              judges={data.unassignedJudges}
              selected={this.state.selectedUnassignedJudges}
              onChange={this.handleUnassignedJudgesChange}
            />
          </Col>
          <Col xs='12' md='2' className='align-self-center'>
            <Row>
              <Col xs={12}>
                <div style={{margin: '2em 0'}}>
                  <Button
                    color='primary'
                    block
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.assign()}
                    disabled={
                      !Object.keys(this.state.selectedUnassignedJudges).length
                    }
                  >
                    Assign{' '}
                    <FontAwesomeIcon
                      icon={FaLongArrowRight}
                      className='align-middle'
                    />
                  </Button>
                </div>
              </Col>
              <Col xs={12}>
                <div style={{margin: '2em 0'}}>
                  <Button
                    color='primary'
                    block
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onDisplayUnassignConfirmation()}
                    disabled={
                      !Object.keys(this.state.selectedAssignedJudges).length
                    }
                  >
                    <FontAwesomeIcon
                      icon={FaLongArrowLeft}
                      className='align-middle'
                    />{' '}
                    Unassign
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs='12' md='5'>
            <h2 style={{textAlign: 'center'}}>Assigned</h2>
            <JudgesTable
              judges={data.assignedJudges}
              selected={this.state.selectedAssignedJudges}
              onChange={this.handleAssignedJudgesChange}
            />
          </Col>
        </Row>
      </Fragment>
    )
  }
}

export default AssignJudgesPortfolioPeriodTable