import heroImage from "../assets/images/PlaceholderVolunteerImage.jpeg"
import Background from "./Background";
import Badge from "./Badge";
import Button from "./Button";

function Hero() {

return(

    <Background image={heroImage} className="h-[calc(100dvh-72px)] min-h-[520px]">

        <div className="flex h-full flex-col items-start justify-center gap-6 px-6 md:px-12 lg:px-24">
  <Badge>Doorway to Dignity</Badge>
  <h1 className="max-w-[810px] text-[34px]/[42px] font-bold text-cream lg:text-[57px]/[65px]">
    Restoring Dignity, Renewing Hope, One Step at a Time
  </h1>
  <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">
    We’re here to restore the dignity and renew the hope of vulnerable, displaced, and homeless people.
  </p>
  <div className="flex flex-wrap gap-3">
 <Button to="/signup">Become a volunteer</Button>
<Button to="/faq" variant="outline">Learn more</Button>

  </div>
</div>

    </Background>

);

}

export default Hero;
