import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FAQType } from "@/feature/FAQ/FAQ.page";

interface SelectType {
    selectHandler: (data: FAQType) => void
}

export function SelectField({selectHandler} : SelectType) {
  return (
    <div className="space-y-2" >
      <Label htmlFor="username-select">Category</Label>
      
      <Select name="username" defaultValue="@peduarte" onValueChange={(value) => selectHandler(value as FAQType)}>
        <SelectTrigger 
          id="username-select" 
          className="w-full bg-transparent border-gray-800 text-black focus:ring-secondary/50"
        >
          {/* Displays the currently active value selection */}
          <SelectValue placeholder="Select a user handle" />
        </SelectTrigger>
        
        <SelectContent className="bg-card-bg-0 border-gray-800 text-white">
          <SelectItem value="Buying" className="focus:bg-secondary-0 focus:text-black focus:bg-secondary-0">
            Buying
          </SelectItem>
          <SelectItem value="Selling" className="focus:bg-bg-secondary-0 focus:text-black focus:bg-secondary-0">
            Selling
          </SelectItem>
          <SelectItem value="Services" className="focus:bg-bg-secondary-0 focus:text-black focus:bg-secondary-0">
            Services
          </SelectItem>
          <SelectItem value="TrustAndSafety" className="focus:bg-bg-secondary-0 focus:text-black focus:bg-secondary-0">
            Trust & Safety 
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}