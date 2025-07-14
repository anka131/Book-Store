import {useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const[loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`https://book-store-tgx6.onrender.com/books/${id}`).then(
      (response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear)
        setLoading(false)
      }
    ).catch((error) =>{ 
      setLoading(false);
      enqueueSnackbar('Error fetching data', {variant: 'error'});
      console.log(error.message);
      
    })
  },[])
  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
    .put( `https://book-store-tgx6.onrender.com/books/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book updated successfully', {variant: 'success'});
      navigate("/");
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('Error editing book', {variant: 'error'});
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? (
        <Spinner />
      ) :('')}
      <div className='flex flex-col border-2 border-sky-400 rounde-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full py-2 px-4 border-2 border-gray-400'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input type='text'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='w-full py-2 px-4 border-2 border-gray-400'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input type='text'
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='w-full py-2 px-4 border-2 border-gray-400'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditBook