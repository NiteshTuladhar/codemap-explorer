"use strict";

import * as vscode from "vscode";
import { jsExtracter, pythonExtracter, valueChecker } from "./utils/extracter";
//nkti2hv75g5rai2rr5psa6y3j7m74s6egtvelnrlvrbkrbb33vpa
export function activate(context: vscode.ExtensionContext): void {
  let disposable = vscode.commands.registerCommand(
    "codemap-explorer.codemapper",
    async () => {
      const data_: DataType[] = [];

      //get the active text editor
      const editor = vscode.window.activeTextEditor;
      if (editor === undefined) {
        return;
      }
      let document = editor.document;
      const fileContent = document.getText();

      //read the file and retrieve the function names
      const functions = [];
      const lines = fileContent.split("\n");
      let isInsideFunction: boolean = false;
      let currentFunction: CurrentFunctionType | {} = {};
      let targetLineNumber: number | null = null;

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (valueChecker(trimmedLine)) {
          targetLineNumber =
            document.positionAt(fileContent.indexOf(trimmedLine)).line + 1;

          isInsideFunction = true;

          const fileExt = document.uri.fsPath.split(".").pop();

          let extractorType: any = null;

          if (fileExt === "js") {
            extractorType = jsExtracter;
          } else {
            extractorType = pythonExtracter;
          }

          (currentFunction as CurrentFunctionType).funcName =
            extractorType(trimmedLine).valueName;

          (currentFunction as CurrentFunctionType).lineNumber =
            targetLineNumber;

          (currentFunction as CurrentFunctionType).type =
            extractorType(trimmedLine).type;
        }

        if (isInsideFunction) {
          functions.push(currentFunction);
          currentFunction = {};
          isInsideFunction = false;
        }
      }

      functions.map((each) => {
        const each_ = each as CurrentFunctionType;
        const eachLineNumber = each_?.lineNumber;
        data_.push({
          label: each_.funcName,
          detail: `Line: ${eachLineNumber}  | ${each_.type}`,
          lineNumber: eachLineNumber,
        });
      });

      //picker ui
      const selectedFunc = await vscode.window.showQuickPick(data_, {
        matchOnDetail: true, //enables the keyword search on title as well as on details,
      });

      if (!selectedFunc) {
        return;
      } else {
        const line: number = selectedFunc.lineNumber;
        const position = new vscode.Position(line - 1, 0);
        const newSelection = new vscode.Selection(position, position);
        editor.selection = newSelection;
        editor.revealRange(newSelection, vscode.TextEditorRevealType.InCenter);
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
