import Card from "./Card";
import roadImage from "../assets/images/RoadMountain.jpeg";

const quotes = [
  {
    text: "“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”",
    source: "2 Corinthians 9:7",
  },
  {
    text: "“Whoever is kind to the poor lends to the Lord, and he will reward them for what they have done.”",
    source: "Proverbs 19:17",
  },
];

function QuoteSection() {
  return (
    <section className="relative flex items-center overflow-hidden px-6 py-14 md:px-12 lg:min-h-[510px] lg:px-24">
      <img src={roadImage} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 flex w-full flex-col gap-6 lg:flex-row">
        {quotes.map((quote) => (
          <Card key={quote.source} variant="teal" className="flex flex-1 flex-col justify-center p-8 lg:p-9">
            <blockquote className="text-[17px]/[26px] text-soft-amber-100 lg:text-[18px]/[27px]">
              <p>{quote.text}</p>
              <p>~ {quote.source}</p>
            </blockquote>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default QuoteSection;
