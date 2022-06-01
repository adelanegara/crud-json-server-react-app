import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const BuyTrade = () => {
  return (
    <div>
        <h1> Buy Trade</h1>
    <Form>
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Company Code
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="email" placeholder="Email" />
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
    <Form.Label column sm={2}>
      Shares
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="password" placeholder="Password" />
    </Col>
  </Form.Group>



  <Form.Group as={Row} className="mb-3">
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Buy</Button>
    </Col>
  </Form.Group>
</Form></div>
  )
}

export default BuyTrade