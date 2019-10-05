/*
 * Функция `convertBytesToHuman` должна принимать
 * аргумент `bytes` только числового типа.
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
    if (typeof(bytes) === "number" && bytes >= 0) {
      let copyBytes = bytes;
      let residue = 0;
      let divided = 0;
      let order;
      let unit = 'KMGTP';
      let postfix = '';

      for (order = 0; order <= 5 && copyBytes >= 1024; order++) {
          residue = copyBytes % 1024 / 1024;
          divided = Math.floor(copyBytes / 1024);

          copyBytes = divided + residue;
      }

      order === 0 ? postfix = '' : postfix = unit[order - 1];

      return copyBytes.toFixed(3) + ' ' + postfix + 'B';
    }
    else
      return false;
}
