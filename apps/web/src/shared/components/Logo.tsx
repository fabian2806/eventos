const Logo = () => {
    return (
    <div className="flex items-center gap-3 select-none">
      <div className="h-20 w-20">
        <svg
          viewBox="0 0 96 96"
          fill="none"
          className="h-full w-full text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 70V26h10l22 30V26h20v44H64L42 40v30H22Z"
            fill="currentColor"
          />
          <path
            d="M62 26h12L46 70H34L62 26Z"
            fill="currentColor"
            opacity="0.28"
          />
        </svg>
      </div>

      <span className="text-3xl font-semibold tracking-[0.25em] text-white">
        NEXT
      </span>
    </div>
  );
}

export default Logo;