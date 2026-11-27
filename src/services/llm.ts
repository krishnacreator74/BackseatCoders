async function fetcher(persona:string, context:string, selectedModel:string|undefined, endpoint:string|undefined){

    if(!selectedModel || !endpoint){
        throw new Error("model or endpoint not defined");
    }

    const response = await fetch(

        `${endpoint}/v1/chat/completions`,

        {
            method:"POST",
            
            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({

                model: selectedModel,

                messages:[
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

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json() as {
        choices?: Array<{
            message?: {
                content?: string;
            };
        }>;
    };

    if (!data.choices?.[0]?.message?.content){

        throw new Error("Invalid LLM response");

    }

    return data;


    

}

export default fetcher;