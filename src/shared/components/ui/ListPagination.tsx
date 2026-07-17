'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react'
import { getVisiblePages } from '@/lib/pagination'
import { cn } from '@/lib/utils'

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export function ListPagination({
  page,
  pageSize,
  total,
  noun,
  onPageChange,
  onPageSizeChange,
  className,
  compact,
}: {
  page: number
  pageSize: number
  total: number
  noun: string
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  className?: string
  compact?: boolean
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1)
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)
  const pages = getVisiblePages(page, totalPages)
  const [sizeOpen, setSizeOpen] = useState(false)
  const sizeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sizeOpen) return
    function onClickOutside(e: MouseEvent) {
      if (!sizeRef.current?.contains(e.target as Node)) setSizeOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [sizeOpen])

  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-between gap-4 border-t border-[#EEF2F8] px-5 py-5',
        compact && 'px-0',
        className,
      )}
    >
      <p className="text-sm text-[#44516A]">
        {total === 0 ? (
          <>Showing 0 {noun}</>
        ) : (
          <>
            Showing {start} to {end} of{' '}
            <span className="font-medium text-[#0F172A]">
              {total.toLocaleString()} {noun}
            </span>
          </>
        )}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white text-[#44516A] transition-colors hover:bg-[#F8FAFC] disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((item, idx) =>
          item === 'ellipsis' ? (
            <span key={`e-${idx}`} className="w-[34px] text-center text-sm text-[#8C97AD]">
              •••
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(
                'flex h-[34px] min-w-[34px] items-center justify-center rounded-[6px] px-2.5 text-sm transition-colors',
                item === page
                  ? 'bg-[#2F66C8] font-medium text-white'
                  : 'border border-[#D9E1EF] bg-white text-[#44516A] hover:bg-[#F8FAFC]',
              )}
            >
              {item}
            </button>
          ),
        )}
        <button
          type="button"
          disabled={page >= totalPages || total === 0}
          onClick={() => onPageChange(page + 1)}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#D9E1EF] bg-white text-[#44516A] transition-colors hover:bg-[#F8FAFC] disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div ref={sizeRef} className="relative flex items-center gap-2.5">
        <span className="text-sm text-[#44516A]">Rows per page</span>
        <button
          type="button"
          onClick={() => setSizeOpen((o) => !o)}
          className="inline-flex h-[34px] items-center gap-2 rounded-[6px] border border-[#D9E1EF] bg-white px-3 text-sm text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
        >
          {pageSize}
          <ChevronsUpDown className="h-3.5 w-3.5 text-[#44516A]" />
        </button>
        {sizeOpen ? (
          <div className="absolute right-0 bottom-full z-20 mb-1 min-w-full overflow-hidden rounded-[8px] border border-[#D9E1EF] bg-white shadow-[0px_6px_16px_rgba(0,0,0,0.08)]">
            {PAGE_SIZE_OPTIONS.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => {
                  onPageSizeChange(size)
                  setSizeOpen(false)
                }}
                className={cn(
                  'block w-full px-3 py-2 text-left text-sm hover:bg-[#F8FAFC]',
                  size === pageSize ? 'font-medium text-[#2F66C8]' : 'text-[#0F172A]',
                )}
              >
                {size}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
