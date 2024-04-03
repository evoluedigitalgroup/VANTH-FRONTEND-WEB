export default async function copyToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, 99999);
  if (window.isSecureContext && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        try {
          const permissionStatus = await navigator.permissions.query({
            name: "clipboard-write",
          });
          if (permissionStatus.state === "prompt") {
            await permissionStatus.request();
            await navigator.clipboard.writeText(text);
          }
        } catch (permissionErr) {
          console.error(
            "Erro ao solicitar permissão para copiar texto:",
            permissionErr
          );
        }
      }
    }
  } else {
    document.execCommand("copy");
  }
  document.body.removeChild(textArea);
}
