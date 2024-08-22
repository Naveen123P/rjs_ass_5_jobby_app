import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Header from '../Header'
import Profile from '../Profile'
import FilterJobs from '../FilterJobs'

import './index.css'

class Jobs extends Component {
  state = {
    jobSearch: '',
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              onChange={this.onChangeSearch}
              className="search-input"
            />
            <div className="search-icon-container">
              <FaSearch className="search-icon" />
            </div>
          </div>
          <Profile />
          <hr />
          <FilterJobs />
        </div>
      </>
    )
  }
}

export default Jobs
