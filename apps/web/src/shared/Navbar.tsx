import Button from "./components/Button";
import Logo from "./components/Logo";
import { LogIn } from "lucide-react";



const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 h-32 bg-black/30 backdrop-blur-md">
            <nav className="w-full px-6 py-4 flex h-full items-center justify-between">
                <Logo/>
                <Button className="h-[80%] text-xl! font-bold!" leftIcon={<LogIn className="h-8 w-8" />}>LOG IN</Button>
            </nav>
        </header>
    )
}

export default Navbar;