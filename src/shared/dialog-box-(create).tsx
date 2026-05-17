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
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { createFAQthunk } from "@/feature/FAQ/redux/create-FAQ.thunk";

export interface CreateFAQInitialValueType {
  question: string;
  answer: string;
  category: FAQType;
}

const initialValue: CreateFAQInitialValueType = {
  question: "",
  answer: "",
  category: "Buying",
};

export function DialogBoxField() {

  const [inputValue, setInputValue] = useState<CreateFAQInitialValueType>(initialValue);
  const dispatch =  useDispatch<AppDispatch>()

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

  // submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await dispatch(createFAQthunk(inputValue))
      toast.success('Successfully create an FAQ !!!')
    } catch (error) {
      toast.error('Failed to create FAQ !!!')
    }
    
    
    setInputValue(initialValue);
    console.log("Submitting final data object:", inputValue);
  };

  return (
    <Dialog>
      <form id="faq-creation-form" onSubmit={submitHandler}>
        <DialogTrigger asChild>
          <Button variant="outline">ADD</Button>
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
                defaultValue=""
                onChange={onChangeHandler}
              />
            </Field>
            <Field>
              <Label htmlFor="answer">Answer</Label>
              <Input
                id="answer"
                name="answer"
                defaultValue=""
                onChange={onChangeHandler}
              />
            </Field>
            <Field>
              <SelectField selectHandler={selectHandler} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" variant="outline" form="faq-creation-form">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
