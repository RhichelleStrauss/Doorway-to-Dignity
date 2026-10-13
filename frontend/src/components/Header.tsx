import heroImage from "../assets/images/PlaceholderVolunteerImage.jpeg"
import Background from "./Background";
import Badge from "./Badge";


type HeaderProps = {
  badge: string;
  title: string;
  text?: string;
  image?: string;
};

function Header({ badge, title, text, image = heroImage }: HeaderProps) {

return(

   <Background image={image} className="h-[calc(20dvh-72px)] min-h-[380px]">
      <div className="flex h-full flex-col items-start justify-center gap-6 px-6 md:px-12 lg:px-24">
        <Badge>{badge}</Badge>
        <h1 className="max-w-[810px] text-[34px]/[42px] font-bold text-cream lg:text-[57px]/[65px]">{title}</h1>
       {text && (
  <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">{text}</p>
)}

 </div>
    </Background>

);

}

export default Header;
