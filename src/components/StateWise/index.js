import {Component} from 'react'
import Navbar from '../Navbar'
import Numbers from '../Numbers'
import TotalCases from '../TotalCases'
import Footer from '../Footer'
import './index.css'
import Charts from '../Charts'

export default class StateWise extends Component {
  state = {
    presentState: '',
    presentDistricts: '',
    districtName: '',
    stateName: '',
    stateCode: '',
  }

  componentDidMount() {
    this.searchStateValue()
    this.searchDistrict()
  }

  searchStateValue = async () => {
    const response = await fetch(
      'https://cdn-api.co-vin.in/api/v2/admin/location/states',
    )
    if (response.ok) {
      const fetchedData = await response.json()
      console.log('fetchedData', fetchedData)
      console.log('props', this.props)
      const {match, statesList} = this.props

      const {params} = match
      const {id} = params
      console.log('id', id)
      const stateName = fetchedData.states.filter(
        d => d.state_id === parseInt(id, 10),
      )

      console.log(stateName)
      console.log('StatesList', statesList)

      const resp = await fetch(
        'https://data.covid19india.org/v4/min/data.min.json',
      )
      const data = await resp.json()

      //   console.log('Name', stateName)
      const name = stateName[0].state_name
      this.setState({stateName: name})

      const obj = statesList.filter(d => d.state_name === name)
      const stateCode = obj[0].state_code
      const stateData = data[stateCode]
      console.log('Home results', stateData)

      const districts = Object.keys(stateData.districts)
      this.setState({
        presentState: stateData,
        presentDistricts: districts,
        stateCode,
      })
    }
  }

  searchDistrict = async () => {
    const {match} = this.props

    const {params} = match
    const {id} = params
    const resp = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`,
    )
    if (resp.ok) {
      const fetchedDistricts = await resp.json()
      console.log('Districts', fetchedDistricts.districts)
      this.setState({presentDistricts: fetchedDistricts.districts})
    }
  }

  render() {
    const {
      presentState,
      presentDistricts,
      districtName,
      stateName,
      stateCode,
    } = this.state
    console.log('presentState', presentState)
    console.log('presentDistricts', presentDistricts)
    console.log('districtName', districtName)
    console.log('The State name is ', stateName)
    if (presentState === '') {
      return <div>Loading</div>
    }
    return (
      <>
        <Navbar />
        <div className=" p-5">
          <div className="state-name">
            <div>
              {this.searchStateValue}
              <h2 className="border-state-name">{stateName}</h2>
              <p>Last updated on {presentState.meta.date}</p>
            </div>
            <div className="row">
              <p>Tested</p>
              <p className="tested-people">
                <Numbers x={presentState.total.tested} />
              </p>
            </div>
          </div>
          <TotalCases
            code={stateCode}
            presentState={presentState}
            presentDistricts={presentDistricts}
            confirmedCase=<Numbers x={presentState.total.confirmed} />
            deceasedCase=<Numbers x={presentState.total.deceased} />
            recoveredCase=<Numbers x={presentState.total.recovered} />
            activeCase=<Numbers x={presentState.total.tested} />
          />

          <div className="d-flex flex-column justify-content-center">
            <Charts code={stateCode} />
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
