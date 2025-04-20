const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function validateImageUrl(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve("URL does not point to a valid image");
    img.src = url;
  });
}

export function getPlaybackUri(audioFile) {
  if (isAbsoluteUri(audioFile)) return audioFile;

  return `${apiBaseUrl}/api/files/${audioFile}`;
}

function isAbsoluteUri(uri) {
  try {
    new URL(uri);
    return true;
  } catch {
    return false;
  }
}
