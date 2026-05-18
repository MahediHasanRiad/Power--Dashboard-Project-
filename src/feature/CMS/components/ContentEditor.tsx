import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { cmsThunk } from "../redux/cms.thunk";
import { toast } from "sonner";
import type { CMSPageType } from "../cms-type";
import ButtonField from "@/shared/button";

interface ContentEditorProps {
  id: string;
  title: CMSPageType;
  contentData: string;
  topbar?: boolean;
  getData?: (data: string) => void;
}

function ContentEditor({
  id,
  title,
  contentData,
  topbar = true,
  getData,
}: ContentEditorProps) {
  const editor = useRef(null);

  const [content, setContent] = useState(contentData || "");

  useEffect(() => {
    setContent(contentData || "");
  }, [contentData, id]);

  const config = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "align",
        "|",
        "link",
        "image",
        "source",
      ],
      toolbarAdaptive: false,
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      height: 500,
      style: {
        background: "#111111",
        color: "#A3A3A3",
        fontFamily: "Inter, sans-serif",
      },
      extraButtons: [
        {
          name: "autosave",
          exec: () => {},
          template: () =>
            `<span style="font-size: 9px; color: #525252; font-weight: bold; text-transform: uppercase; md:margin-left: 20px;">
              Auto-saved
            </span>`,
        },
      ],
    }),
    [],
  );

  const handleBlur = useCallback((newContent: string) => {
  setContent(newContent);
  getData?.(newContent); // pass data in create article
}, [getData]);

  const dispatch = useDispatch<AppDispatch>();

  // update data
  const handleSubmit = async () => {
    try {
      await dispatch(cmsThunk({ id, title, content })).unwrap();
      toast.success("Changes saved successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        error?.error ||
        (typeof error === "string" ? error : "Failed to update settings.");

      toast.error(errorMessage);
    }
  };



  return (
    <div className="w-full md:p-8">
      <div className="mx-auto overflow-hidden rounded-2xl border border-card-bg-0 bg-card-bg-0">
        {/* Editor Header Section */}
        {topbar && (
          <div className={`md:p-8 pb-4 flex justify-between items-center`}>
            <div>
              <h1 className="text-white text-md md:text-3xl font-bold tracking-tight">
                {title
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="size-1.5 rounded-full bg-[#10B981]" />
                <span className="text-secondary-text-0 text-[8px] md:text-xs font-medium">
                  Live on production environment
                </span>
              </div>
            </div>
            <ButtonField handleSubmit={handleSubmit} text="Publish Changes" />
          </div>
        )}

        {/* The Editor Instance */}
        <div className="jodit-custom-wrapper md:px-4 pb-4">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={handleBlur}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;
