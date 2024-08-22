const originalError = console.error;

console.error = (...args) => {
  if (/ReactDOMTestUtils\.act/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
