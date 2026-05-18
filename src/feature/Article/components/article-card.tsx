import type { ArticleCardType } from "../article-type";
import DOMPurify from "dompurify";
import { useState } from "react";
import { SelectCard } from "./select-article";
import { EditArticleField } from "./Edit-article-card";
import { AlertDialogField } from "@/shared/aleart-dialog";

export type ArticleCardSelectType = "Edit" | "Delete";

function ArticleCard({ id, img, title, category, description }: ArticleCardType) {
  const [selectFiled, setSelectField] = useState<ArticleCardSelectType>();

  const selectHandler = (data: ArticleCardSelectType) => {
    setSelectField(data);
  };

  const confirmHandler = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <section className="bg-card-bg-0 rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-200 cursor-pointer group">
        {/* Image */}
        <section className="relative w-full h-48 overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <SelectCard selectHandler={selectHandler} />
          </div>
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </section>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#525252]">
            {category}
          </span>
          <p className="text-white font-bold text-base leading-tight line-clamp-2">
            {title}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(description),
            }}
            className="text-[#A3A3A3] text-sm line-clamp-3 leading-relaxed"
          />
        </div>
      </section>

      {/* ✅ Inside return, controlled by open prop */}
      <EditArticleField
        open={selectFiled === "Edit"}
        onClose={() => setSelectField(undefined)}
      />
      <AlertDialogField
        open={selectFiled === "Delete"}
        onClose={() => setSelectField(undefined)}
        id={id}
        text="Delete"
        title="Are you sure ?"
        description="Are you sure you want to delete this article? This action cannot be undone, and the article will be permanently removed from your dashboard and live feed."
        confirmHandler={confirmHandler}
        btnNeed={false}
      />
    </>
  );
}

export default ArticleCard;
