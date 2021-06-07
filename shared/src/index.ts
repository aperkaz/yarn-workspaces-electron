export const sharp = async () => {
  const sharp = require("sharp");

  const imagePath = `/Users/alain/src/taggr/frontend/src/statics/background.jpg`;
  const outputPath = `/Users/alain/Downloads/sharp-test.jpg`;

  await sharp(imagePath, {
    failOnError: false,
  }) // failOnError: true, fixes Samsung corrupted pictures
    .jpeg({ quality: 80 })
    .resize(200, 200, { fit: sharp.fit.outside, withoutEnlargement: true })
    .toFile(outputPath);
};

/**
 * Share module function
 */
export const add = (a: number, b: number) => a + b * 234;
