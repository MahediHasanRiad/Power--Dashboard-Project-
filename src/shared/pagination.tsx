import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationFieldProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationField({ currentPage, totalPages, onPageChange }: PaginationFieldProps) {
  // Guard clause: Don't render pagination if there's only 1 page or none
  if (totalPages <= 1) return null;

  // Generate an array of page numbers dynamically (e.g., [1, 2, 3, 4, 5])
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="mt-6 flex justify-end">
      <PaginationContent>
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault(); // Prevents page from jumping/reloading due to href="#"
                onPageChange(page);
              }}
              className="cursor-pointer font-medium"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}