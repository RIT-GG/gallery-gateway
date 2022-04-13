import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import PortfolioEntry from './portfolio/PortfolioEntry'

function SinglePortfolioModal(props) {

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle} size="lg" className="portfolio-modal">
      <ModalHeader toggle={props.toggle}>
        {props.portfolio.name}
      </ModalHeader>
      <ModalBody>
        <h2>Details</h2>
        <p><strong>Created:</strong> {new Date(props.portfolio.createdAt).toDateString()}</p>
        <hr />
        <h2>Entries</h2>
        <div className='d-flex flex-column'>
          {props.portfolio.entries.map((entry) => {
            return <PortfolioEntry entry={entry} key={entry.id} />
          })}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" className="mr-auto" onClick={props.toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default SinglePortfolioModal
