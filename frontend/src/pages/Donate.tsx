import Header from "../components/Header"
import PageBackground from "../components/PageBackground"
import Disclaimer from "../components/Disclaimer"
import Badge from "../components/Badge"
import Button from "../components/Button"
import cardImage from "../assets/images/PlaceholderImageDonate.jpeg"

function Donate() {
  return <main>

    <Header
  badge="Donate"
  title="Become a Hero: Your Donation, Their New Beginning"
/>


<Disclaimer>
Disclaimer: this is a student project, no real donation is made
</Disclaimer>


<PageBackground>

<section className="px-6 pt-16 pb-14 md:px-12 lg:pt-[108px] lg:pb-[72px]">


  <div className="mx-auto flex max-w-[660px] flex-col gap-[18px] text-center text-[15px]/[24px] text-topaz-blue-800 lg:text-[17px]/[26px]">
  
        <p>Doorway to Dignity exists because of heroes like you. When you contribute, you don’t just give funds; you grant opportunities, awaken dreams, and breathe life into futures. Whether you’re a one-time donor or an ongoing patron, your generosity shapes destinies.</p>
        <p>Volunteers are always welcome, including school students wishing to complete their community service hours.</p>
      </div>


       <div className="relative mx-auto mt-9 flex min-h-[420px] max-w-[825px] flex-col items-center justify-center gap-[18px] overflow-hidden rounded-[14px] px-6 py-12 text-center lg:px-12">
        <img src={cardImage} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-topaz-blue-more-than-900/70" />

        <div className="relative flex flex-col items-center gap-[18px]">
          <Badge>SUPPORT OUR WORK</Badge>
          <h2 className="text-[28px]/[36px] font-bold text-cream lg:text-[36px]/[44px]">Make an Online Donation</h2>
          <p className="text-[15px]/[24px] text-soft-amber-100">You’ll be redirected to our secure payment page.</p>
          <Button className="w-full max-w-[270px]">Click here payment</Button>
        </div>
      </div>
      
  </section>

</PageBackground>


  </main>


}

export default Donate
