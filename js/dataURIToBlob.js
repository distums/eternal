export function dataURIToBlob(dataURI) {
  const dataURIParts = dataURI.split(',');
  const byteStr = atob(dataURIParts[1].replace(/\s/g, ''));
  const mimeStr = dataURIParts[0].split(';')[0].split(':')[1];
  const ab = new ArrayBuffer(byteStr.length);
  const typedArray = new Uint8Array(ab);
  for (let i = 0; i < byteStr.length; i++) {
    typedArray[i] = byteStr.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeStr });
  return blob;
}
