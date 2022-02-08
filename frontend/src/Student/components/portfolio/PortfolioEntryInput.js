import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import CreatePortfolioEntryCard from "./CreatePortfolioEntryCard";
/**
 * Helper component for rendering 
 */
 function PortfolioEntryInput(props) {
    const entryType = props.submission.type;
  
    /**
     * updates a submisson in state
     * @param {string} field Key of the field to be update
     * @param {any} value Value to set in state
     */
    function handleChange(field, value) {
      const updated_submissions = props.submissions.map((sub) => {
        if (sub.id === props.submission.id) {
          return {
            ...sub,
            [field]: value
          }
        }
        return sub;
      })
      props.setSubmissions(updated_submissions);
    }
  
    /**
     * Renders the three blue buttons that let users toggle between entry types
     */
    const EntryTypeButtons = () => {
      return (
        <div className='w-100'>
          <Label for="entry-type">Entry Type</Label>
          <div className='d-flex mb-3'>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className={`btn btn-primary${entryType === "photo" ? " active" : ""}`}>
                <input type="radio" name="entry-type" id="photo-entry" value="photo" checked={entryType === "photo"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Photo
              </label>
              <label className={`btn btn-primary${entryType === "video" ? " active" : ""}`}>
                <input type="radio" name="entry-type" id="video-entry" value="video" checked={entryType === "video"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Video
              </label>
              <label className={`btn btn-primary${entryType === "other" ? " active" : ""}`}>
                <input type="radio" name="entry-type" id="other-entry" value="other" checked={entryType === "other"} onClick={(event) => { handleChange("type", event.target.value) }} onChange={() => { }} /> Other
              </label>
            </div>
          </div>
        </div>
      )
    }
  
    const name = `submissions.${props.index}`;
  
  
    return (
      <div className='my-3'>
        <EntryTypeButtons />
  
        <FormGroup>
          <Label for={`${props.name}.title`}>Title</Label>
          <Input type="text" name={`${props.name}.title`} placeholder="Entry Title" onChange={(event) => { handleChange("title", event.target.value) }} />
        </FormGroup>
        <CreatePortfolioEntryCard
          name={name}
          type={entryType}
          submission={props.submission}
          handleChange={handleChange}
        />
      </div>
    );
  }

  export default PortfolioEntryInput;