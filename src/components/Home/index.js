import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect, Link, withRouter} from 'react-router-dom'
import Navbar from '../Navbar'
import MySelect from '../MySelect'
import Footer from '../Footer'
import TotalCases from '../TotalCases'
import StateWise from '../StateWise'

import './index.css'

export default class Home extends Component {
  state = {
    option: '',
    isLoading: true,
    totalRecoveredCases: '',
    totalConfirmedCases: '',
    totalDeceasedCases: '',
    totalPopulation: '',
    totalActiveCases: '',
    results: '',
    confirmed: '',
    deceased: '',
    codes: '',
    recovered: '',
    states: [],
    active: '',
  }

  componentDidMount() {
    this.searchValues()
  }

  searchValues = async () => {
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log('Home results', fetchedData)
      const confirmedCases = []
      const deceasedCase = []
      const recoveredCase = []
      const activeCase = []
      const population = []
      //   console.log(this.props)

      const {statesList} = this.props
      const codes = statesList.map(r => r.state_code)
      const states = statesList.map(r => r.state_name)
      //   console.log('Codes', codes)
      //   console.log('States', states)

      codes.forEach(code => {
        confirmedCases.push(fetchedData[code].total.confirmed)
        population.push(fetchedData[code].meta.population)
      })
      const totalConfirmedCases = confirmedCases.reduce((a, b) => a + b, 0)

      codes.forEach(code => {
        deceasedCase.push(fetchedData[code].total.deceased)
      })
      const totalDeceasedCases = deceasedCase.reduce((a, b) => a + b, 0)
      codes.forEach(code => {
        recoveredCase.push(fetchedData[code].total.recovered)
      })
      const totalRecoveredCases = recoveredCase.reduce((a, b) => a + b, 0)

      codes.forEach(code => {
        activeCase.push(fetchedData[code].total.tested)
      })
      const totalActiveCases = activeCase.reduce((a, b) => a + b, 0)

      const resp = await fetch(
        'https://cdn-api.co-vin.in/api/v2/admin/location/states',
      )
      const data = await resp.json()
      console.log('Data', data.states)

      const options = data.states.map(value => ({
        label: value.state_name,
        value: value.state_id,
      }))

      this.setState({
        option: options,
        results: fetchedData,
        codes,
        states,
        confirmed: confirmedCases,
        isLoading: false,
        recovered: recoveredCase,
        active: activeCase,
        deceased: deceasedCase,
        totalConfirmedCases,
        totalRecoveredCases,
        totalActiveCases,
        totalDeceasedCases,
        totalPopulation: population,
      })
    }
  }

  recoveredSum = recoveredCase => {
    recoveredCase.reduce((a, b) => a + b, 0)
  }

  onChangeOption = event => {
    console.log(event)
    const {label, value} = event
    console.log(value)
    // const id = 2

    const {history} = this.props
    history.push(`/state/${value}`)
    // history.push(`/state/`)
  }

  render() {
    const {
      isLoading,
      confirmed,
      recovered,
      active,
      deceased,
      states,
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
      option,
      totalPopulation,
    } = this.state

    return (
      <>
        {isLoading ? (
          <div className="loader-center">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <>
            <Navbar />
            <div className="home-search-bar">
              <div className="search-bar-size">
                <MySelect
                  options={option}
                  onChange={this.onChangeOption}
                  getOptionLabel={options => options.state_name}
                  getOptionValue={options => options.state_name}
                />
              </div>

              <TotalCases
                confirmedCase={totalConfirmedCases}
                deceasedCase={totalDeceasedCases}
                recoveredCase={totalRecoveredCases}
                activeCase={totalActiveCases}
              />
              <div className="container borders">
                <div className="row">
                  <div className="d-flex flex-column">
                    {/* <p>hai</p>
                    <hr /> */}
                  </div>
                  <div className="col-4">
                    <ul className="none">
                      <p className="bold">States/UT</p>
                      <hr />
                      {states.map(e => (
                        <li className="li" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-1">
                    <ul className="none">
                      <p className="bold">Confirmed</p>
                      <hr />
                      {confirmed.map(e => (
                        <li className="li-conf" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-2">
                    <ul className="none">
                      <p className="bold">Active</p>
                      <hr />
                      {active.map(e => (
                        <li className="li-act" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-2">
                    <ul className="none">
                      <p className="bold">Recovered</p>
                      <hr />
                      {recovered.map(e => (
                        <li className="li-rec" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-1">
                    <ul className="none">
                      <p className="bold">Deceased</p>
                      <hr />
                      {deceased.map(e => (
                        <li className="li-dec" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-2">
                    <ul className="none">
                      <p className="bold">Population</p>
                      <hr />
                      {totalPopulation.map(e => (
                        <li className="li-pop" key={e}>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        )}
      </>
    )
  }
}
