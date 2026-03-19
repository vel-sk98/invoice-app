import { createRootRoute, Outlet } from "@tanstack/react-router";
import '../styles/layout.css'
import Sidebar from "../components/Sidebar/Sidebar";


export const Route = createRootRoute(
    {
        component: () => {
            
            return (
                <div className="hero">
                    <Sidebar/>
                    <main className="hero-content">
                        <Outlet/>
                        
                    </main>
                </div>
            )
        }
    }
) 
