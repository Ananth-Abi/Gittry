import { useState } from "react";
import { NavLink } from "react-router-dom";

import {
    Home, 
    Users,
    HeartHandshake,
    Building2,
    BadgeDollarSign,
    LogOut,
    ChevronFirst,
    ChevronLast,
    Menu,
    X
} from "lucide-react";

import logo from "../assets/linkara_logo.png"

type MenuItem = {
    label: string;
    path: string;
    icon: React.ElementType;
}

const menuItems: MenuItem[] = [
    { label: "Home", path: "/", icon: Home },
    { label: "Communities", path: "/communities", icon: Users },
    { label: "Volunteering", path: "/volunteering", icon: HeartHandshake },
    { label: "Sponsors", path: "/sponsors", icon: Building2 },
    { label: "Sponsorship", path: "/sponsorship", icon: BadgeDollarSign }
];


const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 rounded-lg bg-primary p-2 text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/30 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    z-50 flex h-screen flex-col bg-white fixed top-0 left-0 md:sticky md:top-0 transition-all duration-300 ease-in-out 
                    ${collapsed ? "w-20" : "w-64"}
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                    shadow-2xl
                `}
            >
                {/* Header */}
                <div 
                    className="flex items-center border-b border-gray-700 px-4 py-4"
                >
                    {/* Logo */}
                    <img 
                        src={logo}
                        alt="Linkara"
                        className={`
                            transition-all duration-300 ease-in-out 
                            ${collapsed ? "opacity-0 w-0" : "opacity-100 w-40 h-12"}
                        `}
                    />

                    {/* Collapse button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`rounded-lg p-1 hover:bg-primary hover:text-white transition-all text-primary cursor-pointer
                            ${collapsed ? "mx-auto" : "ml-auto"}
                        `}
                    >
                        {collapsed ? <ChevronLast /> : <ChevronFirst />}
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex-1 space-y-2 px-2 py-4">
                    {menuItems.map(({ label, path, icon: Icon }) => (
                        <NavLink
                            key={label}
                            to={path}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) => 
                                `
                                group relative flex items-center h-12 rounded-full px-3 transition-all duration-300 ease-in-out text-primary cursor-pointer
                                ${collapsed ? "justify-center" : "justify-start"}
                                ${
                                    isActive 
                                        ? "bg-primary text-white" 
                                        : "hover:bg-primary hover:text-white"
                                }
                                `
                            }
                        >
                            {/* Menu icon */}
                            <Icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                            {/* Menu label */}
                            <span
                                className={`
                                    transition-all duration-300 ease-in-out
                                    ${collapsed
                                        ? "opacity-0 w-0 translate-x-2 overflow-hidden"
                                        : "opacity-100 w-auto translate-x-0 ml-3"
                                    }
                                `}
                            >
                                {label}
                            </span>

                            {/* Menu tooltip/collapsed */}
                            {collapsed && (
                                <span className="
                                    absolute left-null ml-4 rounded-md px-3 py-1 text-sm text-white opacity-0 transition group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 bg-primary
                                "
                                >
                                    {label}
                                </span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout */}
                <div className="border-t border-gray-700 px-2 py-4">
                    <button
                        className={`
                            group relative flex items-center h-12 w-full rounded-full px-3 transition-all duration-300 ease-in-out cursor-pointer
                            ${collapsed ? "justify-center" : "justify-start"}
                            text-red-400 hover:bg-primary
                        `}
                    >
                        {/* Logout icon */}
                        <LogOut className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />

                        {/* Logout label */}
                        <span
                            className={`
                                transition-all duration-300 ease-in-out
                                ${collapsed
                                    ? "opacity-0 w-0 translate-x-2 overflow-hidden"
                                    : "opacity-100 w-auto translate-x-0 ml-3"
                                }
                            `}
                        >
                            Logout
                        </span>
                    </button>

                    {/* Logout tooltip */}
                    {collapsed && (
                        <span 
                            className="
                                absolute left-null ml-4 rounded-md bg-red-400 px-3 py-1 text-sm text-white opacity-0 transition group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 
                            "
                        >
                            Logout
                        </span>
                    )}
                </div>
            </aside>
        </>
    )
}

export default Sidebar