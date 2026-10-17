import Header from "../components/Header"
import PageBackground from "../components/PageBackground"
import Disclaimer from "../components/Disclaimer"


import Icon from "../components/Icon"
import chevronIcon from "../assets/icons/chevron-down.svg"

const faqs = [

  { question: "Why and what is analytics", answer: "For our summative assessment, we learn about analytics and deploying a website instead of it being local. the whole purpose is to see where users spend most of their time if things are uncertain" },

  { question: "Is this the official Doorway to Dignity website?", answer: "No. This site is a student project built as a concept for Doorway to Dignity. It isn't run by the organisation. To find out more about them, visit doorwaytodignity.org." },

  { question: "What data is collected while I use the site?", answer: "Google Analytics records which pages are visited and how long people stay on them. Microsoft Clarity records anonymous clicks and scrolling as heatmaps and session recordings. No names, emails or other personal details are collected." },

  { question: "Is anything I type into the forms saved?", answer: "No. The forms are for show only. Nothing you type is sent or stored, so please don't enter any real personal details." },

  { question: "Why can't I log in, sign up or donate?", answer: "Those features need a backend, which is still being built. For now the log in and sign up pages show a coming soon message, and the donate page is a preview of the design. No real donation can be made through this site." },

  { question: "What was the site built with?", answer: "It was designed in Figma first, then built with React, TypeScript, Tailwind CSS and daisyUI, using Vite. It's hosted online so it can be visited from anywhere." },

  { question: "Are the photos real?", answer: "The photos used on this site are stock images." },

];


function FAQ() {
  return <main>

    <title>FAQ | Doorway To Dignity (Student Project)</title>
    <meta name="description" content="Answers to common questions about this student project and Doorway To Dignity." />


    <Header
  badge="FAQ"
  title="Frequently asked questions"
  text="Everything you need to know about volunteering with Doorway To Dignity."
/>


<Disclaimer>
Disclaimer: this is a student project, these questions and answers are placeholders & some are about the project itself if that interests you.
</Disclaimer>


<PageBackground>

<section className="px-6 py-14 md:px-12 lg:px-24">

  <div className="mx-auto w-full ">
  <h2 className="text-[30px]/[38px] font-bold text-topaz-blue-800 lg:text-[36px]/[44px] flex items-start ">Frequently asked questions</h2>
  <p className="mt-1.5 text-[15px]/[22px] text-gunmetal-grey-400 flex items-start lg:text-[17px]/[26px]">Frequently asked questions about volunteering and the organisations work & what the purpose of this student site</p>

  <div className="join join-vertical mt-6 w-full overflow-hidden rounded-[14px] bg-card shadow-[0_12px_40px_rgba(8,74,79,0.18)]">
    {faqs.map((faq, index) => (
      <div key={faq.question} className="group collapse join-item rounded-none border-b border-soft-amber-100 last:border-b-0 has-[:checked]:bg-kinda-white">
        <input type="checkbox" defaultChecked={index === 0} className="h-full" />
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
