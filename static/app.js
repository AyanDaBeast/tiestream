const form = document.querySelector('#scrape-form');
const button = document.querySelector('#submit');
const result = document.querySelector('#result');

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  result.hidden = false;
  result.replaceChildren(el('p', 'loading', 'Reading your sources…'));
  button.disabled = true;
  button.innerHTML = 'Working <span>…</span>';
  try {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: form.elements.prompt.value.trim() })
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data.error || 'The request could not be completed.';
      throw new Error(data.details?.length ? `${message}\n${data.details.join('\n')}` : message);
    }

    result.replaceChildren(el('h2', '', 'Your research'));
    if (data.analysis) {
      const answer = el('div', 'answer');
      answer.append(el('p', 'eyebrow', 'LOCAL AI FINDINGS'), el('p', 'answer-copy', data.analysis));
      result.append(answer);
    } else {
      result.append(el('p', 'notice', 'Sources were collected, but local AI is not responding. Install and start Ollama and download a model (see the README). Extracted source text is available below.'));
    }
    if (data.errors?.length) {
      const warnings = el('p', 'notice');
      warnings.textContent = `Some URLs could not be read: ${data.errors.join(' · ')}`;
      result.append(warnings);
    }
    for (const source of data.sources) {
      const card = el('details', 'page-text');
      const summary = el('summary', '', `${source.title} — ${source.url}`);
      const link = el('a', 'source-link', 'Open source ↗');
      link.href = source.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      card.append(summary, link, el('pre', '', source.text));
      result.append(card);
    }
  } catch (error) {
    result.replaceChildren(el('p', 'error', error.message));
  } finally {
    button.disabled = false;
    button.innerHTML = 'Research <span>→</span>';
  }
});
