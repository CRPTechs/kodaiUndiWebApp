import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Products = (props) => {
    return (
        <Container>
            <Row style={{boxShadow:'5px 6px 10px #67170B',padding:'20px'}}>
                <Col>
                    <img src={props.imageData} style={{width:'150px',height:'150px'}}/>
                </Col>
                <Col>
                    <p>{props.title}</p>
                    <p>Rs. {props.price}</p>
                    <p>{props.quantity}</p>
                </Col>
                <Col>
                    <p>{props.children}</p>
                </Col>
            </Row>
        </Container>
    )   
};

export default Products;