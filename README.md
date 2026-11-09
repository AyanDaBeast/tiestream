# TideStream — AI Web Research

A prompt-driven local web app: describe what you want to find, include up to five public webpage or YouTube URLs, and TideStream gathers readable page text or available public captions. A local Ollama model can analyze the sources for free; no paid AI API key is needed. It checks website `robots.txt`, validates public URLs and redirects, and does not attempt to bypass logins, paywalls, DRM, or anti-bot measures.

## Run locally

Requires Python 3.10+ and [Ollama](https://ollama.com/) for AI answers. Web text/captions can still be collected without Ollama.

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
ollama pull llama3.2
python app.py
```

Open <http://127.0.0.1:5000>. Start Ollama in the background. TideStream connects to `http://127.0.0.1:11434/api/chat`, using `llama3.2` by default. Change the model with `OLLAMA_MODEL` or endpoint with `OLLAMA_URL`. Ollama runs the model on your computer, so there is no per-request AI charge; model downloads need disk space and your computer needs enough memory.

## Using the prompt

Write what you want to collect or compare and include the source URL(s) in the same prompt. Up to five URLs are read per request. Example:

> Compare the main features and listed prices on these pages: https://example.com/item-a https://example.com/item-b

For video, add a YouTube URL and ask for a summary or key points. Video support uses available public captions/transcripts only; it does not download video or extract audio. Other video platforms and videos without available captions are not supported yet. For general web discovery without giving a URL, a search provider would be needed; this first version uses the URLs you provide.

## Limits and responsible use

The app fetches one page per URL and does not crawl entire sites. It accepts public HTTP(S) URLs on standard ports and caps each HTML page at 2 MB. `robots.txt` is an automated-crawling signal, not a substitute for site terms or applicable law. Some sites may block automated requests, require JavaScript, or return content the simple extractor cannot read. Only use sources you are allowed to access and process.
