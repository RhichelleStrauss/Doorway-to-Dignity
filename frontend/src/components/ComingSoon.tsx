import Background from "./Background";
import Button from "./Button";
import heroImage from "../assets/images/PlaceholderTeamworkImage.jpeg"

type ComingSoonProps = {
  text?: string;
};

export function ComingSoon({ text }: ComingSoonProps) {
  return (
    <Background image={heroImage} className="h-[calc(100dvh-72px)] min-h-[520px]">
      <title>Coming Soon | Doorway To Dignity (Student Project)</title>
      
      <meta name="robots" content="noindex" />
      <div className="flex h-full flex-col items-start justify-center gap-6 px-6 md:px-12 lg:px-24">
        <h1 className="max-w-[810px] text-[34px]/[42px] font-bold text-[#F15152] lg:text-[57px]/[65px]">
          COMING SOON!
        </h1>

        {text && (
          <p className="max-w-[600px] text-[15px]/[24px] text-soft-amber-100 lg:text-[17px]/[26px]">
            {text}
          </p>
        )}

        <Button to="/" variant="outline">Back to home</Button>
      </div>
    </Background>
  );
}


export default ComingSoon;
