import React, { Component, Fragment, useEffect, useState } from 'react'
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaLongArrowLeft from '@fortawesome/fontawesome-free-solid/faLongArrowAltLeft'
import FaLongArrowRight from '@fortawesome/fontawesome-free-solid/faLongArrowAltRight'
import FaExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle'

import JudgesTable from '../../components/JudgesTable'

function AssignJudgesPortfolioPeriodTable({
  assign: assignProp,
  portfolioPeriod,
  fetchJudges,
  handleError,
  unassign: unassignProp
}) {
  // component state
  const [allJudges, setAllJudges] = useState(undefined)
  const [assignedJudges, setAssignedJudges] = useState(portfolioPeriod ? portfolioPeriod.judges : undefined)
  const [unassignedJudges, setUnassignedJudges] = useState(undefined)
  const [state, setState] = useState({
    isUnassignConfirmationOpen: false,
    judgesFetched: false,
    selectedUnassignedJudges: {},
    selectedAssignedJudges: {}
  })

  useEffect(() => {
    if(portfolioPeriod && Array.isArray(portfolioPeriod.judges)){
      setAssignedJudges(portfolioPeriod.judges)
    }
  }, [portfolioPeriod])

  /**
   * Effect for dispatch the fetch judges action then storing the judges in state
   */
  useEffect(() => {
    if (allJudges === undefined && state.judgesFetched === false) {
      async function doFetch() {
        const judges = (await fetchJudges()).payload
        if (Array.isArray(judges) && judges.length > 0) {
          setAllJudges(judges)
        }
      }
      doFetch()
      setState({
        ...state,
        judgesFetched: true
      })
    }
  }, [allJudges, state.judgesFetched])

  /**
   * Effect for building the array of unassigned and unassigned judges
   */
  useEffect(() => {
    if (Array.isArray(allJudges)) {
      const assignedJudgesArray = Array.isArray(assignedJudges) ? assignedJudges.map(judge => judge.username) : []
      const assignedJudgesSet = new Set(assignedJudgesArray)
      setUnassignedJudges(allJudges.filter(judge => !assignedJudgesSet.has(judge.username)))
    }
  }, [allJudges, assignedJudges])

  const onDismissUnassignConfirmation = () => {
    setState({
      ...state,
      isUnassignConfirmationOpen: false
    })
  }

  const onDisplayUnassignConfirmation = () => {
    setState({
      ...state,
      isUnassignConfirmationOpen: true
    })
  }

  const assign = () => {
    const judges = Object.keys(state.selectedUnassignedJudges)

    if (judges.length) {
      assignProp(judges)
        .then(() => {
          // force reload, state update with refetch queries not working. This would be solved with Redux Toolkit usage
          window.location.reload();
        })
        .catch(err => handleError(err.message))
    }
  }

  const unassign = () => {
    const judges = Object.keys(state.selectedAssignedJudges)

    if (judges.length) {
      unassignProp(judges)
        .then(() => {
          // force reload, state update with refetch queries not working. This would be solved with Redux Toolkit usage
          window.location.reload()
        })
        .catch(err => handleError(err.message))
    }
  }

  const handleAssignedJudgesChange = selectedAssignedJudges => {
    setState({
      ...state,
      selectedAssignedJudges
    })
  }

  const handleUnassignedJudgesChange = selectedUnassignedJudges => {
    setState({
      ...state,
      selectedUnassignedJudges
    })
  }

  return (
    <Fragment>
      <Modal
        isOpen={state.isUnassignConfirmationOpen}
        toggle={onDismissUnassignConfirmation}
        style={{ top: '25%' }}
      >
        <ModalHeader toggle={onDismissUnassignConfirmation}>
          Warning{' '}
          <FontAwesomeIcon
            icon={FaExclamationTriangle}
            className='align-middle'
          />
        </ModalHeader>
        <ModalBody>
          <p>
            Removing a judge will remove their ability to view portfolios submitted to this portfolio period.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color='secondary'
            onClick={() => onDismissUnassignConfirmation()}
          >
            Cancel
          </Button>
          <Button
            color='danger'
            onClick={() => {
              onDismissUnassignConfirmation()
              unassign()
            }}
          >
            Continue
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col xs='12' md='5'>
          <h2 style={{ textAlign: 'center' }}>Unassigned</h2>
          <JudgesTable
            judges={Array.isArray(unassignedJudges) ? unassignedJudges : []}
            selected={state.selectedUnassignedJudges}
            onChange={handleUnassignedJudgesChange}
          />
        </Col>
        <Col xs='12' md='2' className='align-self-center'>
          <Row>
            <Col xs={12}>
              <div style={{ margin: '2em 0' }}>
                <Button
                  color='primary'
                  block
                  style={{ cursor: 'pointer' }}
                  onClick={assign}
                  disabled={
                    !Object.keys(state.selectedUnassignedJudges).length
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
              <div style={{ margin: '2em 0' }}>
                <Button
                  color='primary'
                  block
                  style={{ cursor: 'pointer' }}
                  onClick={onDisplayUnassignConfirmation}
                  disabled={
                    !Object.keys(state.selectedAssignedJudges).length
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
          <h2 style={{ textAlign: 'center' }}>Assigned</h2>
          <JudgesTable
            judges={Array.isArray(assignedJudges) ? assignedJudges : []}
            selected={state.selectedAssignedJudges}
            onChange={handleAssignedJudgesChange}
          />
        </Col>
      </Row>
    </Fragment>
  )
}

export default AssignJudgesPortfolioPeriodTable