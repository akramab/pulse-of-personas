# bg-proto

## backend
Simple wrapper for some of ChatGPT features. Currently supports:

- Ask a prompt to ChatGPT
- Ask a prompt with attached image to ChatGPT (describe image, find object on image, etc)
- Ask ChatGPT to create images from a given prompt

The functions in this current project should be simple enough to use just by looking at the
function signature. You can check it yourself by looking at the ./open-ai/client.go file

Note: to try running the program, make sure to create a config.toml file from the given template and put your API Key there
(instruction to get an API Key could be found [here](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key))


## frontend
Currently using template from Material UI
