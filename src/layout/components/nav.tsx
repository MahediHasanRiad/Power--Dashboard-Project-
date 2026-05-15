import { Menu } from "lucide-react";

function NavbarField({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="grid grid-cols-6 items-center px-4 md:px-8 py-4 bg-primary-bg-0 gap-4 border-b border-gray-800">
      
      {/* Logo & Mobile Toggle Section */}
      <div className="col-span-3 md:col-span-1 flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="md:hidden p-2 text-gray-400 hover:text-[#D4A017] transition-colors"
        >
          <Menu className="size-6" />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0">
          <img className="w-32 md:w-40" src="../../../public/logo.png" alt="MAKTech Logo" />
        </div>
      </div>

      {/* Spacer (Hidden on mobile to keep profile on the right) */}
      <div className="hidden md:block md:col-span-4" />

      {/* Profile Section  */}
      <div className="col-span-3 md:col-span-1 flex items-center justify-end">
        <div className="relative group cursor-pointer">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-[#D4A017] transition-colors">
            <img
              src="../../../public/riad.jpg"
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Optional: Small status dot to match your "Live" indicator style */}
          <span className="absolute bottom-0 right-0 size-3 bg-[#10B981] border-2 border-primary-bg-0 rounded-full"></span>
        </div>
      </div>
    </nav>
  );
}

export default NavbarField;