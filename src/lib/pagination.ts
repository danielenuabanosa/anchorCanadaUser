import { useEffect, useState } from 'react'

export function usePagination<T>(items: T[], initialPageSize = 10) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const currentPage = Math.min(page, totalPages)
  const start = total === 0 ? 0 : (currentPage - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const pageItems = items.slice(start, end)

  function goToPage(next: number) {
    setPage(Math.min(Math.max(1, next), totalPages))
  }

  function changePageSize(size: number) {
    setPageSize(size)
    setPage(1)
  }

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  return {
    page: currentPage,
    pageSize,
    total,
    totalPages,
    start,
    end,
    pageItems,
    goToPage,
    changePageSize,
    setPage,
  }
}

export function getVisiblePages(page: number, totalPages: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  if (page <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages]
  }
  if (page >= totalPages - 3) {
    return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
  }
  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages]
}
