import Icon from "./Icon";
import logo from "../assets/figma/logo.png";
import facebookIcon from "../assets/icons/facebook.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import twitterIcon from "../assets/icons/twitter.svg";
import youtubeIcon from "../assets/icons/youtube.svg";

const socials = [
  { label: "Twitter", icon: twitterIcon, href: "#" },
  { label: "YouTube", icon: youtubeIcon, href: "#" },
  { label: "Facebook", icon: facebookIcon, href: "#" },
  { label: "Instagram", icon: instagramIcon, href: "#" },
];

function Footer() {

return(

<footer className="footer footer-horizontal footer-center gap-y-10 bg-topaz-blue-700 px-6 py-14 text-soft-amber-100 md:px-12">
  <aside className="gap-4">
    <img src={logo} alt="" className="size-[50px] rounded-[14px] object-cover" />
    <p className="font-bold text-cream">
      Doorway To Dignity
      <br />
      Restoring Dignity, Renewing Hope
    </p>
    <p>Copyright © 2023 Doorway To Dignity | All rights reserved | Registration No. 187-907NPO </p>
  </aside>
  <nav>
    <div className="grid grid-flow-col gap-6">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="transition-colors hover:text-topaz-blue-300"
        >
          <Icon src={social.icon} className="size-6" />
        </a>
      ))}
    </div>
  </nav>
</footer>

)
};

export default Footer;
