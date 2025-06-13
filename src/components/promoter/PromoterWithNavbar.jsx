import PromoterNavbar from "./PromoterNavbar";

export default function PromoterWithNavbar({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 pb-24">{children}</div>
      <PromoterNavbar />
    </div>
  );
}
