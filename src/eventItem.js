import {Well, Button,Row,Col} from 'react-bootstrap';
import React from 'react'

class EventItem extends React.Component{
    render(){
        return(
            <Well>
                <Row>
                    <Col xs={12}>
                    <h6>{this.props.title}</h6>
                    <p>{this.props.desc}</p>
                    <p>{this.props.date}</p>
                    <p>{this.props.time}</p>
                    <p>{this.props.people}</p>
                    <Button bsStyle='primary'>Delete</Button>
                    </Col>
                    </Row>
                    </Well>

        )
    }
}

export default EventItem;