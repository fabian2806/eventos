import LogoMark from "@/shared/components/logo/LogoMark";

const Logo = () => {
    return (
    <div className="flex items-center gap-3 select-none">
      <LogoMark />
      <span className="text-3xl font-semibold tracking-[0.25em] text-white">
        NEXT
      </span>
    </div>
  );
}

export default Logo;