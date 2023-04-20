import React, { Component } from 'react'
import loading from './loading.gif.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-5' src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
