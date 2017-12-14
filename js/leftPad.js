function leftPad(length, char = '0') {
  const times = Math.ceil(length / char.length);
  const pad = char.repeat(times);
  return str => (pad + str).substr(-length);
}
