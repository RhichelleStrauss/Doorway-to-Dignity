
import Hero from "../components/Hero"
import AboutUsSection from "../components/AboutUsSection"
import OurValuesSection from "../components/OurValuesSection"
import PageBackground from "../components/PageBackground"
import InitiativesSection from "../components/InitiativesSection"
import CTA from "../components/CTA"
import StoriesSection from "../components/StoriesSection"
import QuoteSection from "../components/QuoteSection"

import StudentNotice from "../components/StudentNotice"

function Home() {
  return <main>

  
   <div>
  <StudentNotice></StudentNotice>
  <Hero></Hero>

   <PageBackground>
     <AboutUsSection></AboutUsSection>
     <OurValuesSection></OurValuesSection>
     <InitiativesSection></InitiativesSection>
     <CTA></CTA>
     <QuoteSection></QuoteSection>
     <StoriesSection></StoriesSection>
   </PageBackground>
   

   </div>

  </main>
}

export default Home
