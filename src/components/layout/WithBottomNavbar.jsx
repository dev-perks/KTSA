import BottomNavbar from "../BottomNavbar";

export default function WithBottomNavbar({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-auto">{children}</div>
      <BottomNavbar />
    </div>
  );
}
