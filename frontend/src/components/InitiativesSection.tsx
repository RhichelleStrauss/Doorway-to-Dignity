import { Link } from "react-router-dom";
import Badge from "./Badge";
import Card from "./Card";
import JarsImage from "../assets/images/PlaceholderImage2.jpeg"
import ShelterBagsImage from "../assets/images/PlaceholderImage4.jpeg"
import PotsImage from "../assets/images/PlaceholderImage1.jpeg"



//i nevver wanna type this word again 
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const initiatives = [
  {
    image: JarsImage,
    title: "Jars of Hope",
    text: "Sealing love and essentials in a jar, these are care packages of the most heartwarming kind.",
  },
  {
    image: ShelterBagsImage,
    title: "Shelter Bags",
    text: "Hand-packed bags of essentials that bring warmth and safety to people sleeping rough.",

  },
  {
    image: PotsImage,
    title: "Pots of Hope",
    text: "Warm, home-cooked meals shared with families and individuals facing food insecurity.",
  },
];


function InitiativesSection() {
  return (
    <>
        <section className="flex flex-col gap-6  px-6 py-14 md:px-12 lg:px-24">
          <div className="flex flex-col items-start gap-3">
            <Badge tone="light">INITIATIVES</Badge>

            <h2 className="text-[32px]/[40px] font-bold text-topaz-blue-800 md:text-[44px]/[52px] lg:text-[48px]/[56px]">
              Turning Small Steps into Giant Leaps
            </h2>
            <p className="text-[20px]/[32px]  text-topaz-blue-700 md:text-[20px]/[32px] lg:text-[20px]/[32px]">For community and individual empowerment.</p>
          </div>

               <div className="flex flex-col gap-6 lg:flex-row">
        {initiatives.map((item) => (
          <Card key={item.title} className="flex flex-1 flex-col gap-3 p-3">
            <img
              src={item.image}
              alt=""
              className="h-[200px] w-full rounded-[14px] object-cover lg:h-[225px]"
            />

            <div className="flex flex-col items-start gap-2 px-3 pb-4">
              <h3 className="text-[22px]/[30px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">
                {item.title}
              </h3>
              <p className="text-[15px]/[24px] text-gunmetal-grey-400 lg:text-[16px]/[26px]">
                {item.text}
              </p>
              <Link to="/dashboard" className="text-[13px]/[18px] font-semibold text-topaz-blue-700 underline">
                See upcoming events →
              </Link>
            </div>
          </Card>
        ))}

        </div>


        </section>
    </>
  );
}

export default InitiativesSection;
