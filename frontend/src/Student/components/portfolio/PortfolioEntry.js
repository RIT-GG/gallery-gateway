import React from "react"
import { getImageThumbnail, STATIC_PATH } from '../../../utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { EntryNoThumbContainer } from "../ShowCard";
import FaYouTube from '@fortawesome/fontawesome-free-brands/faYoutube'
import FaVimeo from '@fortawesome/fontawesome-free-brands/faVimeoV'
import FaBook from '@fortawesome/fontawesome-free-solid/faBook'

/**
 * Handles rendering a single entry
 * Cases include: PHOTO, VIDEO, and OTHER
 */
function PortfolioEntry(props) {
  switch (props.entry.entryType) {
    case "VIDEO":
      const url =
        props.entry.provider === 'youtube'
          ? `https://youtube.com/watch?v=${props.entry.videoId}`
          : `https://vimeo.com/${props.entry.videoId}`
      const icon =
        props.entry.provider === 'youtube' ? (
          <FontAwesomeIcon icon={FaYouTube} size='3x' />
        ) : (
          <FontAwesomeIcon icon={FaVimeo} size='3x' />
        )
      return (
        <a href={url} target='_blank'>
          <EntryNoThumbContainer>
            {icon}
            <h5>{props.entry.title}</h5>
          </EntryNoThumbContainer>
        </a>
      )
    case "PHOTO":
      return (
        <div key={props.entry.id} className='portfolio-entry'>
          <h4>{props.entry.title}</h4>
          <img className="img-fluid" src={`${STATIC_PATH}${getImageThumbnail(props.entry.path)}`} alt="Submitted entry" />
        </div>
      )
    case "OTHER":
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

export default PortfolioEntry;