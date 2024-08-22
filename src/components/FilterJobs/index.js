import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class FilterJobs extends Component {
  state = {
    sheck: '',
  }

  render() {
    return (
      <>
        <div className="employment-type-container">
          <h1 className="heading">Type of Employment</h1>
          {employmentTypesList.map(each => (
            <div className="employment-item-container">
              <input
                type="checkbox"
                id={each.employmentTypeId}
                value={each.employmentTypeId}
              />
              <label htmlFor={each.employmentTypeId} className="para">
                {each.label}
              </label>{' '}
              <br />
            </div>
          ))}
        </div>
        <hr />
        <div className="salary-range-container">
          <h1 className="heading">Salary Range</h1>
          {salaryRangesList.map(each => (
            <div className="salary-item-container">
              <input
                type="radio"
                id={each.salaryRangeId}
                name="salary"
                value={each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId} className="para">
                {each.label}
              </label>{' '}
              <br />
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default FilterJobs
