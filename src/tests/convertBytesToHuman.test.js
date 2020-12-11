import convertBytesToHuman from '../../convertBytesToHuman'

/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== 1,
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === 5
 */


test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-23)).toBe(false);
  expect(convertBytesToHuman(true)).toBe(false);
  expect(convertBytesToHuman(false)).toBe(false);
  expect(convertBytesToHuman(null)).toBe(false);
  expect(convertBytesToHuman(undefined)).toBe(false);
  expect(convertBytesToHuman(NaN)).toBe(false);
  expect(convertBytesToHuman('string')).toBe(false);
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(34)).toBe("34.000 B");
  expect(convertBytesToHuman(1024)).toBe("1.000 KB");
  expect(convertBytesToHuman(4096)).toBe("4.000 KB");
  expect(convertBytesToHuman(93407)).toBe("91.218 KB");
  expect(convertBytesToHuman(354840569)).toBe("338.402 MB");
  expect(convertBytesToHuman(834934643123)).toBe("777.593 GB");
  expect(convertBytesToHuman(9192465624498)).toBe("8.360 TB");
  expect(convertBytesToHuman(23534464363458784)).toBe("20.903 PB");
});

