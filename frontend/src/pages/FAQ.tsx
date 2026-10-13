import Header from "../components/Header"
import PageBackground from "../components/PageBackground"
import Disclaimer from "../components/Disclaimer"


import Icon from "../components/Icon"
import chevronIcon from "../assets/icons/chevron-down.svg"

const faqs = [
  { question: "How do I create an account?", answer: "Click the \"Sign Up\" button in the top right corner and follow the registration process." },
  { question: "I forgot my password. What should I do?", answer: "Click on \"Forgot Password\" on the login page and follow the instructions sent to your email." },
  { question: "How do I update my profile information?", answer: "Go to \"My Account\" settings and select \"Edit Profile\" to make changes." },
];


function FAQ() {
  return <main>

    <Header
  badge="FAQ"
  title="Frequently asked questions"
  text="Everything you need to know about volunteering with Doorway To Dignity."
/>


<Disclaimer>
Disclaimer: this is a student project, no real donation is made
</Disclaimer>


<PageBackground>

<section className="px-6 md:px-12 lg:px-24 ">



  
  
  <div className="mx-auto w-full ">
  <h2 className="text-[30px]/[38px] font-bold text-topaz-blue-800 lg:text-[36px]/[44px] flex items-start ">Frequently asked questions</h2>
  <p className="mt-1.5 text-[15px]/[22px] text-gunmetal-grey-400 flex items-start lg:text-[17px]/[26px]">Frequently asked questions about volunteering and the organisations work</p>

  <div className="join join-vertical mt-6 w-full overflow-hidden rounded-[14px] bg-card shadow-[0_12px_40px_rgba(8,74,79,0.18)]">
    {faqs.map((faq, index) => (
      <div key={faq.question} className="group collapse join-item rounded-none border-b border-soft-amber-100 last:border-b-0 has-[:checked]:bg-kinda-white">
        <input type="radio" name="faq" defaultChecked={index === 0} />
        <div className="collapse-title flex items-center justify-between gap-[18px] px-6 py-[18px] text-[17px]/[24px] font-semibold text-topaz-blue-800 lg:text-[20px]/[28px]">
          {faq.question}
          <span className="grid size-[30px] shrink-0 place-items-center rounded-full bg-topaz-blue-100 text-topaz-blue-700 transition group-has-[:checked]:rotate-180 group-has-[:checked]:bg-topaz-blue-700 group-has-[:checked]:text-cream">
            <Icon src={chevronIcon} className="size-[15px]" />
          </span>
        </div>
        <div className="collapse-content px-6">
          <p className="max-w-[750px] text-[15px]/[24px] text-gunmetal-grey-400 lg:text-[17px]/[27px]">{faq.answer}</p>
        </div>
      </div>
    ))}
  </div>
</div>




  
      
  </section>

</PageBackground>


  </main>


}

export default FAQ;
