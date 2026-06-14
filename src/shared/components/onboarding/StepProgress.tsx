'use client';

const STEPS = [
  'JOURNEY',
  'INTEREST',
  'LOCATION',
  'PROFILE',
  'ACCOUNT',
  'VERIFICATION',
  'ACTIVATION',
  'JOURNEY',
];

export function StepProgress({ current }: { current: number }) {
  return (
    <div className="flex w-full items-end gap-2.5">
      {STEPS.map((label, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2.5">
          <span
            className={`hidden text-center text-[14px] font-medium leading-[100%] md:block ${
              i === current ? 'text-[#2F66C8]' : 'text-[#8C97AD]'
            }`}
          >
            {label}
          </span>
          <div
            className={`h-2.5 w-full rounded-[2px] ${
              i <= current ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'
            }`}
          />
        </div>
      ))}
    </div>
  );
}
