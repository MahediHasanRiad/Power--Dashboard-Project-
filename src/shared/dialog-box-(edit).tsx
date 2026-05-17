import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "./select";
import type { FAQType } from "@/feature/FAQ/FAQ.page";
import { useState, type ChangeEvent } from "react";
import type { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { UpdateFAQThunk } from "@/feature/FAQ/redux/update-FAQ.thunk";
import { toast } from "sonner";


export interface EditFAQInitialValueType {
  id: number;
  question: string;
  answer: string;
  category: FAQType;
  getId?: number | null;
  text?: string;
}

const initialValue: EditFAQInitialValueType = {
  id: 0,
  question: "",
  answer: "",
  category: "Buying",
};

export function EditDialogBoxField({
  id,
  question,
  answer,
  category,
  text = "ADD",
}: EditFAQInitialValueType) {
    
  const [inputValue, setInputValue] = useState<EditFAQInitialValueType>(initialValue);
  const dispatch = useDispatch<AppDispatch>();

  const selectHandler = (categoryValue: FAQType) => {
    setInputValue((prev) => ({
      ...prev,
      category: categoryValue,
    }));
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ------------------ submit handler update FAQ -----------------------
  const editSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(UpdateFAQThunk({id: Number(id), inputValue })).unwrap();
      toast.success("Successfully update FAQ !!!");
      setInputValue(initialValue);
    } 
    catch (error) {
      toast.error("Failed to update FAQ !!!");
    }
  };
  // ------------------ submit handler update FAQ -----------------------

  return (
    <Dialog>
      <form id="faq-edit-form" onSubmit={editSubmitHandler}>
        <DialogTrigger asChild>
          <Button variant="custom">{text}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Frequently Asked Questions</DialogTitle>
            <DialogDescription className="sr-only">
              Form to add a new FAQ question and answer.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="question">Question</Label>
              <Input
                id="question"
                name="question"
                defaultValue={question}
                onChange={onChangeHandler}
              />
            </Field>
            <Field>
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                name="answer"
                defaultValue={answer}
                onChange={onChangeHandler}
              />
            </Field>
            <Field>
              <SelectField
                selectHandler={selectHandler}
                defaultValue={category}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="faq-edit-form">
              {text == "Edit" ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
