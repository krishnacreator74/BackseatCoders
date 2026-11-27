import * as vscode from 'vscode';
import personas from './config/personas';
import personaGenerator from './chat/personaGenerator';
import { get_info } from './services/modelManager';

export async function activate(context: vscode.ExtensionContext) {

	console.log('New Version DAWG!');
	console.log("BACKSEATCODERS ACTIVATED");

	let config = vscode.workspace.getConfiguration("backseatcoders");
	let provider:string|undefined = config.get("provider") ;
	let endpoint:string|undefined = config.get("endpoint");

	let availableModels: string[] = [];
	let selectedModel: string | undefined;
	let savedModel:string|undefined = config.get("model");

	const configListener = vscode.workspace.onDidChangeConfiguration(async event=>{
		if(event.affectsConfiguration("backseatcoders.endpoint")|| event.affectsConfiguration("backseatcoders.provider")){
			config = vscode.workspace.getConfiguration("backseatcoders");
			provider = config.get("provider");
			endpoint = config.get("endpoint");
			savedModel = config.get("model");
			({availableModels, selectedModel} = await get_info(provider, endpoint, savedModel));
			if (selectedModel && selectedModel !== savedModel){
				await config.update(
					"model",
					selectedModel,
					vscode.ConfigurationTarget.Global
				);
			}
		}
	});

	console.log("Provider:", provider);
	console.log("Endpoint:", endpoint);

	 ({ availableModels, selectedModel} =  await get_info(provider, endpoint, savedModel));
	
	if (selectedModel && selectedModel !== savedModel){
	await config.update(
		"model",
		selectedModel,
		vscode.ConfigurationTarget.Global
	);
	}

	console.log("Available models:", availableModels);
	console.log("Selected model:", selectedModel);

	const saveListener = vscode.workspace.onDidSaveTextDocument(async(document) => {
		
		const chatlog: string[] = [];
		const numbTimes = Math.floor(Math.random() * 3 + 1);
		const msgs = await personaGenerator(document, personas, numbTimes, chatlog, selectedModel, endpoint);
		
		for (const msg of msgs) {
			vscode.window.showInformationMessage(msg);
		}

	});

	const disposable = vscode.commands.registerCommand('backseatcoders.helloWorld', () => {


		vscode.window.showInformationMessage("Boi the extension is working try saving a file my guy");
	});

	context.subscriptions.push(disposable, saveListener, configListener);
	
}

export function deactivate() {}


