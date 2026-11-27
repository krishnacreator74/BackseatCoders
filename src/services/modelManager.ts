import getLMStudioModels from "./modelDiscovery";

export async function get_info(provider:string|undefined, endpoint:string|undefined, savedModel:string|undefined){

    let availableModels: string[] = [];
    let selectedModel: string | undefined;

    try {
        availableModels = await getLMStudioModels(provider, endpoint);
        console.log("Available models:", availableModels);
    } 
    
    catch (error) {
        console.error("LM Studio model discovery failed:", error);
    }

    if (availableModels.length > 0){
        savedModel && availableModels.includes(savedModel)? selectedModel = savedModel:selectedModel = availableModels[0];

    }

    return {
        availableModels,
        selectedModel
    };
}