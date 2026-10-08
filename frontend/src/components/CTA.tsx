import Button from "./Button";

function CTA() {
  return (
    <section className="px-6 pb-14 md:px-12 lg:px-24 lg:pb-[72px]">
      <div className="flex flex-col gap-6 rounded-[14px] bg-topaz-blue-700 px-8 py-10 md:flex-row md:items-center md:justify-between lg:px-12">
        <div className="flex flex-col gap-2">
          <h2 className="text-[26px]/[34px] font-bold text-cream lg:text-[30px]/[38px]">
            Ready to make a difference?
          </h2>
          <p className="text-[15px]/[24px] text-soft-amber-100 lg:text-[16px]/[24px]">
            Join our volunteers and help restore dignity, one step at a time.
          </p>
        </div>

        <Button to="/signup" variant="outline">Sign up to volunteer</Button>
      </div>
    </section>
  );
}

export default CTA;
