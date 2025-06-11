export async function validateImageUrl(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve("URL does not point to a valid image");
    img.src = url;
  });
}
