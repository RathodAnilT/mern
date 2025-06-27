import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

export default function DashBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/bookmarks/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setBookmarks(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      fetchBookmarks();
    }
  }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold'>My Bookmarks</h1>
        <span className='text-gray-500'>{bookmarks.length} saved posts</span>
      </div>
      
      {loading ? (
        <div className='flex justify-center items-center min-h-[200px]'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500'></div>
        </div>
      ) : bookmarks.length === 0 ? (
        <div className='text-center py-10'>
          <p className='text-gray-500 text-lg mb-4'>No bookmarked posts yet</p>
          <Link to='/search' className='text-teal-500 hover:underline'>
            Explore posts to bookmark
          </Link>
        </div>
      ) : (
        <div className='flex flex-wrap gap-4 justify-center'>
          {bookmarks.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
} 