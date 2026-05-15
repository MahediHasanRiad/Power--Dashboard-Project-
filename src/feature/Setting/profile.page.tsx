import { User } from "lucide-react";
import { InputField } from "./components/input-field";
import ButtonField from "./components/button-field";
import EditProfile from "./components/Edit-Profile";
import TopTitle from "./components/top-title";

export function UpdateProfile() {
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
            <InputField label="Full Name" placeholder="Enter your name..." />
            <InputField
              label="Email Address"
              placeholder="Enter your email..."
              readonly={true}
            />
            <InputField label="Phone Number" placeholder="*************" />
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-card-bg-0 flex justify-end">
            <ButtonField text="Save Changes" />
          </div>
        </div>
      </div>
    </section>
  );
}
