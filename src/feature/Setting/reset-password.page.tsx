import { Lock } from "lucide-react";
import TopTitle from "./components/top-title";
import { InputField } from "./components/input-field";
import ButtonField from "./components/button-field";
import { useState, type ChangeEvent } from "react";
import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { restPasswordThunk } from "./redux/reset-password.thunk";
import { toast } from "sonner";

export interface initialValueType {
  new_password: string;
}

const initialValue: initialValueType = {
  new_password: "",
};

export default function ResetPassword() {
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
      await dispatch(restPasswordThunk(inputValue)).unwrap();
      toast.success("Successfully updated !!!");
      setInputValue(initialValue);
    } 
    catch (error: any) {
      console.error("Profile update failed:", error);
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Failed to update profile info.";

      toast.error(errorMessage);
    }
  };

  return (
    <section className="w-full bg-card-bg-0 p-10 min-h-screen font-sans">
      <TopTitle Icon={Lock} text="Change Password" />

      {/* input field  */}
      <div className="flex-1 w-full space-y-8 max-w-4xl">
        <div className="space-y-2">
          <InputField
            name="new_password"
            label="New Password"
            placeholder="**************"
            onChange={handleChange}
            value={inputValue.new_password!}
          />
        </div>

        {/* Footer */}
        <div className="pt-10 border-t border-card-bg-0 flex justify-end" onClick={handleSubmit}>
          <ButtonField text="Save Changes" />
        </div>
      </div>
    </section>
  );
}
