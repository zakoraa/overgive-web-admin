import { Extension } from "@tiptap/core";
import { Plugin } from "prosemirror-state";

export const AutoUrl = Extension.create({
  name: "autoUrl",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleTextInput(view, from, to, text) {
            const urlRegex =
              /(https?:\/\/(?:www\.)?[a-zA-Z0-9@:%._+~#=/-]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*))/;

            const fullText = view.state.doc.textBetween(
              0,
              view.state.doc.content.size,
              "\n"
            );

            if (!urlRegex.test(fullText)) return false;

            const match = fullText.match(urlRegex);
            if (!match) return false;

            const url = match[0];
            const startPos = fullText.indexOf(url);
            const endPos = startPos + url.length;

            view.dispatch(
              view.state.tr.addMark(
                startPos,
                endPos,
                view.state.schema.marks.link.create({ href: url })
              )
            );

            return false;
          },
        },
      }),
    ];
  },
});
