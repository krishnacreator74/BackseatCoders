async function fetcher(persona:string, context:string){

    const response = await fetch(

        "http://localhost:1234/v1/chat/completions",

        {
            method:"POST",
            
            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify({

                model: "gemma-3-4b",

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

    const data = await response.json();

    return data;
}

export default fetcher;