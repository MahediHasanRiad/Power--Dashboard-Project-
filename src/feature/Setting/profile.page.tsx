import { User } from "lucide-react";
import ButtonField from "./components/button-field";
import EditProfile from "./components/Edit-Profile";
import TopTitle from "./components/top-title";
import { InputField } from "./components/input-field";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { updateProfileThunk } from "./redux/profile.thunk";
import { toast } from "sonner";

export interface initialValueType {
  fullname?: string | undefined;
  displayname?: string| undefined;
  bio?: string| undefined;
  longitude?: string| undefined;
  latitude?: string| undefined;
}

const initialValue: initialValueType = {
  fullname: "",
  displayname: "",
  bio: "",
  longitude: "",
  latitude: "",
};

export function UpdateProfile() {
  const [inputValue, setInputValue] = useState(initialValue);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async () => {
  if (!inputValue) return;

  try {
    await dispatch(updateProfileThunk(inputValue)).unwrap();
    toast.success("Successfully updated !!!");
    setInputValue(initialValue);
    
  } catch (error: any) {
    console.error("Profile update failed:", error);
    const errorMessage = typeof error === "string" 
      ? error 
      : error?.message || "Failed to update profile info.";
    toast.error(errorMessage);
  }
};

  return (
    <section className="w-full bg-card-bg-0 p-10 min-h-screen font-sans">
      {/* Page Header */}
      <TopTitle Icon={User} text="Profile Information" />

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Profile Picture */}
        <div className="flex flex-col items-center gap-4">
          <EditProfile />
        </div>

        {/* Right Side: Form Fields */}
        <div className="flex-1 w-full space-y-8 max-w-4xl">
          <div className="space-y-2">
            <InputField
              name="fullname"
              label="Full Name"
              placeholder="Enter your name..."
              onChange={handleChange}
              value={inputValue.fullname!}
            />
            <InputField
              name="displayname"
              label="Display Name"
              placeholder="Enter your display name..."
              onChange={handleChange}
              value={inputValue.displayname!}
            />
            <InputField
              name="bio"
              label="bio"
              placeholder="what's on your mind 🤔"
              onChange={handleChange}
              value={inputValue.bio!}
            />
            <InputField
              name="longitude"
              label="longitude"
              placeholder="8.5"
              onChange={handleChange}
              value={inputValue.longitude!}
            />
            <InputField
              name="latitude"
              label="latitude"
              placeholder="12.5"
              onChange={handleChange}
              value={inputValue.latitude!}
            />
          </div>

          {/* Footer */}
          <div
            className="pt-10 border-t border-card-bg-0 flex justify-end"
            onClick={handleSubmit}
          >
            <ButtonField text="Save Changes" />
          </div>
        </div>
      </div>
    </section>
  );
}
