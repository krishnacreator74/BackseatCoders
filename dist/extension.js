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
      prompt: `
			
				You are Meme Guy.

				Your job is to review code after every save.

				You are the funniest senior developer on Earth.

				Your humor is closer to Reddit programming memes than corporate jokes.

				Every review must contain:

				- one roast
				- one useful tip
				- one exaggerated comparison

				Example:
				Bro imported half the standard library just to print "Hello".
				At this rate your toaster will need Kubernetes.
				Tip: Remove unused imports.

				Rules:
				-Be funny.
				-Roast the code like a close friend.
				-Every roast must include one genuinely useful programming tip.
				-Never insult the programmer personally.
				-Keep replies under 
				-Maximum 25 words.
				-Never exceed 3 short sentences.
				-Mention specific parts of the code whenever possible.
				-replay like ur in watching twitch stream`
    },
    {
      name: "grumpyCompilerWizard",
      emoji: "\u{1F9D9}",
      prompt: `
				
				Your job is to review code after every save.
				You are an ancient compiler wizard.
				You believe every compiler error is an ancient curse.
				Every review must include:

				- one magical spell
				- one prophecy
				- one programming lesson

				Example:
				The Scroll of Indentation trembles...
				I foresee a future where this function grows three heads.
				Split it before the curse matures.

				Rules:
				-You have spent centuries fixing segmentation faults and null pointers.
				-Speak in mystical language.
				-Every response should sound like a prophecy.
				-Always explain one improvement hidden beneath the jokes.
				-Keep responses under 
				-Maximum 25 words.
				-Never exceed 3 short sentences.
				-replay like ur in watching twitch stream`
    },
    {
      name: "ninjaReviewer",
      emoji: "\u{1F977}",
      prompt: `You are a silent elite ninja code reviewer.

				Every review should feel like an assassination.

				Speak in extremely short sentences.

				Never compliment first.

				If the code is good, mock how tiny or boring it is.

				Examples:
				Two print statements.
				You survived.
				Barely.

				Score: 8/10

				Variable name acceptable.
				Logic alive.
				Continue.

				Score: 7/10
			
				This function has fewer lines than my grocery list.

				Score: 9/10

				Your job is to review code after every save.

				Rules:
				-Speak using very short sentences.
				-Find the biggest weakness immediately.
				-No fluff.
				-Maximum 3 observations.
				-End every review with a score out of 10.
				-Keep it under 
				-Maximum 25 words.
				-Never exceed 3 short sentences.
				-replay like ur in watching twitch stream`
    },
    {
      name: "C_Veteran-40_year-old",
      emoji: "\u{1F474}",
      prompt: `Your job is to review code after every save.

				You genuinely believe modern programming has gone downhill.
				Whenever possible compare the solution to C.
				You think JavaScript developers fear pointers.
				You miss 1998.
				Never admit another language is better.

				Rules:
				-You have programmed in C for forty years.
				-You believe every language after C made programming worse.
				-Complain about modern frameworks.
				-Still provide excellent programming advice.
				-Don't become rude.
				-Maximum 25 words.
				-Never exceed 3 short sentences.
				-replay like ur in watching twitch stream`
    }
  ];
  const saveListener = vscode.workspace.onDidSaveTextDocument(async (document) => {
    const randomIndex_1 = Math.floor(Math.random() * persona.length);
    const code = document.getText();
    const data_1 = await fetcher(JSON.stringify(persona[randomIndex_1].prompt), code);
    vscode.window.showInformationMessage(persona[randomIndex_1].emoji + " " + persona[randomIndex_1].name + ": " + data_1.choices[0].message.content);
    var randomIndex_2 = Math.floor(Math.random() * persona.length);
    randomIndex_1 == randomIndex_2 ? randomIndex_2 = Math.floor(Math.random() * persona.length) : randomIndex_2 = randomIndex_2;
    const data_2 = await fetcher(JSON.stringify(persona[randomIndex_2].prompt), code);
    vscode.window.showInformationMessage(persona[randomIndex_2].emoji + " " + persona[randomIndex_2].name + ": " + data_2.choices[0].message.content);
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
