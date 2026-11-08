# TideStream — AI Web Research

A small web app that fetches a public HTML page, extracts readable text, and optionally uses OpenAI to answer a question about it. It fetches one page at a time, follows redirects carefully, checks `robots.txt`, and refuses private/local network targets. It does not attempt to bypass access controls or anti-bot measures.

## Run locally

Requires Python 3.10+.

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
cp .env.example .env       # optional; configure an AI key to enable analysis
python app.py
```

Open <http://127.0.0.1:5000>. To enable AI answers, set `OPENAI_API_KEY` in your environment (or load it from `.env` using your preferred environment loader). Optionally set `OPENAI_MODEL`; defaults to `gpt-4o-mini`. Keep API keys private and never commit them.

Without an AI key, the app still fetches the page and displays its extracted text. The backend accepts one page per request (up to 2 MB), checks the destination and each redirect, honors the destination's `robots.txt`, and does not crawl links.

## Notes

Only use this on pages you are allowed to access and process. A site's `robots.txt` is an automated-crawling signal, not a substitute for its terms or applicable law. Some sites may block automated requests, require JavaScript, or return content this simple extractor cannot read; the app does not evade those restrictions.
