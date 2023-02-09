import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0.1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
        stream: false,
        stop: ["\n", " Human:", " AI:"],
    }).then(res => res.data.choices.map((choice: any) => choice.text)[0])
        .catch(err => `ChatGPT Error: 
            ${err.message}`
            );
    return res;
};

export default query;