import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Numbers from '../Numbers'
import Navbar from '../Navbar'
import MySelect from '../MySelect'
import Footer from '../Footer'
import TotalCases from '../TotalCases'
import TotalIcons from '../TotalIcons'
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
      console.log('Home results', fetchedData)
      const confirmedCases = []
      const deceasedCase = []
      const recoveredCase = []
      const activeCase = []
      const population = []
      //   console.log(this.props)

      const {statesList} = this.props
      const codes = statesList.map(r => r.state_code)
      const states = statesList.map(r => r.state_name)
      console.log('Codes are =', Object.keys(fetchedData))

      console.log('States', states)
      codes.forEach(code => {
        confirmedCases.push(fetchedData[code].total.confirmed)
        deceasedCase.push(fetchedData[code].total.deceased)
        population.push(fetchedData[code].meta.population)
        recoveredCase.push(fetchedData[code].total.recovered)
        activeCase.push(fetchedData[code].total.tested)
      })

      const totalConfirmedCases = confirmedCases.reduce((a, b) => a + b, 0)

      const totalDeceasedCases = deceasedCase.reduce((a, b) => a + b, 0)
      const totalRecoveredCases = recoveredCase.reduce((a, b) => a + b, 0)

      const totalActiveCases = activeCase.reduce((a, b) => a + b, 0)

      const resp = await fetch(
        'https://cdn-api.co-vin.in/api/v2/admin/location/states',
      )
      const data = await resp.json()
      console.log('Data', data.states)

      const options = data.states.map(code => ({
        label: code.state_name,
        value: code.state_id,
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
        statesList,
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

    const {history} = this.props
    history.push(`/state/${value}`)
  }

  render() {
    const {
      isLoading,
      confirmed,
      recovered,
      active,
      deceased,
      states,
      codes,
      totalConfirmedCases,
      totalActiveCases,
      totalRecoveredCases,
      totalDeceasedCases,
      option,
      totalPopulation,
      results,
      statesList,
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

              <TotalIcons
                confirmedCase=<Numbers x={totalConfirmedCases} />
                deceasedCase=<Numbers x={totalDeceasedCases} />
                recoveredCase=<Numbers x={totalRecoveredCases} />
                activeCase=<Numbers x={totalActiveCases} />
              />
              <div className="container borders">
                <div className="row">
                  <div className="d-flex justify-content-around">
                    <p className="bold col-3">
                      States/UT
                      <FcGenericSortingAsc /> <FcGenericSortingDesc />
                    </p>
                    <p className="bold">Confirmed</p>
                    <p className="bold">Active</p>
                    <p className="bold">Recovered</p>
                    <p className="bold">Deceased</p>
                    <p className="bold">Population</p>
                  </div>

                  <hr />
                  <ul>
                    {codes.map((code, index) => (
                      <li key={code} className="li none">
                        <div className="d-flex justify-content-around">
                          <p className="col-3">
                            {statesList[index].state_name}
                          </p>

                          <p className="li-conf">
                            <Numbers x={results[code].total.confirmed} />
                          </p>
                          <p className="li-act">
                            <Numbers x={results[code].total.tested} />
                          </p>
                          <p className="li-rec">
                            <Numbers x={results[code].total.recovered} />
                          </p>
                          <p className="li-dec">
                            <Numbers x={results[code].total.deceased} />
                          </p>
                          <p className="li-pop">
                            <Numbers x={results[code].meta.population} />
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* {results[]} */}
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
