import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

export default class About extends Component {
  state = {
    faqs: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getQuestions()
  }

  getQuestions = async () => {
    const response = await fetch(
      'https://data.covid19india.org/website_data.json',
    )
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData.faq)

      this.setState({faqs: fetchedData.faq, isLoading: false})
    }
  }

  render() {
    const {isLoading, faqs} = this.state

    return (
      <div>
        {isLoading ? (
          <Loader
            type="Oval"
            className="loader-center"
            color="#007BFF"
            height={30}
            width={60}
          />
        ) : (
          <>
            <Navbar />
            <div className="p-5 m-5">
              <h1>About</h1>
              <p className="about-update">Last update on march 28th 2021</p>
              <p>COVID-19 vaccines be ready for distribution</p>
              {faqs.map(q => (
                <div className="mt-3">
                  <p className="about-update" key={q.qno}>
                    {q.question}
                  </p>
                  <div
                    className="answers"
                    dangerouslySetInnerHTML={{__html: q.answer}}
                  />
                </div>
              ))}
            </div>
            <Footer />
          </>
        )}
      </div>
    )
  }
}
