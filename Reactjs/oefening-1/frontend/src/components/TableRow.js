import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TableRow extends Component {

  render() {  
    return (  
        <tr>  
          <td>
            <Link to={ '/delete/' + this.props.obj.name }><img src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg" alt='delete' width='15' height='18'/></Link>&nbsp;&nbsp;
            <Link to={ '/edit/' + this.props.obj.name }>{ this.props.obj.name }</Link>
          </td>
          <td>  
            { this.props.obj.brand }
          </td>  
          <td>  
            { this.props.obj.description }  
          </td>  
          <td>  
            { this.props.obj.price }  
          </td>  
        </tr>  
    )
  }  
}  
