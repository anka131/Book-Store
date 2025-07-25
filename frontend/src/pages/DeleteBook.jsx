import React, {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

function DeleteBook() {
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();

  const handleDeleteBook =() => {
    setLoading(true);
    axios.delete(`https://book-store-tgx6.onrender.com/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error deleting book', { variant: 'error' });
      console.log(error.message);
      
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl m-4'>Delete Book</h1>
      {loading ? (<Spinner />) : ("")}
      <div className='flex flex-col items-center border-3 border-sky-400 rounded-xl w-[600px] p-8 mx-auto' >
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBook