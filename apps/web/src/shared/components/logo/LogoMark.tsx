type LogoMarkProps = {
    className?: string;
    svgClassName?: string; 
}

const LogoMark = ({
    className = "h-20 w-20",
    svgClassName = "h-full w-full text-white"}
    : LogoMarkProps) => {
    return(
        <div className={className}>
            <svg
            viewBox="0 0 96 96"
            fill="none"
            className={svgClassName}
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
    );
}

export default LogoMark;