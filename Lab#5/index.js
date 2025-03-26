function tree(n) {
    printTreeTop(n);
    printTreeBottom(n);
  }
  
  function printTreeTop(n) {
    for (let i = 0; i < n; i++) {
      let spaces = repeatchar(n - i - 1, ' ');
      let stars = repeatchar(2 * i + 1, '*');
      console.log(spaces + stars);
    }
  }
  
  function printTreeBottom(n) {
    for (let i = 0; i < 3; i++) {
      let spaces = repeatchar(n - 1, ' ');
      console.log(spaces + '*');
    }
  }
  
  function repeatchar(n, char) {
    return char.repeat(n);
  }
  
  tree(4);
  