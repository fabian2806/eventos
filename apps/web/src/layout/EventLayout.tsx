import useEvent from "@/features/events/hooks/useEvent";
import { Outlet, useParams } from "react-router-dom";

const EventLayout = () => {
    const {eventId} = useParams();
    if (!eventId) return null;

    const numEventId = Number(eventId);

    const {event, loading, error} = useEvent(numEventId);

    if (loading) return <div>Cargando evento…</div>;
    if (error || !event) return <div>No se pudo cargar el evento</div>;


    console.log("eventId:", eventId, " event:", event);
    return <Outlet context={{numEventId, event}}/>
}

export default EventLayout;