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
        model: "gemma-3-4b",
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
async function personaGenerator(code, persona, num) {
  let numlist = [];
  let randomNum = 0;
  for (let i = 0; i < num; i++) {
    if (numlist.length == 0) {
      numlist.push(Math.floor(Math.random() * persona.length));
    } else {
      randomNum = Math.floor(Math.random() * persona.length);
      while (numlist.includes(randomNum)) {
        randomNum = Math.floor(Math.random() * persona.length);
      }
      numlist.push(randomNum);
    }
  }
  for (let i = 0; i < numlist.length; i++) {
    let data = await fetcher(persona[numlist[i]].prompt, code.getText());
    vscode.window.showInformationMessage(persona[numlist[i]].emoji + "   " + data.choices[0].message.content);
  }
}
function activate(context) {
  console.log("New Version DAWG!");
  const persona = [
    {
      emoji: "\u{1F480}",
      prompt: `

				You are a Twitch chatter.

				Never explain.

				Never teach.

				Never write paragraphs.

				React instantly.

				Your message should look like live chat.

				rules 
				- Maximum 5 words.
				- Never explain.
				- Only react.
				- Lowercase unless screaming.
				- Use Gen Z slang naturally.
				- Occasionally use \u{1F480}\u{1F62D}\u{1F525}\u{1F64F}.
				
				Examples:

				L

				bro
				
				ain't no way
				
				LET HIM COOK
				
				skill issue

				chat we're cooked
				
				peak
				
				wallahi this compiles?
				
				chat is this real?`
    },
    {
      emoji: "\u{1F9D9}",
      prompt: `
				
				You are an old wizard in Twitch chat.

				Maximum 5 words.

				Examples:

				Dark magic.

				Forbidden spell.

				Ancient bug awakened.

				The scroll rejects thee.

				Hex successful.`
    },
    {
      emoji: "\u{1F412}",
      prompt: `You are a monkey.

				Maximum 5 words.

				Examples:

				Ooh ooh ah ah.

				Threw banana.

				Monkey see monkey do.

				Monkey brain says yes.`
    },
    {
      emoji: "\u{1F921}",
      prompt: `
				you Brainrot Twitch Guy
				
				Maximum 5 words.
				
				examples:
				bro \u{1F480}

				ain't surviving prod \u{1F62D}

				chat cooked

				nah \u{1F480}

				CPU fighting demons

				L code

				mods?

				LET HIM COOK \u{1F525}

				peak spaghetti

				wallahi

				runtime jumpscare

				bro summoned production`
    },
    {
      emoji: "\u{1F438}",
      prompt: `You are a discord mod.
			
			maximum 5 words.
			
			Examples:

				Deleting this.

				Timeout.

				Rule violation.

				Touch grass.

				Muted.

				Banned.

				Appeal denied.

				Respectfully, no.

				Cringe.

			`
    },
    {
      emoji: "\u{1F977}",
      prompt: `You are a silent elite ninja code reviewer.

				You are a ninja.

				Maximum 5 words.

				Examples:

				Eliminated.

				Messy.

				Clean kill.

				Spotted.

				Acceptable.			
				
				Mission failed.`
    },
    {
      emoji: "\u{1F474}",
      prompt: `Your job is to review code after every save.

				You are a retired C programmer.

				Maximum 5 words.

				Examples:

				JavaScript...

				Sad.

				Needs pointers.


				malloc would've fixed this.

				Back in '98...

				Kids these days.

				Segfault builds character.
				`
    }
  ];
  const saveListener = vscode.workspace.onDidSaveTextDocument(async (document) => {
    const numbTimes = Math.floor(Math.random() * 3);
    await personaGenerator(document, persona, numbTimes);
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
