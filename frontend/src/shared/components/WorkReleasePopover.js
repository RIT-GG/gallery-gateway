import React from "react";
import { Label } from "reactstrap";
import InfoPopover from "./InfoPopover";

const workReleaseContent = (
    <React.Fragment>
      <p>
        I, for consideration received, do hereby grant to Rochester Institute of Technology (“RIT”), and its respective individual employees, directors, officers, agents, representatives, successors and assigns, the nonexclusive, worldwide, absolute and irrevocable right and unrestricted permission, and without further notice to me or any other or further consent or authorization from me, to use and reproduce my Work(s) being submitted here.
      </p>
      <p>
        I warrant and represent that I am the owner and/or creator of the Work(s) described above and that I have the legal right and authority to enter into this Agreement for purposes of providing this Permission and Release to RIT. I agree that I am entitled to no additional compensation from RIT for use of the Work(s) other than what may have already been given to me upon execution of this Release.
      </p>
      <p>
        I do hereby release RIT, its individual employees, directors, officers, agents, representatives, successors and assigns, now and forever, from any actions, suits, claims, covenants, damages, executions, demands and liabilities which I or my heirs, representatives, successors and assigns ever had, now have or may have arising out of the aforesaid authorization and consent, without limitation, including any claims for libel or alleged misrepresentation of me by virtue of the use of these Work(s).
      </p>
    </React.Fragment>
  );

function WorkReleasePopover() {
    
    return (
        <Label>
            <span className='d-inline-flex align-items-center'>
                <span className='mr-2'>I have read and agree to the terms.</span>

                <InfoPopover id='distributionAllowedInfo' title='PERMISSION AND RELEASE TO USE WORK(S)' content={workReleaseContent} />
            </span>

        </Label>
    )
}

export default WorkReleasePopover