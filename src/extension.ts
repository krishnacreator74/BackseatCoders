import * as vscode from 'vscode';
import personas from './config/personas';
import personaGenerator from './chat/personaGenerator';


export function activate(context: vscode.ExtensionContext) {

	console.log('New Version DAWG!');
	
	const saveListener = vscode.workspace.onDidSaveTextDocument(async(document) => {
		
		const chatlog: string[] = [];
		const numbTimes = Math.floor(Math.random() * 3 + 1);
		const msgs = await personaGenerator(document, personas, numbTimes, chatlog);
		
		for (const msg of msgs) {
			vscode.window.showInformationMessage(msg);
		}

	});

	const disposable = vscode.commands.registerCommand('backseatcoders.helloWorld', () => {


		vscode.window.showInformationMessage("Boi the extension is working try saving a file my guy");
	});

	context.subscriptions.push(disposable, saveListener);
}

export function deactivate() {}

