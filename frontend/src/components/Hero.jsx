import React from 'react'

const Hero = () => {
  return (
    <div className="navs">
    <div className="div">
    <div className="logo">
    <img className="star" alt="Star" src="star-1.svg" />
    <div className="text-wrapper">Logo</div>
    </div>
    <div className="nav-links">
    <div className="text-wrapper-2">Home</div>
    <div className="frame">
    <div className="text-wrapper-2">Products</div>
    <img className="akar-icons-chevron" alt="Akar icons chevron" src="akar-icons-chevron-down.svg" />
    </div>
    <div className="text-wrapper-2">About</div>
    <div className="text-wrapper-2">Pricing</div>
    </div>
    <div className="search-box">
    <img className="img" alt="Img" src="image.svg" />
    <p className="search-for-anything">
    <span className="span">Search </span>
    <span className="span">for anything</span>
    </p>
    </div>
    </div>
    </div>
  )
}

export default Hero