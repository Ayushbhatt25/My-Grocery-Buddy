import React from 'react'
import MainBanner from '../components/MainBanner.jsx'
import Categories from '../components/Categories.jsx'
import BestSeller from '../components/BestSeller.jsx'
import BottomBanner from '../components/BottomBanner.jsx'
import NewsLetter from '../components/NewsLetter.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

function Home() {
  return (
    <div className='mt-10'>
      <MainBanner />
      <ScrollReveal>
        <Categories />
      </ScrollReveal>
      <ScrollReveal>
        <BestSeller />
      </ScrollReveal>
      <ScrollReveal>
        <BottomBanner />
      </ScrollReveal>
      <ScrollReveal>
        <NewsLetter />
      </ScrollReveal>
    </div>
  )
}

export default Home
