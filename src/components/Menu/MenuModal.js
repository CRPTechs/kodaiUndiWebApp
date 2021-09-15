import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './MenuModal.css';

const MenuModal = (props) => {
    return (
        <Container>
            <Row>
                <Col className="column">
                    <img src={props.image} style={{width:'150px',height:'150px'}}/>
                </Col>
                <Col className="column">
                    <p><strong>{props.title}</strong></p>
                    <p>Rs. {props.price}</p>
                    <p>{props.meal}</p>
                </Col>
                <Col className="columnChildren">
                    <p>{props.children}</p>
                </Col>
            </Row>
            <hr />
        </Container>
    )
};

export default MenuModal;