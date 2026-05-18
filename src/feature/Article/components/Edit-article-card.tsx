import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ContentEditor from "@/feature/CMS/components/ContentEditor";
import type { AppDispatch } from "@/store/store";
import { useState, type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { updateArticleThunk } from "../redux/update-article.thunk";

interface EditArticleFieldProps {
  open: boolean;
  onClose: () => void;
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | File | null;
}

interface EditArticleStateType {
  id?: number;
  title?: string;
  category?: string;
  description?: string;
  image_url?: string | File | null; 
}

const initialValue = {
  title: "",
  category: "",
  description: "",
  image_url: "",
};

export function EditArticleField({
  open,
  onClose,
  id,
  title,
  category,
  description,
  image,
}: EditArticleFieldProps) {

  const [editArticleData, setEditArticleData] = useState<EditArticleStateType>(initialValue);
  const dispatch = useDispatch<AppDispatch>()

  // get data from content-editor
  const getDataFromContentEditor = (data: any) => {
    setEditArticleData((prev) => ({
      ...prev,
      description: data,
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditArticleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditArticleData((prev) => ({ ...prev, image_url: file }));
    }
  };


  // handle submit + update in DB
  const handleSubmit = async (data:EditArticleStateType ) => {
    try {

      const formData = new FormData()
      if(data.title) formData.append('title', data.title)
      if(data.category) formData.append('category', data.category)
      if(data.image_url instanceof File) formData.append('image_url', data.image_url)
      if(data.description) formData.append('description', data.description)

      await dispatch(updateArticleThunk({id, formData})).unwrap()
      toast.success('Successfully updated !!!')
    } 
    catch (error) {
      toast.error('Article Update Failed !!!')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col bg-card-bg-0 border border-[#2a2a2a] text-white overflow-hidden">
        <form className="flex flex-col flex-1 overflow-hidden">
          {/* Header — fixed */}
          <DialogHeader className="shrink-0">
            <DialogTitle className="text-white">Edit Article</DialogTitle>
            <DialogDescription className="text-[#525252]">
              Make changes to your article here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto py-4 pr-1">
            <FieldGroup>
              <Field>
                <Label htmlFor="title" className="text-[#A3A3A3]">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  className="bg-card-bg-0 border-[#2a2a2a] text-white"
                  defaultValue={title}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="category" className="text-[#A3A3A3]">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  className="bg-card-bg-0 border-[#2a2a2a] text-white"
                  defaultValue={category}
                  onChange={handleChange}
                />
              </Field>
              <Field>
                <Label htmlFor="image" className="text-[#A3A3A3]">
                  Image
                </Label>
                <Input
                  type="file"
                  id="image"
                  name="image_url"
                  className="bg-card-bg-0 border-[#2a2a2a] text-white"
                  onChange={handleFileChange}
                />
              </Field>
              <Field>
                <ContentEditor
                  id={"1"}
                  title={"Description"}
                  contentData={description}
                  topbar={false}
                  getData={getDataFromContentEditor}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Footer — fixed */}
          <DialogFooter className="shrink-0 pt-2 border-t">
            <DialogClose asChild>
              <Button onClick={onClose}>Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={() => handleSubmit(editArticleData)}>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
