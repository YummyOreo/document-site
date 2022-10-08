export function parse(text) {
  return marked.parse(text, {
    breaks: true,
  });
}
