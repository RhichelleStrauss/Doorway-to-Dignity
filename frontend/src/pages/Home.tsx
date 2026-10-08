
import Hero from "../components/Hero"
import AboutUsSection from "../components/AboutUsSection"
import OurValuesSection from "../components/OurValuesSection"
import PageBackground from "../components/PageBackground"
import InitiativesSection from "../components/InitiativesSection"
import CTA from "../components/CTA"
import StoriesSection from "../components/StoriesSection"


function Home() {
  return <main>

  
   <div>
  <Hero></Hero>

   <PageBackground>
     <AboutUsSection></AboutUsSection>
     <OurValuesSection></OurValuesSection>
     <InitiativesSection></InitiativesSection>
     <CTA></CTA>
     <StoriesSection></StoriesSection>
   </PageBackground>

   </div>

  </main>
}

export default Home
