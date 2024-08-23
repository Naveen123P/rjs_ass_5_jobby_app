import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {IoBagSharp} from 'react-icons/io5'

import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJob
  return (
    <li className="job-item similarJob">
      <div className="logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo"
        />
        <div className="role-container">
          <h1 className="role">{title}</h1>
          <FaStar className="star-icon" />
          <p className="span">{rating}</p>
        </div>
      </div>
      <div className="description-container">
        <h3 className="description">Description</h3>
        <p className="desc-text">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobItem
