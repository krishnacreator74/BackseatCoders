"use strict";var c=Object.create;var r=Object.defineProperty;var d=Object.getOwnPropertyDescriptor;var h=Object.getOwnPropertyNames;var u=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var w=(o,e)=>{for(var a in e)r(o,a,{get:e[a],enumerable:!0})},l=(o,e,a,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of h(e))!p.call(o,s)&&s!==a&&r(o,s,{get:()=>e[s],enumerable:!(t=d(e,s))||t.enumerable});return o};var g=(o,e,a)=>(a=o!=null?c(u(o)):{},l(e||!o||!o.__esModule?r(a,"default",{value:o,enumerable:!0}):a,o)),v=o=>l(r({},"__esModule",{value:!0}),o);var b={};w(b,{activate:()=>f,deactivate:()=>M});module.exports=v(b);var i=g(require("vscode"));async function y(o,e){return await(await fetch("http://localhost:1234/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"gemma-3-4b",messages:[{role:"system",content:o},{role:"user",content:e}]})})).json()}async function x(o,e,a){let t=[],s=0;for(let n=0;n<a;n++)if(t.length===0)t.push(Math.floor(Math.random()*e.length));else{for(s=Math.floor(Math.random()*e.length);t.includes(s);)s=Math.floor(Math.random()*e.length);t.push(s)}for(let n=0;n<t.length;n++){let m=await y(e[t[n]].prompt,o.getText());i.window.showInformationMessage(e[t[n]].emoji+"   "+m.choices[0].message.content)}}function f(o){console.log("New Version DAWG!");let e=[{emoji:"\u{1F480}",prompt:`

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
				
				chat is this real?`},{emoji:"\u{1F9D9}",prompt:`
				
				You are an old wizard in Twitch chat.

				Maximum 5 words.

				Examples:

				Dark magic.

				Forbidden spell.

				Ancient bug awakened.

				The scroll rejects thee.

				Hex successful.`},{emoji:"\u{1F412}",prompt:`You are a monkey.

				Maximum 5 words.

				Examples:

				Ooh ooh ah ah.

				Threw banana.

				Monkey see monkey do.

				Monkey brain says yes.`},{emoji:"\u{1F921}",prompt:`
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

				bro summoned production`},{emoji:"\u{1F438}",prompt:`You are a discord mod.
			
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

			`},{emoji:"\u{1F977}",prompt:`You are a silent elite ninja code reviewer.

				You are a ninja.

				Maximum 5 words.

				Examples:

				Eliminated.

				Messy.

				Clean kill.

				Spotted.

				Acceptable.			
				
				Mission failed.`},{emoji:"\u{1F474}",prompt:`Your job is to review code after every save.

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
				`}],a=i.workspace.onDidSaveTextDocument(async s=>{let n=Math.floor(Math.random()*3);await x(s,e,n)}),t=i.commands.registerCommand("backseatcoders.helloWorld",()=>{i.window.showInformationMessage("its is working")});o.subscriptions.push(t,a)}function M(){}0&&(module.exports={activate,deactivate});
