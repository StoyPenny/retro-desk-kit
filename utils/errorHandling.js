function safeEval(expression) {
  try {
    return eval(expression);
  } catch (error) {
    console.error('Calculator error:', error);
    return 'Error';
  }
}
