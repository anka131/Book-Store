import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import{MdOutlineAddBox} from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';


function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table')
  useEffect(()=>{
    setLoading(true);
    axios
    .get('https://book-store-tgx6.onrender.com/books')
    .then((res) =>{
        setBooks(res.data.data);
        setLoading(false);
      }) 
      .catch(
        (error) => {
      console.log(error);
      setLoading(false);
      })
  },[])
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
         <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setShowType('table')}>Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={()=>setShowType('card')}> Card </button>
       
      </div>
      <div className='flex flex-col'>
        <div className=' flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create'>
        <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
        </div>
        <div>
           {
          loading ? (
          <Spinner />
        ) : (showType === 'table' ?
          (<BooksTable books={books} />) : (<BooksCard books={books} />)
        )
        }
        </div>
       
      </div>
    </div>
  )
}

export default Home