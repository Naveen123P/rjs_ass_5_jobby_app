import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'

import Profile from '../Profile'
import FilterJobs from '../FilterJobs'

import './index.css'

class Jobs extends Component {
  state = {
    jobSearch: '',
  }

  render() {
    return (
      <div className="jobs-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search"
            onChange={this.onChangeSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
        <Profile />
        <hr />
        <FilterJobs />
      </div>
    )
  }
}

export default Jobs
