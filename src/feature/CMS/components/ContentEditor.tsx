import { useState, useRef, useMemo, useCallback } from "react";
import JoditEditor from "jodit-react";

function ContentEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      style: {
        // background: "#111111",
        color: "#A3A3A3",
      },
    }),
    [],
  );

  const handleBlur = useCallback((newContent: any) => {
    setContent(newContent);
  }, []);

  const handleChange = useCallback(() => {
    // You can handle onChange here if needed
  }, []);

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
}

export default ContentEditor;
