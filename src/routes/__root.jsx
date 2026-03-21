import { createRootRoute, Outlet } from "@tanstack/react-router";
import '../styles/layout.css'
import Sidebar from "../components/Sidebar/Sidebar";
import InvoiceContextProvider from "../context/InvoiceContext";


export const Route = createRootRoute(
    {
        component: () => {
            
            return (
                <InvoiceContextProvider>
                <div className="hero">
                    <Sidebar/>
                    <main className="hero-content">
                        <Outlet/>
                        
                    </main>
                    </div>
                </InvoiceContextProvider> 
            )
        }
    }
) 
