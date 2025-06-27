import { useState } from 'react';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaLink, 
  FaWhatsapp 
} from 'react-icons/fa';

export default function ShareButtons({ post }) {
  const [copied, setCopied] = useState(false);

  const currentUrl = window.location.href;
  const postTitle = post?.title || 'Check out this amazing post!';
  const postDescription = post?.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...' || '';

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(postTitle + ' ' + currentUrl)}`
  };

  const handleShare = (platform) => {
    const url = shareUrls[platform];
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log('Error copying link:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-3 bg-gray-50/80 dark:bg-gray-800/80 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm mb-2">
      <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-1">
        Share this post
      </h3>
      <div className="grid grid-cols-5 gap-2 w-full max-w-md">
        <button
          onClick={() => handleShare('facebook')}
          className="flex flex-col items-center gap-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all duration-200 hover:scale-105"
          title="Share on Facebook"
        >
          <FaFacebook className="w-5 h-5" />
          <span className="text-xs">Facebook</span>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="flex flex-col items-center gap-1 p-2 bg-sky-500 hover:bg-sky-600 text-white rounded transition-all duration-200 hover:scale-105"
          title="Share on Twitter"
        >
          <FaTwitter className="w-5 h-5" />
          <span className="text-xs">Twitter</span>
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="flex flex-col items-center gap-1 p-2 bg-blue-700 hover:bg-blue-800 text-white rounded transition-all duration-200 hover:scale-105"
          title="Share on LinkedIn"
        >
          <FaLinkedin className="w-5 h-5" />
          <span className="text-xs">LinkedIn</span>
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="flex flex-col items-center gap-1 p-2 bg-green-500 hover:bg-green-600 text-white rounded transition-all duration-200 hover:scale-105"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5" />
          <span className="text-xs">WhatsApp</span>
        </button>
        <button
          onClick={handleCopyLink}
          className={`flex flex-col items-center gap-1 p-2 rounded transition-all duration-200 hover:scale-105 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
          title={copied ? 'Link copied!' : 'Copy link'}
        >
          <FaLink className="w-5 h-5" />
          <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      {copied && (
        <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Link copied!
        </div>
      )}
      <div className="w-full border-b border-gray-200 dark:border-gray-700 mt-2"></div>
    </div>
  );
} 