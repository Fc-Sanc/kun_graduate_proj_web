export function bookModel(book) {
  return {
    id: book.id,
    isbn: book.isbn,
    name: book.name,
    coverUrl: book.coverUrl,
    price: book.price,
    sales: book.salesCount,
    quantity: book.quantity,
    type: book.type.name,
    author: book.author.name,
    publish: book.publish.name,
    brief: book.descText,
    language: book.language,
    isLiked: false
  }
}
