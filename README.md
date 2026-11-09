# TideStream — AI Web Research

A small web app that fetches a public HTML page, extracts readable text, and can answer a question about it using a local Ollama model. No paid API key or cloud AI service is required. It fetches one page at a time, follows redirects carefully, checks `robots.txt`, and refuses private/local website targets. It does not attempt to bypass access controls or anti-bot measures.

## Run locally

Requires Python 3.10+ and [Ollama](https://ollama.com/) for local AI answers. The scraper itself works without Ollama.

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
```

To enable free local AI answers, install and start Ollama, then download a model once:

```bash
ollama pull llama3.2
```

Then start the app:

```bash
python app.py
```

Open <http://127.0.0.1:5000>. The app connects to Ollama at `http://127.0.0.1:11434/api/chat` and uses `llama3.2` by default. Change these with `OLLAMA_URL` and `OLLAMA_MODEL` if needed. The model runs on your computer; model downloads use disk space, but there is no per-request API charge. If you do not install Ollama, the app still fetches pages and shows their extracted text.

The backend accepts one page per request (up to 2 MB), checks the destination and each redirect, honors the destination's `robots.txt`, and does not crawl links.

## Notes

Only use this on pages you are allowed to access and process. A site's `robots.txt` is an automated-crawling signal, not a substitute for its terms or applicable law. Some sites may block automated requests, require JavaScript, or return content this simple extractor cannot read; the app does not evade those restrictions.
