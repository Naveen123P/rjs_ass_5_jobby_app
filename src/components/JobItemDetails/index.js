import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {IoBagSharp} from 'react-icons/io5'
import {BsBoxArrowUpRight} from 'react-icons/bs'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import SkillItem from '../SkillItem'
import Headers from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getSimilarJobsFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobDetailsFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.getJobDetailsFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(each =>
        this.getSimilarJobsFormattedData(each),
      )
      //   console.log(updatedData)
      //   console.log(updatedSimilarJobsData)
      this.setState({
        jobDetails: updatedData,
        similarJobs: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails
    return (
      <>
        <div className="job-details-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="role-container">
              <p className="role">abc</p>
              <FaStar className="star-icon" />
              <p className="span">{rating}</p>
            </div>
          </div>
          <div className="location-employment-salary-container">
            <div className="flex">
              <div className="location-container flex">
                <MdLocationOn className="icon1" />
                <p className="paragraph inline">{location}</p>
              </div>
              <div className="employment-container flex">
                <IoBagSharp className="icon1" />
                <p className="paragraph inline">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-container">
            <div className="flex justify-content-between">
              <h3 className="description">Description</h3>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="a"
              >
                Visit <BsBoxArrowUpRight />{' '}
              </a>
            </div>
            <p className="desc-text">{jobDescription}</p>
          </div>
          <div className="skills-div">
            <h3 className="description skills-heading ">Skills</h3>
            <ul className="skills-list flex">
              {skills.map(each => (
                <SkillItem key={each.name} skill={each} />
              ))}
            </ul>
          </div>
          <div className="life-at-company">
            <h3 className="description">Life at Company</h3>
            <div className="l-a-c-content">
              <p className="desc-text life-at-company-desc">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="l-a-c-img"
              />
            </div>
          </div>
        </div>
        <SimilarJobs similarJobs={similarJobs} />
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
      <button type="button" className="button" onClick={this.getJobDetails}>
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

  render() {
    return (
      <>
        <Headers />
        <div className="job-item-details-container">
          {this.renderAllApiStatusView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
