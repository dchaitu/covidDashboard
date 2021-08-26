import {Component} from 'react'
import Select from 'react-select'

import StateWise from '../StateWise'
import TotalCases from '../TotalCases'
import SuggestionItem from '../SuggestionItem'

import './index.css'

export default class SearchBar extends Component {
  state = {
    searchInput: '',
    results: '',
  }

  updateSearchInput = value => {
    this.setState({
      searchInput: value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  searchValues = async () => {
    const response = await fetch(
      'https://data.covid19india.org/v4/min/data.min.json',
    )
    if (response.ok) {
      const fetchedData = await response.json()
      console.log('results', fetchedData)
      this.setState({results: fetchedData})
    }
  }

  render() {
    const {searchInput, results} = this.state
    const len = results.length
    console.log(len)
    const {statesList} = this.props
    // const searchResults = statesList.filter(eachSuggestion =>
    //   eachSuggestion.state_name
    //     .toLowerCase()
    //     .includes(searchInput.toLowerCase()),
    // )

    return (
      <>
        <div className="google-search-suggestions-app-container">
          <div className="google-suggestions-container">
            <div className="search-input-suggestions-container">
              <div className="search-input-container">
                <img
                  alt="search icon"
                  className="search-icon"
                  src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Enter the State"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                {/* {results[results.length - 1].total.confirmed} */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
