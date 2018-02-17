const add = (a, b) => {
  if (typeof(b) !== 'number'){
    return  a+a;
  }
  return a+b;
};

const square = (a) => a*a;

describe('add', function(){
  it('should add two numbers', function(){
    const result = add(11,9);

    if (result !== 20){
      throw new Error('Sum not equal to expected value')
    }
  });

  it('should double single number', function(){
    const result = add(44);

    if(result != 88){
      throw new Erro('was not doubled"');
    }
  });
});

describe('square', function(){
  it('should square a number', function (){
    const result = square(9);
     if (result != 81){
       throw new Error('Expected square not correct')
     }
  });
});
