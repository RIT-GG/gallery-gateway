import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { getImageThumbnail, STATIC_PATH } from '../../utils'

function RenderEntryCard (props) {
  return (
    <div key={props.entry.id} className='portfolio-entry'>
      <h4>{props.entry.title}</h4>
      <p><strong>Comment:</strong> {props.entry.comment || 'N/A'}</p>
      <img className="img-fluid" src={`${STATIC_PATH}${getImageThumbnail(props.entry.path)}`} alt="Submitted entry" />
    </div>
  )
}

function SinglePortfolioModal (props) {
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
        <div className='portfolio-entries'>
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" className="mr-auto" onClick={props.toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default SinglePortfolioModal
