import React from 'react'
import HeroSection from '../components/HeroSection'
import Category from '../components/Category'

const Home = () => {
  return (
    <div>
        <HeroSection />
        <Category category="lunch" />
        <Category category="dessert" />
    </div>
  )
}

export default Home