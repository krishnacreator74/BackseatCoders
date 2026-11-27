import * as vscode from 'vscode';
import fetcher from '../services/llm';
import { Persona } from '../types/persona';

async function personaGenerator(code: vscode.TextDocument, persona: Persona[], num: number , chatlog: string[], selectedModel: string|undefined, endpoint: string|undefined){

	let numlist: number[] = [];
	let randomNum = 0;
    const messages: string[] = [];

	for (let i = 0; i<num; i++){


		if( numlist.length === 0){
			numlist.push(Math.floor(Math.random() * persona.length));
		}
		else{
			randomNum = Math.floor(Math.random() * persona.length);
			
			while(numlist.includes(randomNum)){
				randomNum = Math.floor(Math.random() * persona.length);
			}

			numlist.push(randomNum);
		}

	}

	for (let i = 0; i<numlist.length; i++){

		const context = `
			CODE:
			${code.getText()}

			CHAT SO FAR:
			${chatlog.join("\n")}
			
			INSTRUCTION:
			You are currently in a group chat with the other characters above.

			If CHAT SO FAR is not empty, react to the most recent message.
			You may argue, mock, agree, dismiss, or respond to that character.

			Do NOT review the code again unless the previous message gives you a reason to.
			Keep your response in character and follow your personality rules.

            Do NOT repeat other character messages.

		`;

		let data: any = await fetcher(persona[numlist[i]].prompt, context, selectedModel, endpoint);
		const msg = persona[numlist[i]].emoji + " : " + data.choices[0].message.content;
        messages.push(msg);
		chatlog.push(msg);
	}

    return messages;

}

export default personaGenerator;