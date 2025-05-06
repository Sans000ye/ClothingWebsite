export const createProduct = (id, image, name, rating, price, originalPrice = null, discount = null) => ({
  id,
  image,
  name,
  rating,
  price,
  originalPrice,
  discount,
});