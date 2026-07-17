'use client';

import Image, { type StaticImageData } from 'next/image';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import uploadIcon from '@assets/icons/send.png';

export function SectionHeader({
  number,
  title,
  optional,
  icon,
}: {
  number: number;
  title: string;
  optional?: boolean;
  icon: StaticImageData;
}) {
  return (
    <div className="flex items-center gap-[18px]">
      <Image src={icon} alt="" width={24} height={24} className="shrink-0 object-contain" />
      <div className="flex items-baseline gap-1.5 font-sans text-[18px] font-semibold leading-[1.8] text-[#0F172A]">
        <span>{number}.</span>
        <span>{title}</span>
        {optional && <span className="font-normal text-[#8C97AD]">(Optional)</span>}
      </div>
    </div>
  );
}

export function FieldLabel({
  label,
  required,
  optional,
  className,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('flex items-baseline gap-1 font-sans text-[16px] font-medium leading-[1.8] text-[#0F172A]', className)}>
      <span>{label}</span>
      {required && <span className="text-[#EF4444]">*</span>}
      {optional && <span className="font-normal text-[#8C97AD]">(Optional)</span>}
    </div>
  );
}

export function IconInput({
  icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  className,
}: {
  icon: StaticImageData;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
        <Image src={icon} alt="" width={18} height={18} className="opacity-60" />
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="anchor-field anchor-field--icon-left"
      />
    </div>
  );
}

export function IconSelect({
  icon,
  value,
  onChange,
  placeholder,
  options,
  className,
}: {
  icon: StaticImageData;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
        <Image src={icon} alt="" width={18} height={18} className="opacity-60" />
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="anchor-field anchor-field--icon-left appearance-none"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-[#8C97AD]" />
    </div>
  );
}

export function FileUploadZone({
  onFileSelect,
  fileName,
  progress,
  compact = false,
  helperLines,
  previewUrl,
  onRemove,
  className,
}: {
  onFileSelect: (file: File) => void;
  fileName?: string;
  progress?: number;
  compact?: boolean;
  helperLines: string[];
  previewUrl?: string;
  onRemove?: () => void;
  className?: string;
}) {
  const isComplete = progress === 100;

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center rounded-[10px] border border-dashed border-[#D9E1EF] bg-[#F8FAFC]',
        compact ? 'min-h-[120px] p-4' : 'min-h-[200px] p-4',
        className,
      )}
    >
      {isComplete && fileName ? (
        <div className="flex w-full flex-col items-center gap-3">
          {previewUrl ? (
            <div className="relative h-24 w-full overflow-hidden rounded-[10px]">
              <Image src={previewUrl} alt="" fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="flex h-24 w-full items-center justify-center rounded-[10px] bg-[#EEF2F8]">
              <span className="font-sans text-[14px] font-medium text-[#44516A]">Document uploaded</span>
            </div>
          )}
          <div className="flex w-full items-center justify-between gap-2">
            <div>
              <p className="font-sans text-[14px] font-medium text-[#0F172A]">{fileName}</p>
              <p className="font-sans text-[12px] text-[#22C55E]">Upload Complete</p>
            </div>
            {onRemove && (
              <button type="button" onClick={onRemove} className="font-sans text-[12px] text-[#EF4444]">
                Remove
              </button>
            )}
          </div>
        </div>
      ) : fileName && progress !== undefined && progress < 100 ? (
        <div className="flex w-full flex-col gap-3 px-2">
          <p className="truncate font-sans text-[14px] text-[#0F172A]">{fileName}</p>
          <div className="h-2 overflow-hidden rounded-full bg-[#D9E1EF]">
            <div className="h-full rounded-full bg-[#2F66C8] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-right font-sans text-[12px] text-[#2F66C8]">{progress}%</p>
        </div>
      ) : (
        <>
          <label className="flex cursor-pointer flex-col items-center gap-2.5 text-center">
            <Image src={uploadIcon} alt="" width={compact ? 24 : 40} height={compact ? 24 : 40} className="object-contain opacity-80" />
            {helperLines.map((line, index) => (
              <span
                key={line}
                className={cn(
                  'font-sans text-[#8C97AD]',
                  index === helperLines.length - 2 ? 'text-[14px] font-medium text-[#2F66C8]' : 'text-[16px]',
                  index === helperLines.length - 1 && 'text-[14px]',
                )}
              >
                {line}
              </span>
            ))}
            <input
              type="file"
              className="sr-only"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFileSelect(file);
              }}
            />
          </label>
        </>
      )}
    </div>
  );
}

export function SocialUrlInput({
  icon,
  label,
  value,
  onChange,
  placeholder,
}: {
  icon: StaticImageData;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white">
      <div className="flex items-stretch">
        <div className="flex w-[160px] shrink-0 items-center gap-2.5 border-r border-[#D9E1EF] p-4">
          <Image src={icon} alt="" width={20} height={20} className="object-contain" />
          <span className="font-sans text-base font-medium text-[#0F172A]">{label}</span>
        </div>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="no-anchor-field min-w-0 flex-1 border-0 bg-transparent px-4 font-sans text-base text-[#0F172A] outline-none placeholder:text-[#8C97AD]"
        />
      </div>
    </div>
  );
}
