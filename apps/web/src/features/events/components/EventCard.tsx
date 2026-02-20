import type { EventSummaryResponse } from "@/api/types";
import Button from "@/shared/components/Button";
import { formatDate } from "@/shared/utils/date";
import { Calendar, MapPin } from "lucide-react";

type EventCardProps = {
    event: EventSummaryResponse;
    onClick: () => void;
}

const EventCard = ({event, onClick}: EventCardProps) => {
    {/*70: 280px*/}
    {/*60: 240px */}
    return (
        <div className="flex gap-4 w-full h-70 border border-white/20 bg-[radial-gradient(60%_80%_at_20%_10%,rgba(255,255,255,0.15),transparent_60%)]  
            shadow-lg backdrop-blur-[1.6px]

        rounded-xl overflow-hidden text-white">

            {/*Izquierda*/}
            <div className="flex-3 h-full min-w-60 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1506157786151-b8491531f063" 
                    alt="" className="w-full h-full object-cover"/>
            </div>

            {/*Derecha*/}
            <div className="flex-7 flex flex-col justify-between p-4">

                {/*Bloque superior: Título, dirección y fecha*/}
                <div className="flex flex-col gap-4">
                    <h2 className="line-clamp-2 text-4xl font-display font-black">{event.name}</h2>
                    <div className="flex flex-col gap-1 text-2xl">
                        <div className="font-body flex items-center gap-2">
                            <Calendar className="w-4 h-4"/>
                            <span>{formatDate(event.startsAt)}</span>
                        </div>
                        <div className="font-body text-white/80 flex items-center gap-2">
                            <MapPin className="w-4 h-4"/>
                            <p>{event.address}</p>
                        </div>
                    </div>
                </div>                

                {/*Bloque inferiror: CTA*/}
                <div>
                    <Button size="lg" className="text-xl! font-display! font-extrabold!" 
                        variant="glass" onClick={onClick}>VER ACCESOS</Button>
                </div>
            </div>
            
        </div>
    );
}

export default EventCard;