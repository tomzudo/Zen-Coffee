import { ProductInput } from "../types/product";

export function validateProductInput(data: ProductInput) {
  const { name, description, price } = data;

  if (!name?.trim() || !description?.trim() || price == null) {
    return { error: "Todos os campos são obrigatórios" };
  }

  if (isNaN(price) || price <= 0) {
    return { error: "O preço deve ser um número positivo válido" };
  }

  return null;
}
