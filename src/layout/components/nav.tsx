import { Bell, Menu, X } from "lucide-react";

function NavbarField() {
  return (
    <nav className="grid grid-cols-6 items-center px-8 py-4 bg-primary-bg-0 gap-6">
      {/* Logo Section - Takes up 1 column */}
      <div className="col-span-1">
        <div>
          <img className="w-50" src="/logo.png" alt="MAKTech Logo" />
        </div>
        <div className="md:hidden">
          <span><Menu /></span>
            <span><X /></span>
        </div>
      </div>


      <div className="col-span-4" />
      <div className="col-span-1 flex items-center justify-end space-x-6">
        {/* Notification Bell */}
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <Bell size={24} className="text-gray-300" />
          <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-[#0D0D0D]" />
        </div>

        {/* Profile Image */}
        <div className="relative group cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-gray-500 transition-colors">
            <img
              src="/riad.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarField;
