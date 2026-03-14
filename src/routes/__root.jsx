import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/Sidebar";
import '../styles/layout.css'

export const Route = createRootRoute(
    {
        component: () =>{
            return (
                <div className="hero">
                    <Sidebar />
                    <main className="hero-content">
                        <Outlet />
                    </main>
                    
                </div>
            )}
    }
) 
