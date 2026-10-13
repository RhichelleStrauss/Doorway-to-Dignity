import Header from "../components/Header"
import PageBackground from "../components/PageBackground"
import TextField from "../components/TextField"
import Button from "../components/Button"
import Card from "../components/Card"
import SelectField from "../components/SelectField"
import Icon from "../components/Icon"
import mailIcon from "../assets/icons/mail.svg"
import phoneIcon from "../assets/icons/phone.svg"
import locationIcon from "../assets/icons/globe.svg"

import { useState } from "react";

const details = [

  { icon: mailIcon, label: "Email", value: "hello@doorwaytodignity.org" },
  { icon: phoneIcon, label: "Phone", value: "+27 00 000 0000" },
  { icon: locationIcon, label: "Where we work", value: `Cnr Rabie Street & 4th Avenue North (entrance in Rabie)
Fontainebleau 
Randburg, 2032
South Africa` },

  
];


function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return <main>

    <Header></Header>

    <PageBackground>

    <section className="px-6 py-14 md:px-12 lg:px-24">


<div className="grid gap-6 lg:grid-cols-[1048fr_600fr]">
  <Card className="flex flex-col gap-[18px] p-6 md:p-9">
    <div className="flex flex-col gap-1.5">
      <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">
        Send Us a Message
      </h2>
      <p className="text-[15px]/[24px] text-gunmetal-grey-400">
        Fill in the form and one of our coordinators will get back to you.
      </p>
    </div>

{sent ? (
  <div className="flex flex-1 flex-col items-start justify-center gap-3">
    <h3 className="text-[20px]/[28px] font-bold text-topaz-blue-800">Thanks for your message!</h3>
    <p className="text-[15px]/[24px] text-gunmetal-grey-400">
      This is a student demo, so your message wasn't actually sent.
    </p>
  </div>
) : (
<form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-[18px]">
      <div className="grid gap-[18px] md:grid-cols-2 md:gap-6">
        <TextField label="Full name" id="name" placeholder="Your full name" />
        <TextField label="Email" id="email" type="email" placeholder="you@example.com" />
      </div>

      <div className="grid gap-[18px] md:grid-cols-2 md:gap-6">
        <TextField label="Phone number (optional)" id="phone" type="tel" placeholder="+27 000 000 0000" />
        <SelectField
          label="What is it about?"
          id="subject"
          placeholder="Choose a subject"
          options={["Volunteering", "Donating", "Partnering", "Other"]}
        />
      </div>

      <TextField label="Message" id="message" placeholder="How can we help?" multiline />

      <div className="mt-auto">
        <Button type="submit">Send message</Button>
      </div>
    </form>
    )}

  </Card>

  <div className="flex flex-col gap-6">



    <Card className="p-6 md:p-9">
                <h2 className="text-[24px]/[32px] font-bold text-topaz-blue-800 lg:text-[27px]/[33px]">Contact Details</h2>

      <ul className="mt-6 flex flex-col gap-6">
            {details.map((detail) => (
              <li key={detail.label} className="flex items-start gap-4">
                <div className="grid size-[42px] shrink-0 place-items-center rounded-full bg-topaz-blue-100 text-topaz-blue-700">
                  <Icon src={detail.icon} className="size-[18px]" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[1px] text-gunmetal-grey-400">{detail.label}</p>
                 <p className="whitespace-pre-line text-[16px] font-medium text-topaz-blue-800">{detail.value}</p>

                </div>
              </li>
            ))}
          </ul>
        </Card>

    <Card variant="teal" className="flex flex-col items-start gap-4 p-6 md:p-9">
                <h2 className="text-[24px]/[32px] font-bold text-cream lg:text-[27px]/[33px]">Looking for Quick Answers?</h2>
                <p className="text-[16px] text-cream">
                  Most volunteering questions are answered in our FAQ.
                </p>
                <Button variant="outline" to="/faq">
              Visit our FAQ
                </Button>
      
    </Card>

  </div>
</div>
</section>
</PageBackground>


  </main>
}

export default Contact
