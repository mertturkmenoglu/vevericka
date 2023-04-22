export function copyToClipboard(text: string): void {
  const tmpInput = document.createElement('input');
  tmpInput.value = text;
  document.body.appendChild(tmpInput);
  tmpInput.select();
  document.execCommand('copy');
  document.body.removeChild(tmpInput);
}
