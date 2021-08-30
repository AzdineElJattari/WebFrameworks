import React, { Component } from 'react'
import axios from 'axios'
import TableRow from './TableRow'
    
export default class ListProduct extends Component {  
    
    constructor(props) {  
        super(props)
        this.state = { products: [] }
    }  
      
    componentDidMount() {
      axios.get('http://localhost:4000/products/')  
            .then(response => {  
              this.setState({ products: response.data })  
            })  
            .catch(function (error) {  
              console.log(error)  
            })
    }
        
    tableRows() {  
      return this.state.products.map((row, i) => {  
          return <TableRow obj={ row } key={ i }/> 
      })
    }
    
    render() {
        return (  
          <div>  
            <h1 className='display-4'>All Products</h1>
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
        )
    } 
  }
