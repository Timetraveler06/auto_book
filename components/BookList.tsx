import React from 'react'

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string

}

const BookList = ({title, books, containerClassName}: Props) => {
  return (
    <section>
      <h2 className='text-light-100 text-4xl font-bebas-neue'>
        Popular books
      </h2>
    </section>
  )
}

export default BookList