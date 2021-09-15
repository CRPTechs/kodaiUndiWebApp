import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Products = (props) => {
    return (
        <Container>
            <Row style={{padding:'10px 20px',
            width:'100%',
            display: 'flex',
            flexDirection:'row',
            boxSizing:'border-box',
            border:'1px solid #ccc'}}>
                <Col>
                    <img src={props.imageData} style={{width:'150px',height:'150px'}}/>
                </Col>
                <Col>
                    <p>{props.title}</p>
                    <p>Rs. {props.price}</p>
                    <p>{props.quantity}</p>
                </Col>
                <Col style={{padding:'5px'}}>
                    <p>{props.children}</p>
                </Col>
            </Row>
        </Container>
    )   
};

export default Products;