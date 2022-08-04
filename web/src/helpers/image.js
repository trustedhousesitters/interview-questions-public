/**
 * Resolves a Promise once the image has loaded
 * @param {string} imageUrl
 * @returns {Promise<void>}
 */
const loadImage = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = function onImageLoaded() {
      resolve();
    };

    img.onerror = function onImageErrored() {
      reject();
    };
  });
};

export { loadImage };
