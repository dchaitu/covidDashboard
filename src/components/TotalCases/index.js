import {Component} from 'react'
import Numbers from '../Numbers'
import BarCharts from '../BarCharts'
import check from '../Images/check-mark.png'
import recover from '../Images/recovered.png'
import protect from '../Images/protection.png'
import breathing from '../Images/breathing.png'

import './index.css'

export default class TotalCases extends Component {
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
    // const name = 'AN'
    // console.log(fetchedData.name)
  }

  confirmedDistricts = () => {
    console.log('Confirmed clicked')
    this.setState({cases: 'confirmed', color: '#9A0E31'})
  }

  deceasedDistricts = () => {
    console.log('deceased clicked')
    this.setState({cases: 'deceased', color: '#474C57'})
  }

  recoveredDistricts = () => {
    console.log('recovered clicked')
    this.setState({cases: 'recovered', color: '#216837'})
  }

  testedDistricts = () => {
    console.log('tested clicked')
    this.setState({cases: 'tested', color: '#0A4FA0'})
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

    return (
      <div>
        <div className="order">
          <div className="container">
            <div className="row">
              <button type="button" onClick={this.confirmedDistricts}>
                <div id="box1" className="box col-md-6">
                  <p className="confirmed">Confirmed</p>
                  <img src={check} alt="checked" />
                  {confirmed}
                  <p className="confirmed">{confirmedCase}</p>
                </div>
              </button>
              <button type="button" onClick={this.testedDistricts}>
                <div id="box2" className="box col-md-6">
                  <p className="active">Active</p>
                  <img src={protect} alt="tested" />
                  {deceased}
                  <p className="active">{activeCase}</p>
                </div>
              </button>
              <button type="button" onClick={this.recoveredDistricts}>
                <div id="box3" className="box col-md-6">
                  <p className="recovered">Recovered</p>
                  <img src={recover} alt="recovered" />
                  {recovered}
                  <p className="recovered">{recoveredCase}</p>
                </div>
              </button>
              <button type="button" onClick={this.deceasedDistricts}>
                <div id="box4" className="box col-md-6">
                  <p className=" deceased">Deceased</p>
                  <img src={breathing} alt="deceased" />
                  {tested}
                  <p className="deceased">{deceasedCase}</p>
                </div>
              </button>
            </div>
          </div>
        </div>
        <h3 className="confirmed">Top Districts</h3>
        <div className="container">
          <ul>
            <div className="row">
              {presentDistricts.map(district => (
                <div className="col-3">
                  <li key={district}>
                    <p className="text-color">
                      <Numbers
                        x={presentState.districts[district].total[cases]}
                      />
                      <span className="district"> {district}</span>
                    </p>
                  </li>
                </div>
              ))}
            </div>
          </ul>
        </div>
        <BarCharts code={code} cases={cases} fillColor={color} />
      </div>
    )
  }
}
