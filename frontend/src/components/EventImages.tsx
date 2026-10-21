import jarsOfHope from "../assets/images/JarOfHope.jpeg";
import shelterBags from "../assets/images/PlaceholderImage4.jpeg";
import potsOfHope from "../assets/images/PlaceholderImage1.jpeg";
import fallback from "../assets/images/PlaceholderVolunteerImage.jpeg";


const eventImages: Record<string, string> = {
  "jars-of-hope": jarsOfHope,
  "shelter-bags": shelterBags,
  "pots-of-hope": potsOfHope,
};

export function getEventImage(key?: string) {
  return (key && eventImages[key]) || fallback;
}
