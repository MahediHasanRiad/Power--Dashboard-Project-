import { useEffect, useState } from "react";
import { CMSCard } from "./components/cms-card";
import ContentEditor from "./components/ContentEditor";
import type { getInitialDataType } from "./cms-type";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { GetAllCMSDataThunk } from "./redux/get-all-cms-data.thunk";
import { toast } from "sonner";

const initialState: getInitialDataType = {
  id: "0",
  title: "TERMS_CONDITION",
  content: "",
};

function CMSpage() {

  // cash data
  const [currentPage, setCurrentPage] = useState<getInitialDataType>(initialState);
  const { data, isError, isLoading } = useSelector((state: RootState) => state.cms,);
  const dispatch = useDispatch<AppDispatch>();

  const currentPageHandler = (data: getInitialDataType) => {
    setCurrentPage(data);
  };

  // get all data
  useEffect(() => {
    (async () => {
      try {
        await dispatch(GetAllCMSDataThunk()).unwrap();
      } catch (error: any) {
        toast.error(error);
      }
    })();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError}</div>;

  return (
    <section className="">
      {/* top part  */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full pt-0 pb-4 pr-4 pl-4">
        {/* Header Section */}
        <div className="md:col-span-12 lg:col-span-6">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            CMS Management
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="md:col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(data) &&
            data?.map((info) => (
              <CMSCard
                key={info.id}
                title={info.title}
                currentPage={currentPage.title}
                currentPageHandler={currentPageHandler}
              />
            ))}
        </div>
      </section>

      {/* content body  */}
      <section>
        <ContentEditor
          id={currentPage.id}
          title={currentPage.title}
          contentData={currentPage.content}
        />
      </section>
    </section>
  );
}

export default CMSpage;
