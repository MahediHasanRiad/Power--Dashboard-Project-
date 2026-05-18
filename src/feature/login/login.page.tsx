import { Lock } from "lucide-react";
import ButtonField from "../Setting/components/button-field";
import { InputField } from "../../shared/input-field";
import TopTitle from "../Setting/components/top-title";
import { useState, type ChangeEvent } from "react";
import axios from "axios";
import SelectField from "./component/select";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { authThunk } from "./redux/auth.thunk";

export interface InputType {
  email: string;
  password: string;
  role: "USER" | "ADMIN";
}

const initialValues: InputType = {
  email: "",
  password: "",
  role: "USER",
};

export default function LoginPage() {
  const [formData, setFormData] = useState<InputType>(initialValues);
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async () => {
    try {
      console.log(formData)
      const {access_token} = await dispatch(authThunk(formData)).unwrap()
      localStorage.setItem('access-token', access_token);
      window.location.href = "/";
      
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  return (
    <section className="w-full bg-card-bg-0 p-10 min-h-screen font-sans">
      <TopTitle Icon={Lock} text="Log-In" />

      {/* input field  */}
      <div className="flex-1 w-full space-y-8 max-w-4xl">
        <div className="space-y-2">
          <InputField
            name="email"
            label="Email"
            placeholder="Enter your email id..."
            onChange={handleChange}
            value={formData.email}
          />
          <InputField
            name="password"
            label="Password"
            placeholder="*************"
            onChange={handleChange}
            value={formData.password}
          />
          <SelectField
            label="User Role"
            name="role"
            value={formData.role}
            placeholder="Select a role"
            onChange={(val) => setFormData((prev) => ({ ...prev, role: val }))}
          />
        </div>

        {/* Footer */}
        <div
          className="pt-10 border-t border-card-bg-0 flex justify-end"
          onClick={handleLoginSubmit}
        >
          <ButtonField text="Save Changes" />
        </div>
      </div>
    </section>
  );
}
