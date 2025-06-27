import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 max-w-5xl mx-auto mb-16">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#232946] via-[#3b3b5b] to-[#232946] opacity-90 shadow-2xl rounded-3xl" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-8 py-16 rounded-3xl border border-teal-400/30 shadow-xl backdrop-blur-md bg-white/10 dark:bg-[#232946]/60 flex flex-col items-center gap-8 overflow-visible">
          <h1 className='text-3xl font-extrabold lg:text-5xl bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg leading-relaxed'>
            Welcome to Learning Loop
          </h1>
          <p className='text-gray-100 dark:text-gray-200 text-lg sm:text-xl max-w-2xl mx-auto drop-shadow text-center'>
            Where Curiosity Never Ends. Discover insightful articles, hands-on tutorials, and the latest trends in web development, software engineering, and programming. Whether you're a beginner or a pro, you'll find something valuable here to boost your skills and stay inspired.
          </p>
          <Link
            to='/search'
            className='px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold shadow-lg hover:from-purple-500 hover:to-teal-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 mx-auto text-lg'
          >
            Explore All Posts
          </Link>
        </div>
      </section>
      <div className='flex justify-center my-8'>
        <div className='w-full max-w-4xl p-6 rounded-2xl bg-amber-100 dark:bg-slate-700 shadow-md'>
          <CallToAction />
        </div>
      </div>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-6 justify-center mb-8'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='inline-block mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold shadow-lg hover:from-purple-500 hover:to-teal-500 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 mx-auto'
            >
              View all posts
            </Link>
          </div>
        )}
      </div> 
    </div>
  );
}
