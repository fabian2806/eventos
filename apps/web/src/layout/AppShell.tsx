import { Outlet } from "react-router-dom";
import StarfieldBackground from "./StarfieldBackground";

const AppShell = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Fondo monocromático: negro con aclarado suave */}
            <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black via-[#07070a] to-[#0b0b12]" />
        
           <StarfieldBackground/>

            {/* Viñeta para enfoque al centro (y que estrellas no “tapen”) */}
            <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,transparent_0%,black_60%)] bg-black/30" />

           <Outlet/>
       </div>

    );
}

export default AppShell;