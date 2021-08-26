import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const AccomodationModal = (props) => {
    return (
        // <div style={{marginTop:'8%'}}>
        //     <div>
        //     <img src={props.imageData} style={{width:'100px',height:'100px'}}/>
        //     <p><strong>{props.name}</strong></p>
        //     <p><strong>Address:</strong> {props.address}</p>
        //     <p>{props.about}</p>
        //     <p>Rs: {props.price}/-</p>
        //     <p>{props.children}</p>
        //     </div>
        // </div>
        <Container>
        <Row style={{boxShadow:'5px 6px 10px #67170B',padding:'20px'}}>
            <Col>
                <img src={props.imageData} style={{width:'150px',height:'150px'}}/>
            </Col>
            <Col>
                <p>{props.name}</p>
                <p>Rs. {props.address}</p>
                <p>{props.about}</p>
                <p>Rs. {props.price}/-</p>
            </Col>
            <Col>
                <p>{props.children}</p>
            </Col>
        </Row>
    </Container>
    )
};

export default AccomodationModal;