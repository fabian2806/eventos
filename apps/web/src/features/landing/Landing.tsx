import HeroSection from "@/features/landing/components/HeroSection";
import Navbar from "@/shared/Navbar";
import { useNavigate } from "react-router-dom";

const Landing = () => {

    const navigate = useNavigate();

    return(
        <section>
            <Navbar/>
            <HeroSection onStart={() => navigate("events")}/>
        </section>
        
    );
}

export default Landing;