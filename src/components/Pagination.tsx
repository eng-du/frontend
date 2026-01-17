import DownIcon from '@/assets/icons/chevron-down.svg?react';
import PaginationItem from './PaginationItem';
import EllipsisIcon from '@/assets/icons/ellipsis.svg?react';

interface PaginationProps {
  totalPages: number;
  page: number;
  onChangePage: (nextPage: number) => void;
}

function Pagination({ totalPages, page, onChangePage }: PaginationProps) {
  return (
    <div className="m-auto flex gap-2">
      <button
        onClick={() => {
          if (page > 1) onChangePage(page - 1);
        }}
      >
        <DownIcon className="h-5 w-5 rotate-90" />
      </button>
      {/* totalPages가 5보다 작거나 같은 경우: totalPages 개수 만큼 버튼 띄우기 */}
      {totalPages <= 5 &&
        Array.from({ length: totalPages }, (_, idx) => (
          <PaginationItem key={idx} page={idx + 1} active={page === idx + 1} onChangePage={onChangePage} />
        ))}

      {/* totalPages가 5보다 큰 경우
        - 현재 페이지가 1 ~ 4 중 있다면: < 1 2 3 4 5 ... 마지막 >
        - 현재 페이지가 5 ~ 마지막 페이지-5 중 있다면: < 1 ... 현재-1 현재 현재+1 ... 마지막 >
        - 현재 페이지가 마지막 페이지-3 ~ 마지막 페이지 중 있다면: < 1 ... 마지막-4 마지막-3 마지막-2 마지막-1 마지막 >
      */}
      {totalPages > 5 &&
        (() => {
          if (page <= 4) {
            return (
              <>
                {Array.from({ length: 5 }, (_, idx) => (
                  <PaginationItem key={idx} page={idx + 1} active={page === idx + 1} onChangePage={onChangePage} />
                ))}
                <EllipsisIcon className="self-center" />
                <PaginationItem page={totalPages} onChangePage={onChangePage} />
              </>
            );
          }
          
          if (page > totalPages - 4) { 
            return (
              <>
                <PaginationItem page={1} onChangePage={onChangePage} />
                <EllipsisIcon className="self-center" />
                {Array.from({ length: 5 }, (_, idx) => {
                  return <PaginationItem key={idx} page={totalPages - 4 + idx} active={page === totalPages - 4 + idx} onChangePage={onChangePage} />;
                })}
              </>
            );
          }

          return (
            <>
              <PaginationItem page={1} onChangePage={onChangePage} />
              <EllipsisIcon className="self-center" />
              <PaginationItem page={page - 1} onChangePage={onChangePage} />
              <PaginationItem page={page} active onChangePage={onChangePage} />
              <PaginationItem page={page + 1} onChangePage={onChangePage} />
              <EllipsisIcon className="self-center" />
              <PaginationItem page={totalPages} onChangePage={onChangePage} />
            </>
          );
        })()}
      <button
        onClick={() => {
          if (page < totalPages) onChangePage(page + 1);
        }}
      >
        <DownIcon className="h-5 w-5 -rotate-90" />
      </button>
    </div>
  );
}

export default Pagination;
