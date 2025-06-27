import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { FaShare } from 'react-icons/fa';

export default function PostCard({ post }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes ? post.likes.length : 0);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Check if post is bookmarked (this will be updated when we fetch user data)
    if (currentUser && currentUser.bookmarks) {
      setIsBookmarked(currentUser.bookmarks.includes(post._id));
    }
    // Check if post is liked
    if (currentUser && post.likes) {
      setIsLiked(post.likes.includes(currentUser.id));
    }
    // Set initial like count
    setLikeCount(post.likes ? post.likes.length : 0);
  }, [currentUser, post._id, post.likes]);

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
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

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
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

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const postUrl = `${window.location.origin}/post/${post.slug}`;
    
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  // Ensure tags is always an array
  const tags = post.tags || [];

  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        
        {/* Category and Stats Row */}
        <div className='flex justify-between items-center'>
          <span className='italic text-sm text-gray-600 dark:text-gray-400'>{post.category}</span>
          <div className='flex items-center gap-3'>
            <span className='text-xs text-gray-500'>👁️ {post.views || 0}</span>
            <span className='text-xs text-gray-500'>❤️ {likeCount}</span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            {currentUser && (
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className='flex items-center gap-1 px-2 py-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors'
                title={isLiked ? 'Unlike' : 'Like'}
              >
                {likeLoading ? (
                  <div className='w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin'></div>
                ) : isLiked ? (
                  <HiHeart className='w-4 h-4' />
                ) : (
                  <HiOutlineHeart className='w-4 h-4' />
                )}
                <span className='text-xs'>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            )}
            {currentUser && (
              <button
                onClick={handleBookmark}
                disabled={bookmarkLoading}
                className='flex items-center gap-1 px-2 py-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors'
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
              >
                {bookmarkLoading ? (
                  <div className='w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                ) : isBookmarked ? (
                  <HiHeart className='w-4 h-4' />
                ) : (
                  <HiOutlineHeart className='w-4 h-4' />
                )}
                <span className='text-xs'>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            )}
          </div>
          
          <button
            onClick={handleShare}
            className='flex items-center gap-1 px-2 py-1 text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors'
            title={copied ? 'Link copied!' : 'Share post'}
          >
            <FaShare className='w-4 h-4' />
            <span className='text-xs'>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className='text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full'
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className='text-xs text-gray-500'>+{tags.length - 3} more</span>
            )}
          </div>
        )}
        
        <Link
          to={`/post/${post.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </div>
  );
}
