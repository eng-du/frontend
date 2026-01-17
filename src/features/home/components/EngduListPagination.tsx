import Pagination from "@/components/Pagination";

interface EngduListPaginationProps {
  totalPages: number;
  page: number;
  onChangePage: (page: number) => void;
}

function EngduListPagination({ totalPages, page, onChangePage }: EngduListPaginationProps) {
  return <Pagination totalPages={totalPages} page={page} onChangePage={onChangePage} />;
}

export default EngduListPagination;
