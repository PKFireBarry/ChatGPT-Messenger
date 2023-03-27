import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        temperature: 0,
        top_p: .2,
        max_tokens: 2000,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
        n: 1,

    }).then(res => res.data.choices.map((choice: any) => choice.text)[0])
        .catch(err => `ChatGPT Error: 
            ${err.message}`
            );
    var answer = res;
    //clean up the answer
    //remove the '"' from the answer



    return answer;
};

export default query;
