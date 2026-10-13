import heroImage from "../assets/images/PlaceholderVolunteerImage.jpeg"
import Background from "./Background";
import Badge from "./Badge";


function Header() {

return(

    <Background image={heroImage} className="h-[calc(20dvh-72px)] min-h-[380px]">

        <div className="flex h-full flex-col items-start justify-center gap-6 px-6 md:px-12 lg:px-24">
  <Badge>Contact Us</Badge>
  <h1 className="max-w-[810px] text-[34px]/[42px] font-bold text-cream lg:text-[57px]/[65px]">
    Get in Touch
  </h1>
  <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">
   Have a question about volunteering, donating or partnering with us? We’d love to hear from you.
  </p>
</div>

    </Background>

);

}

export default Header;
