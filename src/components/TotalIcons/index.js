import {Component} from 'react'
import BarCharts from '../BarCharts'
import Numbers from '../Numbers'
import check from '../Images/check-mark.png'
import recover from '../Images/recovered.png'
import protect from '../Images/protection.png'
import breathing from '../Images/breathing.png'

import './index.css'

export default class TotalIcons extends Component {
  state = {
    confirmed: '',
    deceased: '',
    recovered: '',
    tested: '',
    cases: 'confirmed',
    color: '#9A0E31',
  }

  componentDidMount() {
    this.getCases()
  }

  getCases = async () => {
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    const fetchedData = await response.json()
    console.log(fetchedData)
  }

  render() {
    const {confirmed, deceased, recovered, tested, cases, color} = this.state
    const {
      confirmedCase,
      deceasedCase,
      recoveredCase,
      activeCase,
      presentDistricts,
      presentState,
      code,
    } = this.props

    console.log('presentState is = ', presentState)
    console.log('presentDistricts =', presentDistricts)
    return (
      <div>
        <div className="order">
          <button type="button" onClick={this.confirmedDistricts}>
            <div id="box1" className="box">
              <p className="confirmed">Confirmed</p>
              <img src={check} alt="checked" />
              {confirmed}
              <p className="confirmed">{confirmedCase}</p>
            </div>
          </button>
          <button type="button" onClick={this.testedDistricts}>
            <div id="box2" className="box">
              <p className="active">Active</p>
              <img src={protect} alt="tested" />
              {deceased}
              <p className="active">{activeCase}</p>
            </div>
          </button>
          <button type="button" onClick={this.recoveredDistricts}>
            <div id="box3" className="box">
              <p className="recovered">Recovered</p>
              <img src={recover} alt="recovered" />
              {recovered}
              <p className="recovered">{recoveredCase}</p>
            </div>
          </button>
          <button type="button" onClick={this.deceasedDistricts}>
            <div id="box4" className="box ">
              <p className=" deceased">Deceased</p>
              <img src={breathing} alt="deceased" />
              {tested}
              <p className="deceased">{deceasedCase}</p>
            </div>
          </button>
        </div>
      </div>
    )
  }
}
