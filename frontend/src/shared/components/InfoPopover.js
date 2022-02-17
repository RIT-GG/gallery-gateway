import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

// Fontawesome icons
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import FaInfo from '@fortawesome/fontawesome-free-solid/faInfo';

const InfoPopover = (props) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <div>
            <Button id={props.id} type="button" color="link" onClick={toggle} className="p-0">
                <FontAwesomeIcon icon={FaInfo} size='1x' />
            </Button>
            <Popover placement="bottom" isOpen={popoverOpen} target={props.id} toggle={toggle}>
                { /* Only render the header if a title was passed */}
                {props.title ? (<PopoverHeader>{props.title}</PopoverHeader>) : null}
                <PopoverBody>{props.content}</PopoverBody>
            </Popover>
        </div>
    );
}

InfoPopover.propTypes = {
    /* id value for the popover */
    id: PropTypes.string.isRequired,
    /* Title of the popover container */
    title: PropTypes.string,
    /* Content rendered in the popover. Can be text or JSX */
    content: PropTypes.any
}

export default InfoPopover;