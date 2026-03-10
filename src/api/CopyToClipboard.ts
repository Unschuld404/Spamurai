export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard: ' + text);
      return true;
    } catch (error) {}
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    return success
  } catch (error) {
    console.error(error);
    return false;
  }
}
