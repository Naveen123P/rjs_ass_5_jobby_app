import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatuses = {
  initial: 'INITIAL',
  inProgress: 'IN-PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatuses.initial,
  }

  componentDidMount() {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    this.setState({apiStatus: apiStatuses.inProgress})
    const url = 'https://apis.ccbp.in/profile'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      let updatedData = data.profile_details
      updatedData = {
        profileImageUrl: updatedData.profile_image_url,
        name: updatedData.name,
        shortBio: updatedData.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatuses.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatuses.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails
    return (
      <div className="success-profile-bg">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="username">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <>
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.getUserProfile}
      >
        Retry
      </button>
    </>
  )

  renderAllApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatuses.inProgress:
        return this.renderLoaderView()
      case apiStatuses.success:
        return this.renderSuccessView()
      case apiStatuses.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-bg">{this.renderAllApiStatusView()}</div>
  }
}

export default Profile
