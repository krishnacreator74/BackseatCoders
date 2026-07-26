"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode = __toESM(require("vscode"));
async function fetcher(persona, context) {
  const response = await fetch(
    "http://localhost:1234/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen2.5-coder-7b-instruct",
        messages: [
          {
            role: "system",
            content: persona
          },
          {
            role: "user",
            content: context
          }
        ]
      })
    }
  );
  const data = await response.json();
  return data;
}
function activate(context) {
  console.log("New Version DAWG!");
  const persona = [
    {
      name: "memeGuy",
      emoji: "\u{1F480}",
      prompt: `You are Meme Guy.

				Your job is to review code after every save.

				Rules:
				-Be funny.
				-Roast the code like a close friend.
				-Every roast must include one genuinely useful programming tip.
				-Never insult the programmer personally.
				-Keep replies under 50 words.
				-Mention specific parts of the code whenever possible.`
    },
    {
      name: "grumpyCompilerWizard",
      emoji: "\u{1F9D9}",
      prompt: `You are an ancient compiler wizard.

				Your job is to review code after every save.

				Rules:
				-You have spent centuries fixing segmentation faults and null pointers.
				-Speak in mystical language.
				-Every response should sound like a prophecy.
				-Always explain one improvement hidden beneath the jokes.
				-Keep responses under 50 words.`
    },
    {
      name: "ninjaReviewer",
      emoji: "\u{1F977}",
      prompt: `You are a silent ninja code reviewer.

				Your job is to review code after every save.

				Rules:
				-Speak using very short sentences.
				-Find the biggest weakness immediately.
				-No fluff.
				-Maximum 3 observations.
				-End every review with a score out of 10.
				-Keep it under 50 words.`
    },
    {
      name: "C_Veteran-40_year-old",
      emoji: "\u{1F474}",
      prompt: `Your job is to review code after every save.
			
				Rules:
				-You have programmed in C for forty years.
				-You believe every language after C made programming worse.
				-Complain about modern frameworks.
				-Still provide excellent programming advice.
				-Don't become rude.
				-Keep it under 50 words.`
    }
  ];
  const saveListener = vscode.workspace.onDidSaveTextDocument(async (document) => {
    const randomIndex_1 = Math.floor(Math.random() * persona.length);
    const code = document.getText();
    const data_1 = await fetcher(JSON.stringify(persona[randomIndex_1].prompt), code);
    vscode.window.showInformationMessage(persona[randomIndex_1].name + persona[randomIndex_1].emoji + ":" + data_1.choices[0].message.content);
    var randomIndex_2 = Math.floor(Math.random() * persona.length);
    randomIndex_1 == randomIndex_2 ? randomIndex_2 = Math.floor(Math.random() * persona.length) : randomIndex_2 = randomIndex_2;
    const data_2 = await fetcher(JSON.stringify(persona[randomIndex_2].prompt), code);
    vscode.window.showInformationMessage(persona[randomIndex_2].name + persona[randomIndex_2].emoji + ":" + data_2.choices[0].message.content);
  });
  const disposable = vscode.commands.registerCommand("backseatcoders.helloWorld", () => {
    vscode.window.showInformationMessage("its is working");
  });
  context.subscriptions.push(disposable, saveListener);
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
