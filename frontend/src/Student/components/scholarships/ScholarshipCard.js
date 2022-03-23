import React from "react"
import { Card, CardBody, CardHeader } from "reactstrap"

function ScholarshipCard(props) {
    const { scholarship } = props
    if(scholarship === null){
        return <React.Fragment></React.Fragment>
    }

    const {name, description} = scholarship;
    return (
        <Card className="mb-5">
            <CardHeader><h3>{name}</h3></CardHeader>
            <CardBody>
                <p>{description}</p>
            </CardBody>
        </Card>
    )
}

export default ScholarshipCard