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
    const {changeSalary} = props
    return employmentTypesList.map(employment => {
      const onChangeEmployment = () => {
        changeSalary(employment.salaryRangeId)
      }
      return (
        <div key={employment.uniqueId} className="employment-item-container">
          <input
            className="checkbox-input"
            type="checkbox"
            id={employment.employmentTypeId}
            value={employment.employmentTypeId}
            onChange={onChangeEmployment}
          />
          <label htmlFor={employment.employmentTypeId} className="para">
            {employment.label}
          </label>{' '}
          <br />
        </div>
      )
    })
  }

  const renderSalaryRanges = () => {
    const {changeSalary} = props
    return salaryRangesList.map(each => {
      const onChangeSalary = () => {
        changeSalary(each.salaryRangeId)
      }
      return (
        <div
          key={each.uniqueId}
          className="salary-item-container employment-item-container"
        >
          <input
            className="radio-input checkbox-input"
            type="radio"
            id={each.salaryRangeId}
            name="salary"
            value={each.salaryRangeId}
            onChange={onChangeSalary}
          />
          <label htmlFor={each.salaryRangeId} className="para">
            {each.label}
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
      <hr />
    </>
  )
}

export default FilterJobs
