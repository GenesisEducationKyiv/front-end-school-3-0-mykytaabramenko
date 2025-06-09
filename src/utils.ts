import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export async function validateImageUrl(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve("URL does not point to a valid image");
    img.src = url;
  });
}

export function getPlaybackUri(audioFile: string) {
  if (isAbsoluteUri(audioFile)) return audioFile;

  return `${apiBaseUrl}/api/files/${audioFile}`;
}

function isAbsoluteUri(uri: string) {
  try {
    new URL(uri);
    return true;
  } catch {
    return false;
  }
}

export function handleApiError(e: unknown): never {
  const isInstanceOfError = e instanceof Error;
  if (!isInstanceOfError) {
    throw new Error(`Unexpected error happened: ${String(e)}`);
  }

  const fallbackMessage = `Error while performing API call: ${e.message}`;

  if (axios.isAxiosError(e)) {
    throw new Error(e.response?.data?.error || fallbackMessage);
  }

  throw new Error(fallbackMessage);
}
