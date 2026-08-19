'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Minus,
  ChevronDown,
  Type,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minRows?: number;
  className?: string;
  label?: string;
}

/* ─────────────────────────────────────────────
   Toolbar button with tooltip
───────────────────────────────────────────── */
function ToolbarButton({
  active,
  disabled,
  onClick,
  tooltip,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center group">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onClick();
        }}
        disabled={disabled}
        aria-pressed={active}
        aria-label={tooltip}
        className={cn(
          'flex h-[30px] w-[30px] items-center justify-center rounded-[5px] transition-all duration-100',
          active
            ? 'bg-[#2F66C8] text-white shadow-[0_1px_3px_rgba(47,102,200,0.35)]'
            : 'text-[#44516A] hover:bg-[#EEF2F8] hover:text-[#0F172A]',
          disabled && 'pointer-events-none opacity-35',
        )}
      >
        {children}
      </button>
      {/* Tooltip */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[5px] bg-[#0F172A] px-2 py-1 text-[11px] font-medium leading-none text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
      >
        {tooltip}
        <svg
          className="absolute left-1/2 top-full -translate-x-1/2 text-[#0F172A]"
          width="8"
          height="4"
          viewBox="0 0 8 4"
          fill="currentColor"
        >
          <path d="M0 0 L4 4 L8 0Z" />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Group separator
───────────────────────────────────────────── */
function Sep() {
  return <div className="mx-1.5 h-[18px] w-px shrink-0 bg-[#E2E8F0]" aria-hidden />;
}

/* ─────────────────────────────────────────────
   Paragraph / Heading style dropdown
───────────────────────────────────────────── */
type BlockStyle = 'paragraph' | 'h2' | 'h3';

const BLOCK_OPTIONS: { value: BlockStyle; label: string; className: string }[] = [
  { value: 'paragraph', label: 'Paragraph', className: 'text-sm text-[#44516A]' },
  { value: 'h2', label: 'Heading 1', className: 'text-sm font-semibold text-[#0F172A]' },
  { value: 'h3', label: 'Heading 2', className: 'text-xs font-semibold text-[#0F172A] uppercase tracking-wide' },
];

function BlockStylePicker({
  value,
  onChange,
}: {
  value: BlockStyle;
  onChange: (v: BlockStyle) => void;
}) {
  const [open, setOpen] = useState(false);
  const current = BLOCK_OPTIONS.find((o) => o.value === value) ?? BLOCK_OPTIONS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Text style"
        className={cn(
          'flex h-[30px] min-w-[108px] items-center justify-between gap-1.5 rounded-[5px] border border-[#E2E8F0] bg-white px-2 text-[12px] font-medium text-[#44516A] transition-colors hover:border-[#B9C3D6] hover:text-[#0F172A]',
          open && 'border-[#2F66C8] text-[#0F172A]',
        )}
      >
        <Type className="h-3.5 w-3.5 shrink-0 text-[#8C97AD]" />
        <span className="flex-1 text-left">{current.label}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 text-[#8C97AD] transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            onMouseDown={() => setOpen(false)}
            tabIndex={-1}
            aria-hidden
          />
          <ul
            role="listbox"
            className="absolute left-0 top-[calc(100%+4px)] z-50 min-w-full overflow-hidden rounded-[8px] border border-[#E2E8F0] bg-white shadow-[0_4px_16px_rgba(15,23,42,0.1)]"
          >
            {BLOCK_OPTIONS.map((opt) => (
              <li key={opt.value} role="option" aria-selected={opt.value === value}>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-[#F8FAFC]',
                    opt.value === value && 'bg-[#EFF4FF]',
                  )}
                >
                  <span className={cn('flex-1', opt.className)}>{opt.label}</span>
                  {opt.value === value && (
                    <span className="text-[10px] font-semibold text-[#2F66C8]">✓</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Word / character count footer
───────────────────────────────────────────── */
function countWords(html: string) {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.split(' ').length : 0;
}

function countChars(html: string) {
  return html.replace(/<[^>]+>/g, '').length;
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Describe the opportunity in detail — include what applicants will do, who should apply, and any requirements…',
  minRows = 12,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        horizontalRule: {},
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'rich-editor-content focus:outline-none px-5 py-4 text-[14px] leading-relaxed text-[#0F172A]',
        style: `min-height: ${minRows * 1.6}rem`,
      },
    },
    onUpdate({ editor: e }) {
      onChange(e.getHTML());
    },
  });

  // Sync external value (e.g. sessionStorage hydration)
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || '', false);
    }
  }, [editor, value]);

  // Map editor state → BlockStyle dropdown value
  const currentBlockStyle: BlockStyle = editor?.isActive('heading', { level: 2 })
    ? 'h2'
    : editor?.isActive('heading', { level: 3 })
      ? 'h3'
      : 'paragraph';

  function applyBlockStyle(v: BlockStyle) {
    if (!editor) return;
    if (v === 'paragraph') editor.chain().focus().setParagraph().run();
    else if (v === 'h2') editor.chain().focus().setHeading({ level: 2 }).run();
    else editor.chain().focus().setHeading({ level: 3 }).run();
  }

  const words = countWords(value);
  const chars = countChars(value);

  if (!editor) return null;

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[10px] border border-[#D9E1EF] bg-white transition-colors duration-150 focus-within:border-[#2F66C8] focus-within:shadow-[0_0_0_3px_rgba(47,102,200,0.08)]',
        className,
      )}
    >
      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#EEF2F8] bg-[#F8FAFC] px-2.5 py-2">

        {/* Block style picker */}
        <BlockStylePicker value={currentBlockStyle} onChange={applyBlockStyle} />

        <Sep />

        {/* Text formatting */}
        <ToolbarButton
          tooltip="Bold  ⌘B"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-[15px] w-[15px]" strokeWidth={2.5} />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Italic  ⌘I"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-[15px] w-[15px]" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Underline  ⌘U"
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="h-[15px] w-[15px]" />
        </ToolbarButton>

        <Sep />

        {/* Lists */}
        <ToolbarButton
          tooltip="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-[15px] w-[15px]" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-[15px] w-[15px]" />
        </ToolbarButton>

        <Sep />

        {/* Alignment */}
        <ToolbarButton
          tooltip="Align left"
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="h-[15px] w-[15px]" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align centre"
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="h-[15px] w-[15px]" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Align right"
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="h-[15px] w-[15px]" />
        </ToolbarButton>

        <Sep />

        {/* Divider / HR */}
        <ToolbarButton
          tooltip="Horizontal divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-[15px] w-[15px]" />
        </ToolbarButton>

        {/* Spacer */}
        <div className="ml-auto" />

        {/* History */}
        <ToolbarButton
          tooltip="Undo  ⌘Z"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-[15px] w-[15px]" />
        </ToolbarButton>
        <ToolbarButton
          tooltip="Redo  ⌘⇧Z"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-[15px] w-[15px]" />
        </ToolbarButton>
      </div>

      {/* ── Editor canvas ── */}
      <div className="flex-1">
        <EditorContent editor={editor} />
      </div>

      {/* ── Footer: word / char count ── */}
      <div className="flex items-center justify-end gap-3 border-t border-[#EEF2F8] bg-[#F8FAFC] px-4 py-1.5">
        <span className="text-[11px] text-[#8C97AD]">
          {words} {words === 1 ? 'word' : 'words'}
        </span>
        <span className="text-[11px] text-[#D9E1EF]">·</span>
        <span className="text-[11px] text-[#8C97AD]">{chars} chars</span>
      </div>
    </div>
  );
}
