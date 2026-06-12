'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* -- Context -- */
interface TabsContextValue {
  value: string;
  onChange: (v: string) => void;
}
const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound component must be used within <Tabs>');
  return ctx;
}

/* -- Root -- */
interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (v: string) => void;
  children: ReactNode;
  className?: string;
}

function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;

  function onChange(v: string) {
    setInternal(v);
    onValueChange?.(v);
  }

  return (
    <TabsContext.Provider value={{ value: active, onChange }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

/* -- List -- */
function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex h-10 items-center rounded-xl bg-neutral-100 p-1',
        className
      )}
    >
      {children}
    </div>
  );
}

/* -- Trigger -- */
function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: active, onChange } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => onChange(value)}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium transition-all',
        isActive
          ? 'bg-white text-brand-700 shadow-sm'
          : 'text-neutral-500 hover:text-neutral-700',
        className
      )}
    >
      {children}
    </button>
  );
}

/* -- Content -- */
function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: active } = useTabsContext();
  if (active !== value) return null;
  return <div role="tabpanel" className={cn('mt-4', className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
