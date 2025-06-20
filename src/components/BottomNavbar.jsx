import { NavLink } from "react-router-dom";
import { navItems } from "../utils/navItems";

const BottomNavbar = () => (
  <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
    <div className="flex justify-around py-2">
      {navItems.map(({ label,icon: Icon, to }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center ${
              isActive ? "text-blue-600" : "text-gray-500"
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs mt-1">{label}</span>
        </NavLink>
      ))}
    </div>
  </div>
);

export default BottomNavbar;
