import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (value: 'USER' | 'ADMIN') => void; 
}

export default function SelectField({ label, name, value, onChange, placeholder }: SelectFieldProps) {
  return (
    <section className="my-2">
      {/* Label styled exactly like your InputField */}
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text-0">
        {label}
      </label>

      <Select name={name} value={value} onValueChange={onChange}>
        <SelectTrigger 
          className="w-full bg-card-bg-0 border mt-2 border-white rounded-lg px-4 py-7 text-white text-sm focus:ring-0 focus:ring-offset-0 focus:border-[#D4A017]/50 transition-colors"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        
        <SelectContent className="bg-card-bg-0 border-white/20 text-white">
          <SelectGroup>
            <SelectItem value="USER" className="focus:bg-[#D4A017] focus:text-black">User</SelectItem>
            <SelectItem value="ADMIN" className="focus:bg-[#D4A017] focus:text-black">Admin</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}