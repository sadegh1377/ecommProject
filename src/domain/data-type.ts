export interface signUp {
  name: string,
  email: string,
  password: string
}

export interface login {
  email: string,
  password: string
}

export interface product {
  name: string,
  price: string,
  category: string,
  color: string,
  description: string,
  image: string,
  id: number,
  quantity: undefined | number,
  productId: undefined | number
}

export interface cart {
  name: string,
  price: string,
  category: string,
  color: string,
  description: string,
  image: string,
  id: number | undefined,
  quantity: undefined | number,
  productId: number,
  userId: number
}

export interface priceSummary {
  price: number,
  discount: number,
  tax: number,
  delivery: number,
  total: number
}

export interface checkout {
  email: string,
  address: string,
  contact: string
}

export interface order {
  email: string,
  address: string,
  contact: string,
  totalPrice: number,
  userId: string,
  id: number | undefined
}
