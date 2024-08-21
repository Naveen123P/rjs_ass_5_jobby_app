import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {IoMdHome} from 'react-icons/io'
import {IoBag} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jobby_jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <div className="mobile-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <div className="links-container">
          <Link to="/" className="">
            <IoMdHome className="icon" />
          </Link>
          <Link to="/jobs" className="">
            <IoBag className="icon" />
          </Link>
          <FiLogOut className="icon" onClick={onClickLogout} />
        </div>
      </div>
      <div className="desktop-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <div className="desktop-links-con">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/jobs" className="link">
            Jobs
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </>
  )
}

export default withRouter(Header)
