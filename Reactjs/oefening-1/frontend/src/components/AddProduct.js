import React, { Component } from 'react'
import axios from 'axios'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
  
export default class AddProduct extends Component {  
  
  constructor(props) {  
      super(props)
      this.state = { name: '',
                     brand: '',
                     description: '',
                     price: ''
                   }
                   
      this.handleInputChange = this.handleInputChange.bind(this)
      this.addProduct = this.addProduct.bind(this)
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
    
  addProduct() {
    axios.post('http://localhost:4000/products/add', this.state)
        .then(res => {
          //console.log(res)
          this.props.history.push('/list')
        })
        .catch(function (error) {  
          console.log(error)  
        })
  }
  
  render() {
      return (  
        <Container className='App'>  
        <h1 className='display-4'>Add Product</h1>
        <br/>
        <Form className='form-group w-50'>  
          <Col>  
            <FormGroup row>  
              <Label for='name'>Name</Label>  
                <Input type='text' className='form-control' name='name' value={ this.state.name } 
                      onChange={ this.handleInputChange } placeholder='Enter product name' />  
            </FormGroup>
            <FormGroup row>  
              <Label for='name'>Brand</Label>  
                <Input type='text' className='form-control' name='brand' value={ this.state.brand } 
                      onChange={ this.handleInputChange } placeholder='Enter brand name' />  
            </FormGroup>
            <FormGroup row>  
              <Label for='name'>Description</Label>  
                <Input type='text' className='form-control' name='description' value={ this.state.description } 
                      onChange={ this.handleInputChange } placeholder='Enter description' />  
            </FormGroup>
            <FormGroup row>  
              <Label for='name'>Price</Label>  
                <Input type='text' className='form-control' name='price' value={ this.state.price } 
                      onChange={ this.handleInputChange } placeholder='Enter price' />  
            </FormGroup>  
          </Col>  
          <Col>  
            <FormGroup row>  
              <button type='button' onClick={ this.addProduct } className='btn btn-outline-primary'>Add</button>  
             </FormGroup>  
          </Col>  
        </Form>
      </Container> 
      )
  }
}

