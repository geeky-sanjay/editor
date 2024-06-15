import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Modifier,
} from "draft-js";

import "draft-js/dist/Draft.css";
import styles from "./InputEditor.module.css";
import PageContainer from "../PageContainer";
import Button from "../Utils/Button";
import Snakebar from "../Snackbar";
import useShowHideState from "../../hooks/useShowHideState";
import {
  editorInstructions,
  mapKeyToEditorCommand,
  triggers,
  customStyleMap,
} from "./InputEditorUtils";

const { editor, title, headContainer, instructions } = styles;

export const InputEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const { show, setShow } = useShowHideState();

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedContent)))
      );
    }
  }, []);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    localStorage.setItem(
      "editorContent",
      JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    );
    setShow(true);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, editorState) => {
    const selection = editorState?.getSelection();
    const currentContent = editorState?.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const blockText = block.getText();

    for (const trigger in triggers) {
      if (chars === " " && blockText.startsWith(trigger)) {
        const { blockType, inlineStyle, offset } = triggers[trigger];
        const newContentState = Modifier.removeRange(
          currentContent,
          selection.merge({
            anchorOffset: 0,
            focusOffset: offset,
          }),
          "backward"
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );

        if (blockType) {
          setEditorState(RichUtils.toggleBlockType(newEditorState, blockType));
        } else if (inlineStyle) {
          setEditorState(
            RichUtils.toggleInlineStyle(newEditorState, inlineStyle)
          );
        }

        return "handled";
      }
    }

    return "not-handled";
  };

  const onHideHandle = () => {
    setShow(false);
  };

  return (
    <PageContainer>
      <Snakebar
        showSnackbar={show}
        message="Data saved successfully"
        onHide={onHideHandle}
      />
      <div className={headContainer}>
        <div className={title}>
          <h1>Demo editor by Sanjay Yadav</h1>
        </div>
        <div>
          <Button
            disabled={!editorState.getCurrentContent().getPlainText()}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      <div className={editor}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={handleChange}
          keyBindingFn={mapKeyToEditorCommand}
          handleBeforeInput={handleBeforeInput}
          customStyleMap={customStyleMap}
        />
      </div>
      <div className={instructions}>
        <h2>Formatting Instructions</h2>
        <ul>
          {editorInstructions?.map(({ symbol, message }) => (
            <li>
              <strong>"{symbol}"</strong> {message}
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
};

export default InputEditor;
