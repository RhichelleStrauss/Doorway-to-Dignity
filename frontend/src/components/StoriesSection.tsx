
import Badge from "./Badge";
import Card from "./Card";
import JarsImage from "../assets/images/PlaceholderImage2.jpeg"
import ShelterBagsImage from "../assets/images/PlaceholderImage4.jpeg"
import PotsImage from "../assets/images/PlaceholderImage1.jpeg"



//i nevver wanna type this word again 
//AAAAAAAAAAAAAAAAAAAAAAAAAAAAA
const stories = [
  {
    image: JarsImage,
    title: "Seven Years in the Making: The Pots of Hope Story",
    text: "On October 14, 2023 | By Doorway To Dignity",
  },
  {
    image: ShelterBagsImage,
    title: "Seven Years in the Making: The Pots of Hope Story",
    text: "On October 14, 2023 | By Doorway To Dignity",

  },
  {
    image: PotsImage,
    title: "Seven Years in the Making: The Pots of Hope Story",
    text: "On October 14, 2023 | By Doorway To Dignity",
  },
];


function StoriesSection() {
  return (
    <>
        <section className="flex flex-col gap-6  px-6 py-14 md:px-12 lg:px-24">
          <div className="flex flex-col items-start gap-3">
            <Badge tone="light">our stories</Badge>

            <h2 className="text-[32px]/[40px] font-bold text-topaz-blue-800 md:text-[44px]/[52px] lg:text-[48px]/[56px]">
              Our Stories
            </h2>
            <p className="text-[20px]/[32px]  text-topaz-blue-700 md:text-[20px]/[32px] lg:text-[20px]/[32px]">

            Welcome to ‘Our Stories,’ your passport to the hearts we touch. Every post is a journey—from struggle to triumph. Get inspired, get involved, and become a part of our living tapestry of hope and dignity.
            
            </p>
          </div>

               <div className="flex flex-col gap-6 lg:flex-row">
        {stories.map((item) => (
          <Card key={item.title} className="flex flex-1 flex-col gap-3 p-3">
            <img
              src={item.image}
              alt=""
              className="h-[200px] w-full rounded-[14px] object-cover lg:h-[225px]"
            />

            <div className="flex flex-col items-start gap-12 px-3 pb-4">
              <h3 className="text-[22px]/[30px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">
                {item.title}
              </h3>
              <p className="text-[15px]/[24px] text-topaz-blue-700 lg:text-[16px]/[26px]">
                {item.text}
              </p>
             
            </div>
          </Card>
        ))}

        </div>


        </section>
    </>
  );
}

export default StoriesSection;
