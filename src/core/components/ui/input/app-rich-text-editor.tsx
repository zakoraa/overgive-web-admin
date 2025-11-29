"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { LinkUnderline } from "@/core/extensions/tiptap/link-underline";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { ResizableImage } from "tiptap-extension-resizable-image";
import { FontSize } from "@/core/extensions/tiptap/font-size";

import { cn } from "@/core/utils/util";
import { Label } from "@/core/components/text/label";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Type,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Undo,
  Redo,
} from "lucide-react";
import { AutoUrl } from "@/core/extensions/tiptap/auto-url";
import ErrorInputMessage from "../error-input-message";

interface AppRichTextEditorProps {
  label?: string;
  name?: string;
  required?: boolean;
  error?: string;
  defaultValue?: string;
  placeholder?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  className?: string;
  onChange?: (html: string) => void;
}

export const AppRichTextEditor = ({
  label,
  name,
  required,
  error,
  defaultValue,
  placeholder = "Tulis sesuatu...",
  wrapperClassName,
  labelClassName,
  className,
  onChange,
}: AppRichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const [fontSize, setFontSize] = useState<string>("16px");

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        LinkUnderline.configure({
          openOnClick: true,
          autolink: true,
          linkOnPaste: true,
        }),
        TextAlign.configure({ types: ["heading", "paragraph"] }),
        TextStyle,
        FontSize, // ⬅️ Tambah ini
        Placeholder.configure({
          placeholder,
        }),
        ResizableImage.configure({ allowBase64: true }),
        AutoUrl,
      ],
      content: defaultValue || "",
      immediatelyRender: false,
      onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
      onCreate({ editor }) {
        editor.commands.setMark("fontSize", { size: "16px" });
      },
    },
    [],
  );

  useEffect(() => {
    if (!editor) return;

    if (defaultValue) {
      editor.commands.setContent(defaultValue);
    } else {
      editor.commands.clearContent();
    }
  }, [defaultValue, editor]);

  // sinkronisasi UI dropdown ketika seleksi berubah
  useEffect(() => {
    if (!editor) return;
    const updateFontSize = () => {
      // jika seleksi berada di teks yang punya fontSize mark, ambil nilainya
      const attrs = editor.getAttributes("fontSize") as
        | { size?: string }
        | undefined;
      const current = attrs?.size || "16px";
      setFontSize(current);
    };

    // update saat selection berubah atau editor di-update
    editor.on("selectionUpdate", updateFontSize);
    editor.on("transaction", updateFontSize);
    // initial read
    updateFontSize();

    return () => {
      editor.off("selectionUpdate", updateFontSize);
      editor.off("transaction", updateFontSize);
    };
  }, [editor]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  /** Upload gambar dan langsung insert (base64 untuk sekarang) */
  const handleImageUpload = () => {
    if (!editor) return;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        editor
          .chain()
          .focus()
          .setResizableImage({
            src: reader.result as string,
            alt: file.name,
          })
          .run();
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

  return (
    <div className={cn("flex w-full flex-col space-y-2", wrapperClassName)}>
      {label && (
        <Label
          htmlFor={name}
          text={label}
          required={required}
          className={labelClassName}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-gray-50 px-2 py-2">
        <select
          className="rounded border px-2 py-1 text-sm"
          value={fontSize}
          onChange={(e) => {
            const val = e.target.value;
            setFontSize(val);
            editor?.chain().focus().setMark("fontSize", { size: val }).run();
          }}
        >
          <option value="9px">9</option>
          <option value="10px">10</option>
          <option value="11px">11</option>
          <option value="12px">12</option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="20px">20</option>
          <option value="22px">22</option>
          <option value="24px">24</option>
          <option value="30px">30</option>
          <option value="36px">36</option>
        </select>

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <Bold size={16} />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <Italic size={16} />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <Type size={16} />
        </button>

        <div className="mx-1 h-6 border-l" />

        {/* Heading */}
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className="rounded p-2 hover:bg-gray-100"
        >
          H1
        </button>

        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="rounded p-2 hover:bg-gray-100"
        >
          H2
        </button>

        <div className="mx-1 h-6 border-l" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <ListOrdered size={16} />
        </button>

        <div className="mx-1 h-6 border-l" />

        {/* Align */}
        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <AlignLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <AlignCenter size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className="rounded p-2 hover:bg-gray-100"
        >
          <AlignRight size={16} />
        </button>

        <div className="mx-1 h-6 border-l" />

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("Masukkan URL:");
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="rounded p-2 hover:bg-gray-100"
        >
          <LinkIcon size={16} />
        </button>

        {/* Image Upload */}
        <button
          type="button"
          onClick={handleImageUpload}
          className="rounded p-2 hover:bg-gray-100"
        >
          <ImageIcon size={16} />
        </button>

        {/* Undo / Redo */}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            className="rounded p-2 hover:bg-gray-100"
          >
            <Undo size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            className="rounded p-2 hover:bg-gray-100"
          >
            <Redo size={16} />
          </button>

          <button
            type="button"
            onClick={() => editor?.chain().focus().clearContent(true).run()}
            className="rounded p-2 hover:bg-gray-100"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        className={cn(
          "min-h-[520px] max-w-full rounded-xl border p-3",
          error ? "border-red-500" : "border-gray-500",
          className,
        )}
        onClick={() => editor?.chain().focus().run()}
      >
        <EditorContent
          editor={editor}
          className="prose max-w-none border-none focus:outline-none"
        />
      </div>

      <ErrorInputMessage error={error} />
    </div>
  );
};

export default AppRichTextEditor;
