import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function ScholarshipConfirmationModal(props) {

  return (
    <Modal isOpen={props.isOpen} toggle={props.cancel} size="lg" className="portfolio-modal">
      <ModalHeader toggle={props.cancel}>
        Scholarship Confirmation - {props.scholarship.name}
      </ModalHeader>
      <ModalBody>
        <b>Description: {props.scholarship.description}</b> <br/><br/>
        Do you want to apply to this scholarship? <br/> 
        Scholarship applications cannot be undone.
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" className="mr-auto" onClick={props.cancel}>Cancel</Button>
        <Button color="primary" className="ml-auto" onClick={props.accept}>Confirm</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ScholarshipConfirmationModal
