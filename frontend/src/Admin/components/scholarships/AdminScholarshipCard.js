import React from "react"
import { Button, Card, CardBody, CardFooter, CardHeader } from "reactstrap"
import PropTypes from "prop-types"

function AdminScholarshipCard(props) {
    const { scholarship } = props
    // Handle no scholarship being passed in
    if (scholarship === null) {
        return <React.Fragment></React.Fragment>
    }

    const { name, description } = scholarship;
    
    return (
        <Card className="mb-5">
            <CardHeader>
                <h3>{name}</h3>
            </CardHeader>

            <CardBody>
                <p>{description}</p>
            </CardBody>

            <CardFooter className={"d-flex flex-column flex-lg-row justify-content-between"}>

                <Button color="primary" outline>Edit Scholarship</Button>
                
                <Button color="primary" className="mt-3 mt-lg-0">View Submissions</Button>

            </CardFooter>
        </Card>
    )
}

AdminScholarshipCard.propTypes = {
    scholarship: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        active: PropTypes.bool
    }),
    actions: PropTypes.element
}

export default AdminScholarshipCard