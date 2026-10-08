import aboutImage from "../assets/images/PlaceholderVolunteerImage.jpeg";
import Background from "./Background";
import Badge from "./Badge";
import Card from "./Card";
import Icon from "./Icon";
import heartIcon from "../assets/icons/heart.svg"
import smileIcon from "../assets/icons/smile.svg"
import sunIcon from "../assets/icons/sun.svg"

const values = [
  {
    icon: heartIcon,
    title: "Dignity Delivered",
    text: "Showing everyone that they matter. We uplift the spirit while meeting basic human needs.",
  },
  {
    icon: smileIcon,
    title: "Community Crusaders",
    text: "Initiatives that empower! We bring resources and love to the heart of local communities.",

  },
  {
    icon: sunIcon,
    title: "Nourishing Bodies, Minds & Souls",
    text: "From Jars of Hope to Pots of Hope, we’re tackling food insecurity and job creation in tangible ways.",
  },
];


function OurValues() {
  return (
    <>
      <Background tone="dark" className="opacity-[45]">
        <section className="flex flex-col gap-6 px-6 py-14 md:px-12 lg:px-24">
          <div className="flex flex-col items-start gap-3">
            <Badge tone="dark">WHAT WE STAND FOR</Badge>

            <h2 className="text-[32px]/[40px] font-bold text-cream md:text-[44px]/[52px] lg:text-[48px]/[56px]">
              Our Values
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
          {values.map((value) => (
            <Card key={value.title} className="flex flex-1 flex-col items-start gap-5 p-8 lg:p-9">
              <div className="grid size-12 place-items-center rounded-full bg-primary-topaz-blue-500 text-soft-amber-100">
                <Icon src={value.icon} className="size-[26px]" />
              </div>
              <h3 className="text-[22px]/[30px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">
                {value.title}
              </h3>
              <p className="text-[15px]/[24px] text-topaz-blue-700 lg:text-[16px]/[26px]">
                {value.text}
              </p>
            </Card>
          ))}
        </div>


        </section>
      </Background>
    </>
  );
}

export default OurValues;
