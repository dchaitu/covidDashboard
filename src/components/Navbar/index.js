import {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../Images/logo.png'
import './index.css'

export default class Navbar extends Component {
  state = {
    isClicked: false,
  }

  handleClick = () => {
    const {isClicked} = this.state
    this.setState({isClicked: !isClicked})
  }

  render() {
    const {isClicked} = this.state
    return (
      <nav className="NavBarItems">
        <h1 className="Navbar-logo">
          <Link to="/">
            <img className="website-logo" src={logo} alt="website logo" />
          </Link>
        </h1>
        <div className="menu-icon">
          <i className={isClicked ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={isClicked ? 'nav-menu mr-3 active' : 'nav-menu mr-3'}>
          <li>
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link nav-link-about" href="/about">
              About
            </a>
          </li>
        </ul>
      </nav>
    )
  }
}
