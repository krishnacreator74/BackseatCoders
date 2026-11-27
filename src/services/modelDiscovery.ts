import { ModelResponseLM, ModelResponseOL } from "../types/models";

async function getLMStudioModels(provider:string|undefined, endpoint:string|undefined){


    let model,model_data = undefined;


    switch(provider){
    

    case "lmstudio":    
    
        model = await fetch(
            `${endpoint}/v1/models`,
            {
                method:"GET",
            }
        );
        
        if(!model.ok){
            throw new Error(`HTTP Error: ${model.status}`);
        }
        
        model_data = await model.json() as ModelResponseLM;
        return model_data.data.map(model => model.id);


    case "ollama":
        model = await fetch(
            `${endpoint}/api/tags`,
            {
                method:"GET",
            }
        );
        if(!model.ok){
            throw new Error(`HTTP Error: ${model.status}`);
        }
        
        model_data = await model.json() as ModelResponseOL;
        return model_data.models.map(model=> model.name);


    default:

        console.error("Worng provider");

        throw new Error;

    }

}

export default getLMStudioModels;