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
    <div className="flex items-center gap-2 w-full">
      {STEPS.map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className={`h-[3px] w-full rounded-full ${
              i <= current ? 'bg-[#2F66C8]' : 'bg-[#D9E1EF]'
            }`}
          />
          <span
            className={`text-[9px] font-semibold tracking-widest hidden md:block ${
              i <= current ? 'text-[#2F66C8]' : 'text-[#8C97AD]'
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
