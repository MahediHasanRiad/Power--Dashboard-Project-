import { Lock } from "lucide-react";
import ButtonField from "../Setting/components/button-field";
import { InputField } from "../Setting/components/input-field";
import TopTitle from "../Setting/components/top-title";


export default function LoginPage() {
  return (
    <section className="w-full bg-card-bg-0 p-10 min-h-screen font-sans">
        <TopTitle Icon={Lock} text="Log-In" />

        {/* input field  */}
        <div className="flex-1 w-full space-y-8 max-w-4xl">
          <div className="space-y-2">
            <InputField label="Email" placeholder="Enter your email id..." />
            <InputField
              label="Password"
              placeholder="*************"
            />
          </div>

          {/* Footer */}
          <div className="pt-10 border-t border-card-bg-0 flex justify-end">
            <ButtonField text="Save Changes" />
          </div>
        </div>
    </section>
  )
}
