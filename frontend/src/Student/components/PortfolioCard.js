import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader } from 'reactstrap'
import { getImageThumbnail, STATIC_PATH } from '../../utils'
import SinglePortfolioModal from './SinglePortfolioModal'
import '../../assets/css/portfolio.css'

/**
 * Helper component for rendering a single portfolio entry
 * @param {*} props React props object. Expects an entry
 * @returns JSX for a single portfolio entry
 */
function RenderEntryCard (props) {
  return (
    <div key={props.entry.id} className='portfolio-entry'>
      <h4>{props.entry.title}</h4>
      <img className="img-fluid" src={`${STATIC_PATH}${getImageThumbnail(props.entry.path)}`} alt="Submitted entry" />
    </div>
  )
}

function PortfolioCard (props) {
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)
  function togglePortfolioModal () { setShowPortfolioModal(showPortfolioModal => !showPortfolioModal) }
  return (
    <Card className="bg-light portfolio-card">
      <CardHeader>
        <div className="d-flex flex-wrap justify-content-between">
          <h2 className="mb-0">{props.portfolio.name}</h2>
          <Button color="primary" onClick={togglePortfolioModal}>View details</Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="portfolio-entries">
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
          {props.portfolio.entries.map((entry) => { return <RenderEntryCard entry={entry} /> })}
        </div>
      </CardBody>
      <SinglePortfolioModal isOpen={showPortfolioModal} toggle={togglePortfolioModal} portfolio={props.portfolio} />
    </Card>
  )
}

export default PortfolioCard
