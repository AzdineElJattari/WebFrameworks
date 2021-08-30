import React, { Component } from 'react'
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap'
import * as sha1 from 'js-sha1'

export default class Login extends Component {  
  
  constructor(props) {  
      super(props)
      this.state =  { username: '', password: '', authenticated: false }                                                           
      this.login = this.login.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
  }
    
  login() {
    const pwd = sha1(this.state.password)
    if(this.state.username === 'test' 
            && pwd === 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3') {
      this.setState({ username: this.state.username, password: pwd, authenticated: true })
      localStorage.setItem('user', JSON.stringify({ username: this.state.username, password: pwd, authenticated: true }))
      window.location.reload()
    }
    else {
      // clear user / pwd
      this.setState({ username: '', password: '' })
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {  
    return ( 
       <Container className='App' style={{paddingTop: "15%", paddingLeft: "28%"}}>
           <h1 className='display-4'>
             E - El Jattari Azdine
           </h1>
        <h1 className='display-4'>Welcome!</h1>
        <br/>
        <Form className='form-group w-25'>  
          <Col>  
            <FormGroup row style={{marginBottom: 15}}>  
              <Label for='name' style={{marginBottom: 5}}>Name</Label>  
                <Input type='text' className='form-control' name='username' value={ this.state.username } 
                      onChange={ this.handleInputChange } placeholder='Enter username' />  
            </FormGroup>
            <FormGroup row style={{marginBottom: 15}}>  
              <Label for='name' style={{marginBottom: 5}}>Password</Label>  
                <Input type='password' className='form-control' name='password' value={ this.state.password } 
                      onChange={ this.handleInputChange } placeholder='Enter password' />  
            </FormGroup> 
          </Col>  
          <Col>  
            <FormGroup row>  
              <button type='button' onClick={ this.login } className='btn btn-outline-primary'>Login</button>  
             </FormGroup>  
          </Col>  
        </Form>
      </Container>
    )
  }  
}
