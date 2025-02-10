import React from 'react'

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string

}

const BookList = ({title, books, containerClassName}: Props) => {
  return (
    <section className={containerClassName }>
      <h2 className='text-light-100 text-4xl font-bebas-neue'>
        {title}
      </h2>
      <ul className='book-list'>
        
      </ul>
    </section>
  )
}

export default BookList