import Button from "@/shared/components/Button";
import { QrCode, Ticket } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EventAccess = () => {

    const navigate = useNavigate();
    const {eventId} = useParams();

    return(
        <section className="min-h-screen flex flex-col justify-center items-center text-white">
            <div className="w-full max-w-4xl text-center space-y-12">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-display font-black">¿TIENES UN CÓDIGO DE ACCESO?</h1>
                    <div className="text-white/80 font-body text-lg md:text-xl leading-relaxed">
                        <p>Si ya cuentas con tu código de acceso, puedes reclamar tu QR inmediatamente.</p>
                        <p>Caso contrario, puedes comprar tu código de acceso ahora.</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Button variant="primary" size="xl" className="w-full max-w-md font-extrabold!" 
                        leftIcon={<QrCode/>} onClick={() => {navigate(`/events/${eventId}/redeem`)}}>TENGO UN CÓDIGO</Button>
                    <Button variant="outline" size="xl" className="w-full max-w-md font-extrabold!" 
                        leftIcon={<Ticket/>} onClick={() => {navigate(`/events/${eventId}/tickets`)}}>NO TENGO UN CÓDIGO</Button>
                </div>
            </div>
        </section>
    );
}

export default EventAccess;