import { InputField } from "@/shared/input-field";
import ContentEditor from "../CMS/components/ContentEditor";
import { useState, type ChangeEvent } from "react";
import ButtonField from "@/shared/button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { createArticleThunk } from "./redux/create-article.thunk";
import type { initialArticleValueType } from "./article-type";

const initialValue: initialArticleValueType = {
  title: "",
  category: "",
  image_url: "",
  description: "",
};

function ArticlePage() {
  const [inputValue, setInputValue] = useState({
    ...initialValue,
    image_url: null as File | null,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputValue((prev) => ({ ...prev, image_url: file }));
    }
  };

  // get data from content-editor
  const getDataFromContentEditor = (data: any) => {
    setInputValue((prev) => ({
      ...prev,
      description: data,
    }));
  };

  // handle submit form
  const handleSubmit = async (data: initialArticleValueType) => {
    try {
      const formData = new FormData();
      if (data.title) formData.append("title", data.title);
      if (data.category) formData.append("category", data.category);
      if (data.image_url instanceof File) formData.append("image_url", data.image_url);
      if (data.description) formData.append("description", data.description);

      await dispatch(createArticleThunk(formData)).unwrap();

      toast.success("Successfully created !!!");
      console.log("input", formData);
    } 
    catch (error) {
      console.error(error) 
      toast.error("Create Article Failed !!!");
    }
  };

  return (
    <section>
      {/* top title  */}
      <div>
        <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-tight px-8">
          Create new Article
        </h1>
      </div>
      <section>
        <div className="px-8">
          <InputField
            label="Title"
            name="title"
            onChange={handleChange}
            placeholder="what would be the title in this article..."
            value={inputValue.title}
          />
          <InputField
            label="Category"
            name="category"
            onChange={handleChange}
            placeholder="Describe you perspective on this title..."
            value={inputValue.category}
          />
          <InputField
            label="Image"
            name="image_url"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <ContentEditor
            id={"1"}
            title={"Description"}
            contentData={""}
            topbar={false}
            getData={getDataFromContentEditor}
          />
        </div>
        <div className="float-end px-8">
          <ButtonField handleSubmit={() => handleSubmit(inputValue)} text="Create Article" />
        </div>
      </section>
    </section>
  );
}

export default ArticlePage;
