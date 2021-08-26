import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Select from 'react-select'
import MySelect from '../MySelect'

import './index.css'

export default class Details extends Component {
  state = {
    details: '',
    searchInput: '',
    codes: '',
  }

  componentDidMount() {
    this.searchInfo()
  }

  searchInfo = async () => {
    const resp = await fetch(
      'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    )
    if (resp.ok) {
      const fetchedData = await resp.json()
      console.log('State results', fetchedData.states)

      const options = fetchedData.states.map(value => ({
        label: value.state_name,
        value: value.state_id,
      }))
      this.setState({details: options})
    }

    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    if (response.ok) {
      const fetchedData = await response.json()
      console.log('State results', fetchedData.AP)

      //   const options = fetchedData.states.map(value => ({
      //     label: value.state_name,
      //     value: value.state_id,
      //   }))
      //   this.setState({co: options})
    }
  }

  onChangeValue = value => {
    console.log(value)
  }

  render() {
    const {details} = this.state
    console.log('Details', details)
    return (
      <div className="search-bar">
        <h1>Details</h1>
        <MySelect options={details} onChange={this.onChangeValue} />
      </div>
    )
  }
}
