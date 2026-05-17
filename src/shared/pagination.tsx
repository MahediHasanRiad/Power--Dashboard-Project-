import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationFieldProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "…")[] {

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "…", total];
  if (current >= total - 3) return [1, "…", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

export function PaginationField({ currentPage, totalPages, onPageChange }: PaginationFieldProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <Pagination className="mt-6 flex justify-end">
      <PaginationContent className="gap-1.5">

        {/* Prev */}
        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Go to previous page"
            disabled={currentPage === 1}
            className="h-[38px] w-[38px] flex items-center justify-center rounded-[10px]
              bg-[#1A1A1A] border border-[#2a2a2a] text-[#666]
              hover:text-[#D4A017] hover:border-[rgba(212,160,23,0.3)] hover:bg-[#1e1a0f]
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-150 active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>
        </PaginationItem>

        {/* Pages */}
        {pages.map((page, i) =>
          page === "…" ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <span className="h-[38px] w-[38px] flex items-center justify-center text-[#555] text-sm">
                ···
              </span>
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => { e.preventDefault(); onPageChange(page); }}
                className={`h-[38px] min-w-[38px] px-2.5 flex items-center justify-center
                  rounded-[10px] text-[13px] font-medium border cursor-pointer
                  transition-all duration-150 active:scale-95
                  ${page === currentPage
                    ? "bg-[#2C2616] text-[#D4A017] border-[rgba(212,160,23,0.35)]"
                    : "bg-[#1A1A1A] text-[#A3A3A3] border-[#2a2a2a] hover:bg-[#262626] hover:text-white hover:border-[#333]"
                  }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page" 
            className="h-[38px] w-[38px] flex items-center justify-center rounded-[10px]
              bg-card-bg-0 border border-[#2a2a2a] text-[#666]
              hover:text-secondary-0 hover:border-[rgba(212,160,23,0.3)] hover:bg-[#1e1a0f]
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-150 active:scale-95"
          >
            <ChevronRight size={16} />
          </button>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
}