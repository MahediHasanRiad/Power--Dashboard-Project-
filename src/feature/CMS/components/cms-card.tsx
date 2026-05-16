import { useSelector } from "react-redux";
import type { CMSPageType, getInitialDataType } from "../cms-type";
import type { RootState } from "@/store/store";

export interface CardType {
  title: CMSPageType;    
  currentPage: CMSPageType;
  currentPageHandler?: (data: getInitialDataType) => void; 
}

export function CMSCard({
  title,
  currentPage,
  currentPageHandler,
}: CardType) {

  // get all data then send with condition
  const { data } = useSelector((state: RootState) => state.cms);

  // send data for show in display
  const sendData = () => {
    data?.map((item) => {
      if (item?.title === title) {
        currentPageHandler?.(item);
      }
    });
  };

  return (
    <section className="mx-4 cursor-pointer" onClick={sendData}>
      <div className="relative bg-card-bg-0 rounded-2xl p-4 w-full max-w-xs overflow-hidden">
        {title === currentPage && (
          <div className="absolute left-0 top-3 bottom-3 w-1 bg-secondary-0 rounded-r-full" />
        )}

        <div className="flex flex-col gap-1 pl-2">
          <h3 className="text-white text-xl md:text-md sm:text-sm font-bold tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </section>
  );
}
