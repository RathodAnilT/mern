import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import ShareButtons from '../components/ShareButtons';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLikeCount(data.posts[0].likes ? data.posts[0].likes.length : 0);
          setLoading(false);
          setError(false);
          
          // Increment views when post is loaded
          if (data.posts[0] && data.posts[0]._id) {
            try {
              await fetch(`/api/post/increment-views/${data.posts[0]._id}`, {
                method: 'PUT',
              });
            } catch (error) {
              console.log('Error incrementing views:', error);
            }
          }
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    // Check if post is bookmarked
    if (currentUser && currentUser.bookmarks && post) {
      setIsBookmarked(currentUser.bookmarks.includes(post._id));
    }
    // Check if post is liked
    if (currentUser && post && post.likes) {
      setIsLiked(post.likes.includes(currentUser.id));
    }
  }, [currentUser, post]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const handleBookmark = async () => {
    if (!currentUser || !post) {
      return;
    }

    try {
      setBookmarkLoading(true);
      const res = await fetch(`/api/user/bookmark/${currentUser._id}/${post._id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      
      if (res.ok) {
        setIsBookmarked(data.bookmarked);
      }
    } catch (error) {
      console.log('Error toggling bookmark:', error);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleLike = async () => {
    if (!currentUser || !post) {
      return;
    }

    try {
      setLikeLoading(true);
      const res = await fetch(`/api/post/toggle-like/${post._id}`, {
        method: 'PUT',
      });
      const data = await res.json();
      
      if (res.ok) {
        setIsLiked(data.liked);
        setLikeCount(prev => data.liked ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.log('Error toggling like:', error);
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}
      </h1>
      <div className='flex justify-center items-center gap-4 mt-5'>
        <Link
          to={`/search?category=${post && post.category}`}
        >
          <Button color='gray' pill size='xs'>
            {post && post.category}
          </Button>
        </Link>
        {currentUser && (
          <Button
            color='gray'
            pill
            size='xs'
            onClick={handleLike}
            disabled={likeLoading}
          >
            {likeLoading ? (
              <div className='w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin'></div>
            ) : isLiked ? (
              <HiHeart className='w-4 h-4 text-red-500' />
            ) : (
              <HiOutlineHeart className='w-4 h-4' />
            )}
            <span className='ml-1 text-xs'>{likeCount}</span>
          </Button>
        )}
        {currentUser && (
          <Button
            color='gray'
            pill
            size='xs'
            onClick={handleBookmark}
            disabled={bookmarkLoading}
          >
            {bookmarkLoading ? (
              <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
            ) : isBookmarked ? (
              <HiHeart className='w-4 h-4 text-blue-500' />
            ) : (
              <HiOutlineHeart className='w-4 h-4' />
            )}
          </Button>
        )}
      </div>
      {post && post.tags && post.tags.length > 0 && (
        <div className='flex justify-center flex-wrap gap-2 mt-3'>
          {post.tags.map((tag, index) => (
            <Link key={index} to={`/search?tag=${tag}`}>
              <span className='text-xs bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 px-3 py-1 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors'>
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      )}
      <img
        src={post && post.image}
        alt={post && post.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <div className='flex gap-4'>
          <span className='italic'>
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
          <span className='text-gray-500'>👁️ {post && (post.views || 0)} views</span>
          <span className='text-gray-500'>❤️ {likeCount} likes</span>
        </div>
      </div>
      <div
        className='p-3 max-w-2xl mx-auto w-full post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      
      {/* Share Buttons */}
      <div className='max-w-2xl mx-auto w-full mt-8'>
        <ShareButtons post={post} />
      </div>
      
      <div className='max-w-4xl mx-auto w-full'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
 