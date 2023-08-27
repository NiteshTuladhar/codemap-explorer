"use strict";

import * as vscode from "vscode";

type CurrentFunctionType = {
  funcName: string;
  lineNumber: number;
};

type DataType = {
  label: string;
  detail: string;
  lineNumber: number;
};

export function activate(context: vscode.ExtensionContext) {
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
        if (trimmedLine.startsWith("function ")) {
          targetLineNumber =
            document.positionAt(fileContent.indexOf(trimmedLine)).line + 1;
          isInsideFunction = true;
          (currentFunction as CurrentFunctionType).funcName = trimmedLine
            .split(" ")[1]
            .split("(")[0];
          (currentFunction as CurrentFunctionType).lineNumber =
            targetLineNumber;
        }

        if (isInsideFunction) {
          if (trimmedLine.endsWith(") {")) {
            functions.push(currentFunction);
            currentFunction = {};
            isInsideFunction = false;
          }
        }
      }

      functions.map((each) => {
        data_.push({
          label: (each as CurrentFunctionType)?.funcName,
          detail: "Function that is used to get all the products for the store",
          lineNumber: (each as CurrentFunctionType)?.lineNumber,
        });
      });

      //picker ui
      const selectedFunc = await vscode.window.showQuickPick(data_, {
        matchOnDetail: true, //enables the keyword search on title as well as on details
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
