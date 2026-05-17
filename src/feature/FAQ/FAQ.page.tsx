import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { FAQFilterBtn } from "./utils/filter-button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { GetAllFAQThunk } from "./redux/get-all-faq-data.thunk";
import { Loading } from "@/shared/isLoading";
import Error from "@/shared/isError";
import {
  DialogBoxField,
  type CreateFAQInitialValueType,
} from "@/shared/dialog-box-(create)";
import { EditDialogBoxField } from "@/shared/dialog-box-(edit)";
import { AlertDialogField } from "@/shared/aleart-dialog";
import { toast } from "sonner";
import { DeleteFAQThunk } from "./redux/delete-FAQ.thunk";

export type FAQType = "Buying" | "Selling" | "Services" | "TrustAndSafety";

const initialValue: CreateFAQInitialValueType = {
  question: "",
  answer: "",
  category: "Buying",
};

export function FAQPage() {
  const filters: FAQType[] = [
    "Buying",
    "Selling",
    "Services",
    "TrustAndSafety",
  ];

  const [activeFilter, setActiveFilter] = useState<FAQType>("Buying");


  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, isError, data } = useSelector(
    (state: RootState) => state.FAQ,
  );

  // Handle filter option
  const handleFilter = (filterValue: FAQType) => {
    setActiveFilter(filterValue);
  };

  // ---------------- Get data whenever activeFilter changes ----------
  useEffect(() => {
    (async () => {
      await dispatch(GetAllFAQThunk(activeFilter));
    })();
  }, [activeFilter, dispatch]);

  // ---------------- Get data whenever activeFilter changes ----------

  // ----------------- Delete FAQ data start -----------------

  const deleteHandler = async (id: number) => {
    try {
      await dispatch(DeleteFAQThunk(id)).unwrap()
      toast.success('Successfully delete data')
    } catch (error) {
      toast.error('Delete Failed !!!')
    }
  }

  // ----------------- Delete FAQ data end -----------------

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error isError={isError} />;
  }

  return (
    <section className="w-full bg-card-bg-0 rounded-2xl p-6 sm:p-8 md:p-12">
      <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-gray-800/40 mb-8">
        {/* Left Part: Text & Header */}
        <div className="max-w-xl">
          <span className="text-[10px] font-bold tracking-[0.25em] text-secondary-0 uppercase block mb-1">
            FAQs
          </span>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight">
            Frequently Asked <br className="hidden md:block" /> Questions
          </h2>
          <p className="text-[#525252] text-sm mt-2 leading-relaxed">
            Everything you need to know about the platform. Can't find an
            answer?{" "}
            <span className="text-secondary-0 cursor-pointer hover:underline underline-offset-2 transition-all">
              Contact support.
            </span>
          </p>
        </div>

        {/* Right Part: Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-1">
          {filters.map((filter) => (
            <FAQFilterBtn
              key={filter}
              filter={filter}
              activeFilter={activeFilter}
              setActiveFilter={handleFilter}
            />
          ))}
        </div>
      </div>

      {/* --- BOTTOM BODY --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="md:col-span-12">
          
          {/* add button  */}
          <div className="float-end mb-4">
            <DialogBoxField question={""} answer={""} category={"Buying"} />
          </div>

          {/* Accordion  */}
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-0"
          >
            {data?.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                className="border-b border-card-bg-0 last:border-b-0"
              >
                <AccordionTrigger
                  className="
                    py-5 text-left text-sm md:text-base font-medium text-[#A3A3A3]
                    hover:text-white hover:no-underline
                    data-[state=open]:text-white
                    transition-colors duration-200
                    [&>svg]:text-[#525252] [&>svg]:data-[state=open]:text-secondary-0
                    [&>svg]:transition-colors [&>svg]:duration-200
                  "
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#d2d1d1] text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
                <AccordionContent className="flex pb-5 float-end space-x-2">
                  
                  {/* edit button */}
                  <EditDialogBoxField
                    id={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    category={faq.category}
                    text="Edit"
                  />

                  {/* delete button  */}
                  <AlertDialogField
                    id={faq.id}
                    text={"Delete"}
                    title={"Delete FAQ Entry?"}
                    description={
                      "Are you sure you want to delete this frequently asked question? This action cannot be undone, and it will be permanently removed from the public Help Center immediately."
                    }
                    confirmHandler={deleteHandler}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
