import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const MenuModal = (props) => {
    return (
        <Container>
            <Row style={{boxShadow:'5px 6px 10px #67170B',padding:'20px'}}>
                <Col>
                    <img src={props.image} style={{width:'150px',height:'150px'}}/>
                </Col>
                <Col>
                    <p>{props.title}</p>
                    <p>Rs. {props.price}</p>
                    <p>{props.meal}</p>
                </Col>
                <Col>
                    <p>{props.children}</p>
                </Col>
            </Row>
        </Container>
    )
};

export default MenuModal;