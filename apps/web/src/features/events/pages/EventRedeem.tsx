import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { KeyRound, ScanLine } from "lucide-react";
import { useState } from "react";

const EventRedeem = () => {

    const [code, setCode] = useState(" ");

    return(
        <section className="min-h-screen flex flex-col justify-center items-center text-white">
            <div className="w-full max-w-3xl text-center space-y-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-display font-black">INGRESA TU CÓDIGO DE ACCESO:</h1>
                    <div className="text-white/80 font-body text-lg md:text-xl leading-relaxed">
                        <p>Si el código es válido, podrás continuar con el registro de tu entrada.</p>
                    </div>
                </div>
                <div className="w-full max-w-lg mx-auto
                                space-y-8
                                rounded-2xl
                                border border-white/15
                                bg-white/3
                                backdrop-blur-md
                                p-6 md:p-8
                                shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
                    <Input
                        variant="emphasis"
                        size="xl"
                        id="grant-code"
                        label="Código de acceso"
                        placeholder="Ej. BMRK4FRBA2"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        leftIcon={<KeyRound size={18} />}
                        className="uppercase tracking-[0.14em]"
                        />
                    <Button variant="outline" size="lg" className="w-full font-extrabold!" 
                        leftIcon={<ScanLine />} onClick={() => {}}>VALIDAR CÓDIGO </Button>
                </div>
            </div>
        </section>
    );
}

export default EventRedeem;