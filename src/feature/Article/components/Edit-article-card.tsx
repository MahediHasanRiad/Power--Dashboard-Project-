import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditArticleFieldProps {
  open: boolean
  onClose: () => void
}

export function EditArticleField({ open, onClose }: EditArticleFieldProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-card-bg-0 border border-[#2a2a2a] text-white">
        <form>
          <DialogHeader>
            <DialogTitle className="text-white">Edit Article</DialogTitle>
            <DialogDescription className="text-[#525252]">
              Make changes to your article here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="title" className="text-[#A3A3A3]">Title</Label>
              <Input id="title" name="title" className="bg-card-bg-0 border-[#2a2a2a] text-white" />
            </Field>
            <Field>
              <Label htmlFor="category" className="text-[#A3A3A3]">Category</Label>
              <Input id="category" name="category" className="bg-card-bg-0 border-[#2a2a2a] text-white" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}