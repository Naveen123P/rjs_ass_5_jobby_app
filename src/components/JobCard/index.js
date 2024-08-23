import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {IoBagSharp} from 'react-icons/io5'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-item">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="role-container">
            <p className="role">{title}</p>
            <FaStar className="star-icon" />
            <span>{rating}</span>
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
          <h2 className="salary">{packagePerAnnum}</h2>
        </div>
        <hr />
        <div className="description-container">
          <h3 className="description">Description</h3>
          <p className="desc-text">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
