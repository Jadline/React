const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}
/*
//destructuring
const book = getBook(3)
book;
// const title = book.title;
// const author = book.author;
// author;
// title;
book;
const{title,author,pages,publicationDate,genres,hasMoviesAdaptation} = book;
console.log(title,author)

//destructuring in arrays does not rely on the variable name but on the order
console.log(author,title,genres);
const primaryGenre = genres[0];
const secondaryGenre = genres[1];
primaryGenre;
secondaryGenre;



//Rest/spread operator 
//if we want to include other member of the arrays that we didnt include we use rest operator
const [genre1,genre2,...otherGenres] = genres;
genre1;
genre2;
otherGenres;
console.log(genre1,genre2,otherGenres)
//the rest operator must be the last in the destructuring pattern
const newGenres = [...genres,"epic fantasy"]
newGenres;

//objects 
const updatedBook = {
  ...book,
  //adding a new property
  moviePublicationDate : "2001-12-19",

  //overriding an existing property
  // pages : 1210
}
updatedBook;

//Template literals;
const summary = `${title} is a book with ${pages} pages and was written by ${author} in ${publicationDate.split("-")[0]}.The book  has ${hasMoviesAdaptation ? "" : "not"} been adapted as a movie`;
summary;

//using the ternary operator
const validation = pages > 1000 ? "over one thousand" : "less than one thousand"
validation;
console.log(`The book has ${validation} pages`)

//arrow functions 
// function getYear(str){
//   return str.split("-")[0]
// }

const getYear = (str) => {
  return str.split("-")[0]
}
console.log(getYear(publicationDate))

//shortcircuting and logical operators 
//it means that the logical operator will return the first value without
//even looking at the second value
//and operator  = if the first value is true ,,it will automatically return the second value
console.log(true && "some string")
console.log(false && "some string")

// console.log(hasMovieAdaptation&& 'This book has a movie')
console.log('jad' && 'some string')


//or operator = opposite of and operator
console.log(true || 'some string')
console.log(false || 'some string')

console.log(book.translations.spanish)
const spanishTranslation = book.translations.spanish || "not translated"
spanishTranslation
// console.log(book.reviews.librarything.reviewsCount)


// //when its 0 
// const count = book.reviews.librarything.reviewsCount ?? "no data"
// count;
//to get the total reviews for the each book

//optional chaining = if we are not sure of our data structure
function getTotalReviewCount(book){
  const goodreads = book.reviews?.goodreads?.reviewsCount;
  const Librarything = book.reviews?.librarything?.reviewsCount ?? 0
  return  goodreads + Librarything

}
console.log(getTotalReviewCount(book));
*/

//map,reduce,filter,sort
//map = they dont mutate the new array they return a new array based on the new one
const books = getBooks()

//we want an array that has all the titles


/*
const bookTitles = books.map((book) => book.title)
console.log(bookTitles)

const essentialData = books.map((book) => ({title : book.title,author : book.author,reviewsCount : book.reviews?.goodreads?.reviewsCount ?? 0 + book.reviews?.librarything?.reviewsCount ?? 0 }))
console.log(essentialData)


//filter method 
//gets an array based on a condition
const longBooks = books.filter((book) => book.pages > 500).filter((book) => book.hasMovieAdaptation)
console.log(longBooks)


const adventureBooks = books.filter((book) => book.genres.includes("adventure")).map((book) => book.title)
console.log(adventureBooks)

//reduce (most powerful)
//mathematical operations in the numbers 
//reduce the array into one value
//it takes a function and a starter value
const pagesAllBooks = books.reduce((acc,book) => acc + book.pages ,0 )
pagesAllBooks


//sort method
const x = [51,22,78,1,9,4].sort((a,b) => b -a )
x
const sortedBooks = books.slice().sort((a,b) => a.pages - b.pages)
sortedBooks

//working with immutable arrays 
//we dont manipulate the underlying data structure

//add a book object to array 
const newbook = {
  id : 6,
  title : "Harry potter and the chamber of secrets",
  author : "j. k. Rowling"
}
const newBooksAfter = [...books,newbook]
newBooksAfter

//delete a book from the  array
const newArr = newBooksAfter.filter((book) => book.id !== 3)
newArr;


//update a book object while in the array
const bookAfterUpdate = newBooksAfter.map((book) => book.id === 1 ? {...book,pages : 1} : book)

console.log(bookAfterUpdate)
*/


//Asynchronous Javascript 
//promises 
//then will be called as soon as the promise is fulfilled
// fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json()).then((data) => console.log(data))


async function getTodos(){
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json()
  console.log(data)

}

getTodos()
console.log('jonas')

