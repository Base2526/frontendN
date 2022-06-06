/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
export const convertFileToBase64 = file =>
new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    console.log("convertFileToBase64 :", file)
    reader.onload = () => resolve({
        fileName:_.isEmpty(file.fileName) ? (_.isEmpty(file.title) ? file.name: "") : file.fileName,
        base64: reader.result,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
    });
    reader.onerror = reject;
});