import aboutImage from "../assets/images/PlaceholderVolunteerImage.jpeg"
import Background from "./Background";
import Badge from "./Badge";
import Button from "./Button";

const cards = [
  {
    title: "One Step at a Time, One Life at a Time",
    text: "We’re here to restore the dignity and renew the hope of vulnerable, displaced, and homeless people.",
  },
  {
    title: "We Believe in the Power of Synergy",
    text: "Through strategic partnerships with like-minded organizations, we bring to life projects that are physical manifestations of God’s love, grace, and compassion.",
  },
];


function AboutUs() {

return(
    <>

   
        <div className="flex h-full flex-col items-start justify-center gap-6 px-6 md:px-12 lg:px-24">
  <Badge>About Us</Badge>
  <h1 className="max-w-[810px] text-[34px]/[42px] font-bold text-topaz-blue-700 lg:text-[57px]/[65px]">
    Who we are
  </h1>
  <img className="h-1/2" src={aboutImage}></img>
  <div className="flex flex-wrap gap-2">
 <Button to="/signup">Become a volunteer</Button>
<Button to="/faq" variant="outline">Learn more</Button>

  </div>
</div>

  
    
    </>
    

);

}

export default AboutUs;
