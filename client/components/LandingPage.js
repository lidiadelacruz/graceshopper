import React from 'react'
import {Link} from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <img
        src="img/nbh-logo.png"
        height="300"
        width="300"
        alt="Never Before Homes Logo"
      />
      <h1>Never Before Homes</h1>
      <h2>
        <Link to="/homes">Your dream home is one click away!</Link>
      </h2>
    </div>
  )
}

// export default LandingPage
