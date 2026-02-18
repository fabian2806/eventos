import Button from "@/shared/components/Button";
import { CircleArrowRight } from "lucide-react";

type HeroSectionProps = {
    onStart: () => void;
}

const HeroSection = ({onStart}: HeroSectionProps) => {
    return(
        <section className="min-h-[80vh] flex flex-col justify-center items-center">
            <div className="w-full max-w-4xl px-6 text-center space-y-16">
                <div className="space-y-6">
                    <h1 className="text-balance text-white font-editorial text-6xl md:text-8xl tracking-tight leading-[0.95]">
                        EL <span className="font-display font-black">ACCESO</span> A TU PRÓXIMO <span className="font-display font-black">EVENTO.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-white/80 font-body text-lg md:text-xl leading-relaxed">
                        Compra tu entrada, recibe tu QR al instante y entra sin fricción.
                    </p>
                </div>
                
                <Button size="lg" className="text-xl! font-extrabold!" rightIcon={<CircleArrowRight className="h-8 w-8" />} onClick={onStart}>EMPEZAR</Button>

            </div>
        </section>
    );
}

export default HeroSection;