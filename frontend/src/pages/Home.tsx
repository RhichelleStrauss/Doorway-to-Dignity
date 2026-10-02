import Navbar from '../components/Navbar'
import Badge from '../components/Badge'
import SectionHeading from '../components/SectionHeading'
import ValueCard from '../components/ValueCard'
import InitiativeCard from '../components/InitiativeCard'
import StoryCard from '../components/StoryCard'
import ArcBackdrop from '../components/ArcBackdrop'
import Footer from '../components/Footer'

import placeholder from '../assets/images/PlaceholderVolunteerImage.jpeg'
import heroArc1 from '../assets/figma/hero-arc-1.svg'
import heroArc2 from '../assets/figma/hero-arc-2.svg'
import heroArc3 from '../assets/figma/hero-arc-3.svg'
import heroArc4 from '../assets/figma/hero-arc-4.svg'
import arcsA from '../assets/figma/section-arcs-a.svg'
import arcsB from '../assets/figma/section-arcs-b.svg'
import heartIcon from '../assets/icons/heart.svg'
import smileIcon from '../assets/icons/smile.svg'
import sunIcon from '../assets/icons/sun.svg'

const sectionPadding = 'px-6 md:px-12 lg:px-[96px]'
const cardRow = 'flex flex-col gap-6 lg:flex-row'
const cardShadow = 'shadow-[0_12px_40px_rgba(8,74,79,0.18)]'

const heroArcs = [
  { src: heroArc1, box: 'left-[-463px] top-[94px] h-[1770px] w-[1775px]', rotate: 'rotate-[137.44deg]', size: 'h-[1213px] w-[1296px]' },
  { src: heroArc2, box: 'left-[-338px] top-[382px] h-[1475px] w-[1450px]', rotate: '-rotate-[59.77deg]', size: 'h-[1034px] w-[1105px]' },
  { src: heroArc3, box: 'left-[847px] top-[-354px] h-[1636px] w-[1660px]', rotate: 'rotate-[32.66deg]', size: 'h-[1154px] w-[1232px]' },
  { src: heroArc4, box: 'left-[1179px] top-[-197px] h-[1061px] w-[998px]', rotate: '-rotate-[92.29deg]', size: 'h-[958px] w-[1024px]' },
]

const aboutCards = [
  {
    title: 'One Step at a Time, One Life at a Time',
    text: 'We’re here to restore the dignity and renew the hope of vulnerable, displaced, and homeless people.',
  },
  {
    title: 'We Believe in the Power of Synergy',
    text: 'Through strategic partnerships with like-minded organizations, we bring to life projects that are physical manifestations of God’s love, grace, and compassion.',
  },
]

const values = [
  {
    icon: heartIcon,
    title: 'Dignity Delivered',
    text: 'Showing everyone that they matter. We uplift the spirit while meeting basic human needs.',
  },
  {
    icon: smileIcon,
    title: 'Community Crusaders',
    text: 'Initiatives that empower! We bring resources and love to the heart of local communities.',
  },
  {
    icon: sunIcon,
    title: 'Nourishing Bodies, Minds & Souls',
    text: 'From Jars of Hope to Pots of Hope, we’re tackling food insecurity and job creation in tangible ways.',
  },
]

const initiatives = [
  {
    photo: placeholder,
    title: 'Jars of Hope',
    text: 'Sealing love and essentials in a jar, these are care packages of the most heartwarming kind.',
  },
  {
    photo: placeholder,
    title: 'Shelter Bags',
    text: 'Hand-packed bags of essentials that bring warmth and safety to people sleeping rough.',
  },
  {
    photo: placeholder,
    title: 'Pots of Hope',
    text: 'Warm, home-cooked meals shared with families and individuals facing food insecurity.',
  },
]

const scripture =
  '“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”'

const stories = Array.from({ length: 3 }, () => ({
  photo: placeholder,
  title: 'Seven Years in the Making: The Pots of Hope Story',
  date: 'On October 14, 2023 | By Doorway To Dignity',
}))

function Home() {
  return (
    <div id="home" className="overflow-x-hidden bg-beige">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[calc(100dvh-72px)] min-h-[520px] overflow-hidden bg-teal-800">
        <img src={placeholder} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,74,80,0.94)] via-[rgba(8,74,80,0.78)] via-55% to-[rgba(2,97,107,0.45)]" />
        <div aria-hidden="true" className="absolute inset-0 origin-top-left scale-[0.78]">
          {heroArcs.map(({ src, box, rotate, size }) => (
            <div key={src} className={`absolute flex items-center justify-center ${box}`}>
              <div className={`flex-none ${rotate}`}>
                <img src={src} alt="" className={`block max-w-none ${size}`} />
              </div>
            </div>
          ))}
        </div>
        <div className={`relative z-10 flex h-full flex-col items-start justify-center gap-6 ${sectionPadding}`}>
          <Badge>Doorway to Dignity</Badge>
          <h1 className="m-0 max-w-[810px] text-[34px]/[42px] font-bold text-cream sm:text-[44px]/[52px] lg:text-[57px]/[65px]">
            Restoring Dignity, Renewing Hope, One Step at a Time
          </h1>
          <p className="m-0 max-w-[600px] text-[15px]/[24px] text-beige sm:text-[17px]/[26px]">
            We’re here to restore the dignity and renew the hope of vulnerable,
            displaced, and homeless people.
          </p>
        </div>
      </section>

      {/* About */}
      <section className={`relative flex flex-col gap-6 overflow-hidden py-14 lg:py-[56px] ${sectionPadding}`}>
        <ArcBackdrop src={arcsA} />
        <div className="relative z-10">
          <SectionHeading eyebrow="About us" title="Who We Are" />
        </div>
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row">
          <img
            src={placeholder}
            alt=""
            className="h-[260px] w-full rounded-[14px] object-cover lg:h-[416px] lg:w-[52%] lg:shrink-0"
          />
          <div className="flex flex-1 flex-col gap-6">
            {aboutCards.map(({ title, text }) => (
              <div key={title} className={`flex flex-1 flex-col justify-center gap-3 rounded-[14px] bg-card p-8 lg:p-9 ${cardShadow}`}>
                <h3 className="m-0 text-[22px]/[30px] font-bold text-teal-800 lg:text-[27px]/[33px]">
                  {title}
                </h3>
                <p className="m-0 text-[15px]/[24px] text-grey lg:text-[16px]/[26px]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we stand for */}
      <section className="relative overflow-hidden bg-teal-800">
        <ArcBackdrop src={arcsA} />
        <div className={`relative z-10 flex flex-col gap-10 py-14 lg:py-[72px] ${sectionPadding}`}>
          <SectionHeading eyebrow="What we stand for" title="Our Values" tone="dark" />
          <div className={cardRow}>
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives + call to action share one arc backdrop */}
      <div className="relative overflow-hidden">
        <ArcBackdrop src={arcsB} offset={80} />

        <section className={`relative z-10 flex flex-col gap-10 py-14 lg:py-[72px] ${sectionPadding}`}>
          <SectionHeading
            eyebrow="Initiatives"
            title="Turning Small Steps into Giant Leaps"
            description="For community and individual empowerment."
          />
          <div className={cardRow}>
            {initiatives.map((item) => (
              <InitiativeCard key={item.title} {...item} />
            ))}
          </div>
        </section>

        <section className={`relative z-10 pb-14 lg:pb-[72px] ${sectionPadding}`}>
          <div className="flex flex-col justify-center gap-2 rounded-[14px] bg-teal-700 px-8 py-10 lg:px-12">
            <h2 className="m-0 text-[26px]/[34px] font-bold text-cream lg:text-[30px]/[38px]">
              Ready to make a difference?
            </h2>
            <p className="m-0 text-[15px]/[24px] text-beige lg:text-[16px]/[24px]">
              Join our volunteers and help restore dignity, one step at a time.
            </p>
          </div>
        </section>
      </div>

      {/* Scripture */}
      <section className={`relative flex items-center overflow-hidden py-14 lg:min-h-[510px] ${sectionPadding}`}>
        <img src={placeholder} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className={`relative z-10 w-full ${cardRow}`}>
          {[0, 1].map((i) => (
            <figure
              key={i}
              className={`m-0 flex flex-1 flex-col justify-center rounded-[14px] bg-teal-700/85 p-8 lg:p-9 ${cardShadow}`}
            >
              <blockquote className="m-0 text-[17px]/[26px] text-beige lg:text-[18px]/[27px]">
                <p className="m-0">{scripture}</p>
                <p className="m-0">~ 2 Corinthians 9:7</p>
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* Our stories */}
      <section className={`relative flex flex-col gap-10 overflow-hidden py-14 lg:py-[72px] ${sectionPadding}`}>
        <ArcBackdrop src={arcsA} offset={45} />
        <div className="relative z-10">
          <SectionHeading
            eyebrow="Our stories"
            title="Our Stories"
            description="Welcome to ‘Our Stories,’ your passport to the hearts we touch. Every post is a journey—from struggle to triumph. Get inspired, get involved, and become a part of our living tapestry of hope and dignity."
          />
        </div>
        <div className={`relative z-10 ${cardRow}`}>
          {stories.map((story, i) => (
            <StoryCard key={i} {...story} />
          ))}
        </div>
      </section>

      {/* Photo strip */}
      <section className="flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <img
            key={i}
            src={placeholder}
            alt=""
            className={`aspect-[384/200] min-w-0 flex-1 object-cover ${i > 2 ? 'hidden md:block' : ''}`}
          />
        ))}
      </section>

      <Footer />
    </div>
  )
}

export default Home
