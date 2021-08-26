import {Component} from 'react'
import {FaTwitter, FaInstagram} from 'react-icons/fa'
import {VscGithubAlt} from 'react-icons/vsc'
import logo from '../Images/logo.png'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="center">
        <img className="website-logo" src={logo} alt="website logo" />
        <p className="footer-para">
          we stand with everyone standing in front lines
        </p>
        <div className="social-media-section">
          <VscGithubAlt size={42} className="margin" />
          <FaInstagram size={42} className="margin" />
          <FaTwitter size={42} className="margin" />
        </div>
      </div>
    )
  }
}

export default Footer
