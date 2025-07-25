import React,{useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const[loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
    .post("https://book-store-tgx6.onrender.com/books", data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar("Book created successfully", {variant: 'success'});
      navigate("/");
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar(error.message, {variant: 'error'});
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBook