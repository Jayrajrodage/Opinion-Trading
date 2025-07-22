// Original file: src/proto/engine.proto


export interface Order {
  'price'?: (number | string);
  'quantity'?: (number | string);
}

export interface Order__Output {
  'price'?: (number);
  'quantity'?: (number);
}
