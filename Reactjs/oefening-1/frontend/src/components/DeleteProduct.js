import React, { Component } from 'react'
import axios from 'axios'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
  
export default class DeleteProduct extends Component {  
  
  constructor(props) {  
      super(props)
      // get product name from url (/delete/name)
      //const productName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
      //this.state = { name: productName }
      // get product name from match object
      if(this.props.match) {
        this.state = { name: this.props.match.params.product }
      }
      else {
        this.state = { name: '' }
      }

      this.delete = this.delete.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
  }
    
  delete() {
    axios.delete('http://localhost:4000/products/delete/' + this.state.name)  
        .then(res => {
          console.log(res)
        })
        .catch(function (error) {  
          console.log(error)  
        }) 
        this.props.history.push('/list')
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  render() {
      return (  
        <Container className='App'>  
          <h1 className='display-4'>Delete Product</h1>
          <br/>
          <Form className='form-group w-50'>  
            <Col>  
              <FormGroup row>  
                <Label for='name'>Name</Label>  
                  <Input type='text' className='form-control' name='name' value={ this.state.name } 
                        onChange={ this.handleInputChange } placeholder='Enter product name' />  
              </FormGroup>  
            </Col>  
            <Col>  
              <FormGroup row>  
                <button type='button' onClick={ this.delete } className='btn btn-outline-primary'>Delete</button>  
              </FormGroup>  
            </Col>  
          </Form>
        </Container>
      )
  }
}


