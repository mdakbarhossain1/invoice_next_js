'use client'

import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Image, InputGroup, Row, Table } from 'react-bootstrap';
import './invoice.css';


const Invoice = () => {
    const [date, setDate] = useState();
    const [rows, setRows] = useState([{ rate: '', quantity: '', total: 0 }]);
    const [subTotal, setSubTotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);


    // Rate Change 
    const handleRateChange = (e, index) => {
        const newRate = e.target.value;
        const updatedRows = [...rows];
        updatedRows[index].rate = newRate;
        updatedRows[index].total = newRate * updatedRows[index].quantity;
        setRows(updatedRows);
        calculateGrandTotal(updatedRows);
    };


    // Quantity Change 
    const handleQuantityChange = (e, index) => {
        const newQuantity = e.target.value;
        const updatedRows = [...rows];
        updatedRows[index].quantity = newQuantity;
        updatedRows[index].total = updatedRows[index].rate * newQuantity;
        setRows(updatedRows);
        calculateGrandTotal(updatedRows);
    };



    // Row Added 
    const addRow = () => {
        const newRow = { rate: '', quantity: '', total: 0 };
        setRows([...rows, newRow]);
    };


    // Row remove 
    const removeRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        calculateGrandTotal(updatedRows);
    };



    const calculateGrandTotal = (updatedRows) => {
        const total = updatedRows.reduce((sum, row) => sum + row.total, 0);
        setSubTotal(total);
    };



    // download 
    const handleDownload = () => {
        window.print();

    }

    const tax = (subTotal * 0.05).toFixed(2);
    const grandTotal = (subTotal + parseInt(tax)).toFixed(2);


    return (
        <Container id='invoice'>
            <Row>
                <Col>
                    <Col xs={6} md={4}>
                        <Image src="silent_logo.jpg" thumbnail alt='Thumbnail' />
                    </Col>
                </Col>
                <Col>
                    <div className="">
                        <h1>INVOICE</h1>
                        <div className="invoice_number">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Invoice Number</InputGroup.Text>
                                <Form.Control
                                    placeholder="Invoice Number"
                                    aria-label="InvoiceNumber"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Due Date </InputGroup.Text>
                                <Form.Control
                                    placeholder={date}
                                    type="date"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h3>From</h3>
                    <div className="from_information">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Business Name :</InputGroup.Text>
                            <Form.Control
                                placeholder="Business Name"
                                aria-label="BusinessName"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email Address</InputGroup.Text>
                            <Form.Control
                                placeholder="example@example.com"
                                aria-label="Email"
                                type='Email'
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
                            <Form.Control
                                placeholder="Phone Number"
                                aria-label="PhoneNumber"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                            <Form.Control
                                placeholder="Your Office Address"
                                aria-label="YourOffice Address"
                            />
                        </InputGroup>
                    </div>
                </Col>
                <Col>
                    <h3>Bill To</h3>
                    <div className="Bill_information">
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Client Name :</InputGroup.Text>
                            <Form.Control
                                placeholder="Client Name"
                                aria-label="ClientName"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Email Address</InputGroup.Text>
                            <Form.Control
                                placeholder="example@example.com"
                                aria-label="Email"
                                type='Email'
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Phone Number</InputGroup.Text>
                            <Form.Control
                                placeholder="Phone Number"
                                aria-label="PhoneNumber"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
                            <Form.Control
                                placeholder="Your Office Address"
                                aria-label="YourOffice Address"
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SL NO</th>
                        <th>Description</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => <tr key={index}>
                        <td>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder={index + 1}
                                    defaultValue={index + 1}

                                />
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup className="">
                                <Form.Control
                                    placeholder="Description" />
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup className="">
                                <Form.Control
                                    type="number"
                                    value={row.rate}
                                    onChange={(e) => handleRateChange(e, index)}
                                />
                            </InputGroup>
                        </td>
                        <td>
                            <InputGroup className="">
                                <Form.Control
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) => handleQuantityChange(e, index)}
                                />
                            </InputGroup>
                        </td>
                        <td>
                            <td>{row.total}</td>
                        </td>
                        <td>
                            <Button className='btn btn-danger' onClick={() => removeRow(index)}>Remove</Button>
                        </td>

                    </tr>)
                    }
                </tbody>
            </Table>
            <Button className='btn' onClick={addRow}>ADD</Button>

            <Row>
                <Col>
                    <div className="py-2">
                        <Form.Label htmlFor="basic-url" className='fs-3 fw-bold'>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Share Your Notes comment here"
                            style={{ height: '100px' }}
                        />
                    </div>
                    <div className="py-2">
                        <Form.Label htmlFor="basic-url" className='fs-3 fw-bold'>Terms & Condition</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Terms & condition"
                            style={{ height: '100px' }}
                        />
                    </div>

                </Col>
                <Col>
                    <h2>Sub Total: {subTotal}</h2>
                    <Table striped bordered hover size="sm">
                        <thead className='bg-dark'>
                            <tr>
                                <th>Total</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Total</td>
                                <td>{subTotal}</td>
                            </tr>
                            <tr>
                                <td>TAX 5%</td>
                                <td>{tax}</td>
                            </tr>
                            <tr className='bg-success'>
                                <td>Pay Able</td>
                                <td>{grandTotal}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Button className='btn'  onClick={handleDownload}>Download</Button>
        </Container>
    );
};

export default Invoice;