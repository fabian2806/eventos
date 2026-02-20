import type { EntryTypeSummaryResponse } from "@/api/types";
import Button from "@/shared/components/Button";
import { ArrowUpRight } from "lucide-react";

type EntryTypeCardProps = {
    entryType: EntryTypeSummaryResponse;
    onClick: () => void;
}

const EntryTypeCard = ({entryType, onClick}: EntryTypeCardProps) => {
    return(
        <div onClick={onClick} role="button" tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
            }} 
        
        
        
        className="group cursor-pointer select-none
        flex flex-col gap-12 p-8 items-center w-full text-white
        border border-white/30
        bg-[radial-gradient(60%_80%_at_20%_10%,rgba(255,255,255,0.15),transparent_60%)]
        shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]
        backdrop-blur-[1.6px]
        rounded-xl

        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-white/50
        hover:shadow-[0_22px_70px_-30px_rgba(255,255,255,0.18)]
        hover:bg-white/[0.02]

        active:translate-y-0 active:scale-[0.99]

        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-white/40
        focus-visible:ring-offset-2 focus-visible:ring-offset-black
        ">

            <div className="flex flex-col gap-8 items-center w-full">
                <h2 className="text-4xl font-bold font-display">{entryType.name}</h2>
                <div className="h-0.5 w-full bg-white/20"/>
            </div>
            
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-6xl font-black">S/. {entryType.price}</h1>
                <p className="text-white/70 font-body">{entryType.stock} disponibles.</p>
            </div>
            

            <div>
                <Button size="lg" leftIcon={<ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/>} 
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                className="transition-all duration-300
                    group-hover:shadow-[0_14px_40px_-25px_rgba(255,255,255,0.35)]
                    group-hover:scale-[1.02]"
                >ELEGIR</Button>
            </div>

        </div>
    );
}

export default EntryTypeCard;