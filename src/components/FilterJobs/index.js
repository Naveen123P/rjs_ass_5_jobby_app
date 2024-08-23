import './index.css'

const employmentTypesList = [
  {
    uniqueId: 'employment1',
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    uniqueId: 'employment2',
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    uniqueId: 'employment3',
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    uniqueId: 'employment4',
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    uniqueId: 'salary1',
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    uniqueId: 'salary2',
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    uniqueId: 'salary3',
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    uniqueId: 'salary4',
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterJobs = props => {
  const renderEmploymentType = () => {
    const {changeEmploymentType} = props
    return employmentTypesList.map(employment => {
      const {employmentTypeId, label, uniqueId} = employment
      const onChangeEmployment = () => {
        changeEmploymentType(employmentTypeId)
      }
      return (
        <div key={uniqueId} className="employment-item-container">
          <input
            className="checkbox-input"
            type="checkbox"
            id={employmentTypeId}
            value={employmentTypeId}
            onChange={onChangeEmployment}
          />
          <label htmlFor={employmentTypeId} className="para">
            {label}
          </label>{' '}
          <br />
        </div>
      )
    })
  }

  const renderSalaryRanges = () => {
    const {changeSalary} = props
    return salaryRangesList.map(each => {
      const {uniqueId, salaryRangeId, label} = each
      const onChangeSalary = () => {
        changeSalary(salaryRangeId)
      }
      return (
        <div
          key={uniqueId}
          className="salary-item-container employment-item-container"
        >
          <input
            className="radio-input checkbox-input"
            type="radio"
            id={salaryRangeId}
            name="salary"
            value={salaryRangeId}
            onChange={onChangeSalary}
          />
          <label htmlFor={salaryRangeId} className="para">
            {label}
          </label>{' '}
          <br />
        </div>
      )
    })
  }

  return (
    <>
      <div className="employment-type-container">
        <h1 className="heading">Type of Employment</h1>
        {renderEmploymentType()}
      </div>
      <hr />
      <div className="salary-range-container">
        <h1 className="heading">Salary Range</h1>
        {renderSalaryRanges()}
      </div>
    </>
  )
}

export default FilterJobs
