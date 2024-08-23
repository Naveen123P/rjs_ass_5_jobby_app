import './index.css'

import SimilarJobItem from '../SimilarJobItem'

const SimilarJobs = props => {
  const {similarJobs} = props
  console.log(similarJobs)
  return (
    <>
      <h1 className="">Similar Jobs</h1>
      <ul className="similar-jobs-list">
        {similarJobs.map(each => (
          <SimilarJobItem key={each.id} similarJob={each} />
        ))}
      </ul>
    </>
  )
}

export default SimilarJobs
