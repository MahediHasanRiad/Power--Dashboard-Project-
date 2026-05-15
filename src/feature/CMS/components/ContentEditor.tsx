import { useState, useRef, useMemo, useCallback } from "react";
import JoditEditor from "jodit-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { cmsThunk } from "../redux/cms.thunk";
import { toast } from "sonner";

function ContentEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      theme: "dark",
      // Specific button set from your screenshot
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
        background: "#111111", // Toolbar/Header background
        color: "#A3A3A3", // Default text color
        fontFamily: "Inter, sans-serif",
      },
      // "AUTO-SAVED" text placement
      extraButtons: [
        {
          name: "autosave",
          exec: () => {},
          template: (editor: any) =>
            `<span style="font-size: 9px; color: #525252; font-weight: bold; text-transform: uppercase; margin-left: 20px;">
          Auto-saved 14:02
        </span>`,
        },
      ],
    }),
    [],
  );

  const handleBlur = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const handleChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = async () => {
    try {
      console.log(content);
      await dispatch(cmsThunk(content)).unwrap();
      toast.success("Success");
    } 
    catch (error: any) {
      const errorMessage = error?.message || error?.error ||
        (typeof error === "string" ? error : "Failed to update settings.");

      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className=" mx-auto overflow-hidden rounded-2xl border border-card-bg-0 bg-[#111111]">
        {/* Editor Header Section */}
        <div className="p-8 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-white text-md md:text-3xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="size-1.5 rounded-full bg-[#10B981]" />
              <span className="text-secondary-text-0 text-[8px]  md:text-xs font-medium">
                Live on production environment
              </span>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-secondary-0 hover:bg-[#B88A14] text-black text-[10px] px-1 py-1.5  md:text-sm font-bold md:px-8 md:py-3 rounded-lg transition-transform active:scale-95"
          >
            Publish Changes
          </button>
        </div>

        {/* The Editor Instance */}
        <div className="jodit-custom-wrapper px-4 pb-4">
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentEditor;
