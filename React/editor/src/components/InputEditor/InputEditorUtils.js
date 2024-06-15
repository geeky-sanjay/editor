import { getDefaultKeyBinding} from "draft-js";
export const customStyleMap = {
    BOLD: {
      fontWeight: "bold",
    },
    UNDERLINE: {
      textDecoration: "underline",
    },
    COLOR: {
      color: "red",
    },
    ITALIC: {
      fontStyle: "italic",
    },
  };

  export const triggers = {
    "#": { blockType: "header-one", offset: 1 },
    "***": { inlineStyle: "UNDERLINE", offset: 3 },
    "**": { inlineStyle: "COLOR", offset: 2 },
    "*": { inlineStyle: "BOLD", offset: 1 },
    "```": { blockType: "code-block", offset: 3 },
  };


  export const mapKeyToEditorCommand = (e) => {
    if (e.key === " " && e.target.value === "#") {
      return "header-one";
    } else if (e.key === " " && e.target.value === "*") {
      return "bold";
    } else if (e.key === " " && e.target.value === "**") {
      return "red-line";
    } else if (e.key === " " && e.target.value === "***") {
      return "underline";
    } else if (e.key === " " && e.target.value === "```") {
      return "code-block";
    }
    return getDefaultKeyBinding(e);
  };

  export const editorInstructions = [
    { symbol: "#", message: "+ space = Heading 1" },
    { symbol: "*", message: "+ space = Bold" },
    { symbol: "**", message: "+ space = Red line" },
    { symbol: "***", message: "+ space = Underline" },
    { symbol: "```", message: "+ space = Highlighted code block" },
  ];
