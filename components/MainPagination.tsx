import { usePathname, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function MainPagination({
  page,
  lastPage,
  paramPage,
}: {
  page: number;
  lastPage: number;
  paramPage?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  function goToPage(p: number) {
    const params = new URLSearchParams();
    params.set(paramPage ?? "page", p.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => goToPage(page > 1 ? page - 1 : 1)}
            disabled={page <= 1}
          />
        </PaginationItem>

        {/* Always show page 1 */}
        <PaginationItem>
          <PaginationLink isActive={page === 1} onClick={() => goToPage(1)}>
            1
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis */}
        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Middle pages: page-1, page, page+1 */}
        {Array.from([page - 1, page, page + 1])
          .filter((p) => p > 1 && p < lastPage)
          .map((p) => (
            <PaginationItem key={p}>
              <PaginationLink isActive={page === p} onClick={() => goToPage(p)}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

        {/* Right ellipsis */}
        {page < lastPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Last page */}
        {lastPage > 1 && (
          <PaginationItem>
            <PaginationLink
              isActive={page === lastPage}
              onClick={() => goToPage(lastPage)}
            >
              {lastPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(page < lastPage ? page + 1 : lastPage)}
            disabled={page >= lastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
