import aboutImage from "../assets/images/PlaceholderVolunteerImage.jpeg";
import Background from "./Background";
import Badge from "./Badge";
import Card from "./Card";

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
  return (
    <>
      <Background tone="light">
        <section className="flex flex-col gap-6 px-6 py-14 md:px-12 lg:px-24">
          <div className="flex flex-col items-start gap-3">
            <Badge tone="light">About Us</Badge>

            <h2 className="text-[32px]/[40px] font-bold text-topaz-blue-800 md:text-[44px]/[52px] lg:text-[48px]/[56px]">
              Who we are
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <img
              className="h-[260px] w-full rounded-[14px] object-cover lg:h-[416px] lg:w-[52%] lg:shrink-0"
              src={aboutImage}
            />

            <div className="flex flex-1 flex-col gap-6">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="flex flex-1 flex-col justify-center gap-3 rounded-[14px] bg-card p-8 shadow-[0_12px_40px_rgba(8,74,79,0.18)] lg:p-9"
                >
                  <h3 className="text-[22px]/[30px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">
                    {card.title}
                  </h3>
                  <p className="text-[15px]/[24px] text-gunmetal-grey-400 lg:text-[16px]/[26px]">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Background>
    </>
  );
}

export default AboutUs;
