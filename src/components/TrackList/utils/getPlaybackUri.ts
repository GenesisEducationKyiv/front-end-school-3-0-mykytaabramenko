const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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
