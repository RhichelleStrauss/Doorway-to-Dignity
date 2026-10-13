import LogInHero from "../components/LogInHero"
import Background from "../components/Background"

import heroImage from "../assets/images/PlaceholderImage3.jpeg"



function LogIn() {
  return <main>

<Background image={heroImage} className="min-h-dvh">
    <div className="grid min-h-dvh lg:grid-cols-[1144fr_776fr]">
    <LogInHero />
  </div>
</Background>


  </main>
}

export default LogIn
