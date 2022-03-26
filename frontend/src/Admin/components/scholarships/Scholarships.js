import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"
import AdminScholarshipCard from "./AdminScholarshipCard";

function Scholarships(props) {
    const { scholarships } = props
    const [inactiveScholarships, setInactiveScholarships] = useState([])
    const [activeScholarships, setActiveScholarships] = useState([])

    useEffect(() => {
        let inactive = []
        let active = []

        if (Array.isArray(scholarships) && scholarships.length > 0) {
            for (let idx = 0; idx < scholarships.length; idx++) {
                let scholarship = scholarships[idx]
                console.log(scholarship)
                scholarship.active ? active.push(scholarship) : inactive.push(scholarship)
            }
        }

        setInactiveScholarships(inactive)
        setActiveScholarships(active)

    }, [scholarships])


    // Handle invalid or no scholarships
    if (!Array.isArray(scholarships) || scholarships.length === 0) {
        return (
            <Container fluid>
                <Row>
                    <Col xs={12} className="px-0">
                        <p>There are no scholarships.</p>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} className="px-0">
                    <h3 className="text-success">Active Scholarships</h3>
                    {
                        activeScholarships.map(scholarship => {
                            return <AdminScholarshipCard scholarship={scholarship} />
                        })
                    }
                </Col>
                <Col xs={12} className="px-0">
                    <h3 className="text-warning">Inactive Scholarships</h3>
                    {
                        inactiveScholarships.map(scholarship => {
                            return <AdminScholarshipCard scholarship={scholarship} />
                        })
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Scholarships