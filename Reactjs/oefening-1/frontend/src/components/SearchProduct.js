import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
  
export default class SearchProduct extends Component {  
  
  constructor(props) {  
      super(props)
      this.state = { name: '', 
                     products: []
                   }
      this.handleInputChange = this.handleInputChange.bind(this)
  }
    
  searchAll = ()=> {
    axios.post('http://localhost:4000/products/searchAll', { name: this.state.name })  // leave out the products array
      .then(json => {  
        //console.log(json.data)
        const products = json.data
        this.setState({ products: products })
      })  
      .catch(function (error) {  
        console.log(error)  
      }) 
  }

  handleInputChange(event) {
    // possibility to check on target.type of target.name for
    // multiple inputs
    this.setState({ [event.target.name]: event.target.value })
  }

  tableRows() {  
    return this.state.products.map((row, i) => {  
        return <TableRow obj={ row } key={ i } /> 
    })
  } 

  render() {
    return (  
       <Container className='App'>  
        <h1 className='display-4'>Search Product</h1>
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
              <button type='button' onClick={ this.searchAll } className='btn btn-outline-primary'>Search</button>  
             </FormGroup>  
          </Col>  
        </Form>
        <br/>
        <div>  
          <h1 className='display-4'>Results</h1>
          <br/><br/>
          <table className='table table-striped'>  
            <thead>  
              <tr>  
                <th>Name</th>  
                <th>Brand</th>  
                <th>Description</th>  
                <th>Price</th>  
              </tr>  
            </thead>  
            <tbody>  
              { this.tableRows() }   
            </tbody>  
          </table>  
        </div>  
      </Container>
    )
  }  
}  
