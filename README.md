# 💀 BackseatCoders

> Never code alone again.

BackseatCoders is a VS Code extension that turns your editor into a Twitch stream.

Every time you save a file, random AI personalities react to your code using a local language model powered by **LM Studio** or **Ollama**.

No cloud AI APIs.  
No subscriptions.  
No API keys.  
Just tiny gremlins living inside your editor.

---

## ✨ Features

- 🤖 AI-powered code reactions
- 🎭 Multiple unique personalities
- ⚡ Automatically reacts every time you save
- 🏠 Runs locally using LM Studio or Ollama
- 🔒 No cloud inference or API keys required
- 🎲 Random personalities on every save
- 🔄 Switch between supported providers
- 🧠 Automatically discovers available local models
- 💾 Remembers your selected model

### Current Cast

- 💀 Twitch Chatter
- 🧙 Ancient Compiler Wizard
- 🐒 Monkey
- 🤡 Brainrot Guy
- 🐸 Discord Moderator
- 🥷 Silent Ninja
- 👴 40-Year C Veteran

Every save randomly picks a few personalities to react to your code.

---

## 🚀 Requirements

- Visual Studio Code
- **Either LM Studio or Ollama**
- At least one locally available language model

### Supported Providers

**LM Studio**
- Install [LM Studio](https://lmstudio.ai/)
- Download a compatible local language model.
- Load the model.
- Start the local server.

**Ollama**
- Install [Ollama](https://ollama.com/)
- Download a model using Ollama.
- Make sure the Ollama server is running.

BackseatCoders automatically discovers available models from your selected provider.

You can configure your provider, endpoint, and model through VS Code settings.

---

## 📸 Example

```text
💀 bro 💀

🧙 Ancient curse detected.

🐸 Rule violation.

👴 Needs pointers.

🤡 chat we're cooked
```

---

## ⚠️ Known Issues

- Responses depend on the selected local model.
- Some personalities are still being expanded.
- This project is currently in active development.

---

## 🛣️ Roadmap

- More personalities
- Personality settings
- Custom personalities
- Better prompt engineering
- Workspace-aware reactions

---

## 📦 Version

### v0.1.0

Initial development release.

- AI personalities
- Automatic reactions on save
- LM Studio integration
- Ollama integration
- Automatic model discovery
- Configurable provider and endpoint
- Model selection and persistence

---

Made because coding alone gets boring.