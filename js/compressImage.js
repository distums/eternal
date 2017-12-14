const max_file_size = 60 * 1024;
const max_dimension_width = 600;

/**
 * 计算图片压缩比
 * @param {Number} size 原始图片大小
 */
function computeQuality(size) {
  return parseFloat((max_file_size * 0.75 / size).toFixed(2));
}

export function compress(
  sourceImageElement,
  file,
  { onSuccess, onError } = {}
) {
  if (!FileReader in window) {
    typeof onError === 'function' &&
      onError(new Error('your browser does not support `FileReader`'));
    return;
  }
  const fileReader = new FileReader();
  fileReader.onload = ev => {
    sourceImageElement.src = ev.target.result;
    sourceImageElement.onload = () => {
      const quality = computeQuality(file.size);
      const cvs = document.createElement('canvas');
      const dimensionRate =
        sourceImageElement.naturalWidth / sourceImageElement.naturalHeight;
      const dw =
        sourceImageElement.naturalWidth > max_dimension_width
          ? max_dimension_width
          : sourceImageElement.naturalWidth;
      const dh = Math.round(dw / dimensionRate);
      cvs.width = dw;
      cvs.height = dh;
      cvs.getContext('2d').drawImage(sourceImageElement, 0, 0, dw, dh);
      const dataURL = cvs.toDataURL(file.type, quality);
      typeof onSuccess === 'function' &&
        onSuccess(dataURL, sourceImageElement.src);
    };
  };
  fileReader.onerror = er => {
    typeof onError === 'function' && onError(er);
  };
  fileReader.readAsDataURL(file);
}
