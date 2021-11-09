import React from 'react'
import { getImageThumbnail, STATIC_PATH } from '../../utils'

function renderEntryCard (entry) {
  return (

    <div className="card mr-3" key={entry.id}>
      <div className="card-header">
        <h2>{entry.title}</h2>
      </div>
      <div className="card-body">
        <img className="h-100" src={`${STATIC_PATH}${getImageThumbnail(entry.path)}`} alt="Submitted entry" />
      </div>
    </div>
  )
}

function PortfolioCard (props) {
  return (
    <div className="bg-light p-3 rounded">
      <h2 className="mb-3">{props.portfolio.name}</h2>
      <div className="w-100 d-flex flex-wrap mb-3">
        {props.portfolio.entries.map((entry) => { return renderEntryCard(entry) })}
      </div>
    </div>
  )
}

export default PortfolioCard
