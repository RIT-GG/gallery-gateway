import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { EntryNoThumbContainer } from '../ShowCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaBook from '@fortawesome/fontawesome-free-solid/faBook'
import FaVideo from "@fortawesome/fontawesome-free-solid/faVideo"

function PortfolioEntryPreview(props) {
    switch (props.entry.type) {
      case "video":
        return (
          <a href={props.entry.url} target='_blank'>
            <EntryNoThumbContainer>
            <FontAwesomeIcon icon={FaVideo} size='3x' />
              <h5>{props.entry.title}</h5>
            </EntryNoThumbContainer>
          </a>
        )
      case "photo":
        return (
          <div key={props.entry.id} className='portfolio-entry'>
            <h4>{props.entry.title}</h4>
            <img className="img-fluid" src={URL.createObjectURL(props.entry.file)} alt="Submitted entry" />
          </div>
        )
      case "other":
        return (
          <EntryNoThumbContainer>
            <FontAwesomeIcon icon={FaBook} size='3x' />
            <h5>{props.entry.title}</h5>
          </EntryNoThumbContainer>
        )
      default:
        return <React.Fragment></React.Fragment>
    }
  }

function PortfolioCreationPreviewModal(props) {
    return (
        <Modal isOpen={props.isOpen} toggle={props.cancel} size="lg" className="portfolio-modal">
            <ModalHeader toggle={props.cancel}>
                Preview - {props.form_data.title}
            </ModalHeader>
            <ModalBody>
                <h2>Details</h2>
                <p><strong>Created:</strong> {new Date().toDateString()}</p>
                <hr />
                <h2>Entries</h2>
                <div className='d-flex flex-column'>
                    {props.form_data.submissions.map((submission) => {
                        return <PortfolioEntryPreview entry={submission} key={submission.id} />
                    }
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" className="mr-auto" onClick={props.cancel}>Cancel</Button>
                <Button color="primary" className="ml-auto" onClick={props.accept}>Confirm</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PortfolioCreationPreviewModal
