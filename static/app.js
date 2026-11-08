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
  result.replaceChildren(el('p', 'loading', 'Reading the page…'));
  button.disabled = true;
  button.innerHTML = 'Working <span>…</span>';
  try {
    const response = await fetch('/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: form.elements.url.value.trim(),
        instruction: form.elements.instruction.value.trim()
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The request could not be completed.');

    const heading = el('div', 'result-heading');
    const title = el('h2', '', data.title);
    const link = el('a', 'source-link', 'View source ↗');
    link.href = data.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    heading.append(title, link);
    result.replaceChildren(heading);

    if (data.analysis) {
      const answer = el('div', 'answer');
      answer.append(el('p', 'eyebrow', 'AI FINDINGS'), el('p', 'answer-copy', data.analysis));
      result.append(answer);
    } else {
      const note = el('p', 'notice', 'AI analysis is not configured yet. Add OPENAI_API_KEY to your environment to ask questions; readable page text is shown below.');
      result.append(note);
    }
    const details = el('details', 'page-text');
    const summary = el('summary', '', 'View extracted page text');
    details.append(summary, el('pre', '', data.text));
    result.append(details);
  } catch (error) {
    result.replaceChildren(el('p', 'error', error.message));
  } finally {
    button.disabled = false;
    button.innerHTML = 'Research page <span>→</span>';
  }
});
