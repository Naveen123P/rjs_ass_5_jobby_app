import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import FilterJobs from '../FilterJobs'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    search: '',
    employmentType: [],
    minimumPackage: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employmentType, minimumPackage, search} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${search}`

    const jwtToken = Cookies.get('jobby_jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => this.getFormattedData(each))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNoProductView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failure-img"
      />
      <h1 className="heading">No Jobs Found</h1>
      <p className="para">We could not find any jobs. Try other filters.</p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    console.log(jobsList)
    return (
      <>
        {jobsList.length === 0 ? (
          <>{this.renderNoProductView()}</>
        ) : (
          <ul className="jobs-list">
            {jobsList.map(each => (
              <JobCard key={each.id} jobDetails={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We Cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderAllApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onEnterSearchKey = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  changeSalary = value => {
    this.setState({minimumPackage: value}, this.getJobsList)
  }

  render() {
    const {search} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onKeyDown={this.onEnterSearchKey}
              onChange={this.onChangeSearch}
              className="search-input"
            />
            <div className="search-icon-container">
              <FaSearch className="search-icon" onClick={this.getJobsList} />
            </div>
          </div>
          <Profile />
          <hr />
          <FilterJobs changeSalary={this.changeSalary} />
          {this.renderAllApiStatusView()}
        </div>
      </>
    )
  }
}

export default Jobs
