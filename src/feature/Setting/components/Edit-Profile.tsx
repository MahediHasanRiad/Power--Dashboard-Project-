import { useRef, useState } from "react";

export default function EditProfile() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("../../../../public/riad.jpg");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };
  return (
    <section>
      <div className="flex flex-col items-center gap-4">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          title="Upload profile picture"
        />

        {/* Avatar Display */}
        <div className="relative group">
          <div className="size-32 rounded-full overflow-hidden border-4 border-card-bg-0 bg-card-bg-0 shadow-2xl">
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Subtle hover effect to show it's clickable */}
          <div
            onClick={handleButtonClick}
            className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">
              Edit
            </span>
          </div>
        </div>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleButtonClick}
          className="text-[10px] font-black tracking-[0.2em] uppercase text-[#D4A017] border border-[#D4A017]/30 px-4 py-2 rounded hover:bg-[#D4A017]/10 transition-colors"
        >
          Change Photo
        </button>
      </div>
    </section>
  );
}
