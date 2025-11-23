import Link from "@tiptap/extension-link";

export const LinkUnderline = Link.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      {
        ...HTMLAttributes,
        style: `${HTMLAttributes.style || ""}; text-decoration: underline; color: #2563eb;`,
      },
      0,
    ];
  },
});

