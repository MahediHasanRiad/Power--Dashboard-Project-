import { Lock } from "lucide-react";
import TopTitle from "./components/top-title";
import { InputField } from "./components/input-field";
import ButtonField from "./components/button-field";


export default function ResetPassword() {
  return (
    <section className="w-full bg-card-bg-0 p-10 min-h-screen font-sans">
        <TopTitle Icon={Lock} text="Change Password" />

        {/* input field  */}
        <div className="flex-1 w-full space-y-8 max-w-4xl">
          <div className="space-y-2">
            <InputField label="Current Password" placeholder="Enter your current password..." />
            <InputField
              label="New Password"
              placeholder="*************"
            />
            <InputField label="Confirm Password" placeholder="*************" />
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-card-bg-0 flex justify-end">
            <ButtonField text="Save Changes" />
          </div>
        </div>
    </section>
  )
}
