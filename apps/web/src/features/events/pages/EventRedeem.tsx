import { grantsApi } from "@/api/grants";
import type { EventDetailResponse } from "@/api/types";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { CircleArrowRight, CircleCheckBig  , CircleX, KeyRound, ScanLine } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useGrantValidation from "@/features/events/hooks/useGrantValidation";
import { grantValidationUI } from "../mappers/grantValidationUI";

{/*DRY*/}
type Ctx = {numEventId: number; event: EventDetailResponse};

const EventRedeem = () => {

    const {numEventId} = useOutletContext<Ctx>();
    const {validateGrant, response, loading, error} = useGrantValidation();
    const [code, setCode] = useState(" ");

    const handleValidate = async () => {
        await validateGrant(code, numEventId);       
    }
    
    const grantUI = response ? grantValidationUI[response.reason] : null;

    return(
        <section className="min-h-screen flex flex-col justify-center items-center text-white">
            <div className="w-full max-w-3xl text-center space-y-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-display font-black">INGRESA TU CÓDIGO DE ACCESO:</h1>
                    <div className="text-white/80 font-body text-lg md:text-xl leading-relaxed">
                        <p>Si el código es válido, podrás continuar con el registro de tu entrada.</p>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleValidate();
                    }}
                    className="w-full max-w-lg mx-auto
                                space-y-8
                                rounded-2xl
                                border border-white/15
                                bg-white/3
                                backdrop-blur-md
                                p-6 md:p-8
                                shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]"
                >
                    <Input
                        variant={grantUI?.inputVariant ?? "emphasis"}
                        size="xl"
                        id="grant-code"
                        label="Código de acceso"
                        placeholder="Ej. BMRK4FRBA2"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        leftIcon={<KeyRound size={18} />}
                        className="uppercase tracking-[0.14em]"
                        />
                    <Button type="submit" variant="outline" size="lg" className="w-full font-extrabold!" 
                        leftIcon={<ScanLine />} onClick={handleValidate}>VALIDAR CÓDIGO </Button>
                </form> 

                {/*Si es valido: mostramos card, mensaje y boton de continuar
                Si no es valido: mostramos mensaje que explique por qué no es valido
                */}

                {grantUI?.showContinue && 
                    <div className="w-full max-w-lg mx-auto
                                space-y-8
                                rounded-2xl
                                border border-emerald-400/50
                                bg-green-200/15
                                backdrop-blur-md
                                p-6 md:p-8
                                shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]">
                            
                        <div className="flex gap-4 justify-center font-body">
                            <CircleCheckBig  />
                            <p>Código válido para este evento.</p>
                        </div>

                        <Button variant="outline" size="lg" className="w-full font-extrabold!" 
                            leftIcon={<CircleArrowRight />} onClick={() => {}}>CONTINUAR</Button>
                    </div>
                }

                {grantUI?.showContinue == false &&
                    <div className="flex gap-4 justify-center font-body text-red-400/80">
                        <CircleX/>
                        <p>{grantUI.title}</p>
                    </div>
                
                }


            </div>

        </section>
    );
}

export default EventRedeem;