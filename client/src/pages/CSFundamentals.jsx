import React, { useState } from 'react';

const csTopics = [
  // Core Subjects
  {
    title: 'Operating Systems',
    category: 'Core Subjects',
    summary: 'Explore how operating systems work: processes, memory management, file systems, scheduling, and more.',
    videos: [
      {
        title: 'Operating System - Complete Course',
        url: 'https://www.youtube.com/embed/26QPDBe-NB8',
        creator: 'Neso Academy',
        creatorUrl: 'https://www.youtube.com/@NesoAcademy',
      },
    ],
    resources: [
      { name: 'Operating Systems: Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/', credit: 'Remzi & Andrea Arpaci-Dusseau' },
      { name: 'OS Playlist (YouTube)', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRiw-GZRqfnlVIBz9dxrqHJS', credit: 'Neso Academy' },
    ],
  },
  {
    title: 'Databases',
    category: 'Core Subjects',
    summary: 'Learn about relational databases, SQL, NoSQL, transactions, normalization, and database design.',
    videos: [
      {
        title: 'Database Design Course - Learn how to design and plan a database for beginners',
        url: 'https://www.youtube.com/embed/ztHopE5Wnpc',
        creator: 'freeCodeCamp.org',
        creatorUrl: 'https://www.youtube.com/@freecodecamp',
      },
    ],
    resources: [
      { name: 'SQL Tutorial', url: 'https://www.w3schools.com/sql/', credit: 'W3Schools' },
      { name: 'MongoDB University', url: 'https://university.mongodb.com/', credit: 'MongoDB' },
    ],
  },
  {
    title: 'SQL',
    category: 'Core Subjects',
    summary: 'Master SQL for querying and managing relational databases. Learn about SELECT, JOIN, GROUP BY, and more.',
    videos: [
      {
        title: 'SQL Full Course - Learn SQL in 4 Hours',
        url: 'https://www.youtube.com/embed/7S_tz1z_5bA',
        creator: 'Programming with Mosh',
        creatorUrl: 'https://www.youtube.com/@ProgrammingwithMosh',
      },
    ],
    resources: [
      { name: 'SQLBolt Interactive Lessons', url: 'https://sqlbolt.com/', credit: 'SQLBolt' },
      { name: 'LeetCode SQL Problems', url: 'https://leetcode.com/problemset/database/', credit: 'LeetCode' },
    ],
  },
  {
    title: 'Networking',
    category: 'Core Subjects',
    summary: 'Understand the basics of computer networks, protocols, the OSI model, TCP/IP, and how the internet works.',
    videos: [
      {
        title: 'Computer Networking Course - Network Engineering [CompTIA Network+ Exam Prep]',
        url: 'https://www.youtube.com/embed/qiQR5rTSshw',
        creator: 'freeCodeCamp.org',
        creatorUrl: 'https://www.youtube.com/@freecodecamp',
      },
    ],
    resources: [
      { name: 'Computer Networking: Principles, Protocols and Practice', url: 'https://www.computer-networking.info/', credit: 'Olivier Bonaventure' },
      { name: 'Cisco Networking Basics', url: 'https://www.netacad.com/courses/networking/networking-essentials', credit: 'Cisco Networking Academy' },
    ],
  },
  // DSA
  {
    title: 'Data Structures',
    category: 'DSA',
    summary: 'Learn about arrays, linked lists, stacks, queues, trees, graphs, and more.',
    videos: [
      {
        title: 'Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer',
        url: 'https://www.youtube.com/embed/RBSGKlAvoiM',
        creator: 'freeCodeCamp.org',
        creatorUrl: 'https://www.youtube.com/@freecodecamp',
      },
    ],
    resources: [
      { name: 'GeeksforGeeks Data Structures', url: 'https://www.geeksforgeeks.org/data-structures/', credit: 'GeeksforGeeks' },
      { name: 'Data Structures Visualizations', url: 'https://visualgo.net/en', credit: 'VisuAlgo' },
    ],
  },
  {
    title: 'Algorithms',
    category: 'DSA',
    summary: 'Understand sorting, searching, recursion, dynamic programming, greedy algorithms, and more.',
    videos: [
      {
        title: 'Algorithms Course - Full Tutorial with Examples',
        url: 'https://www.youtube.com/embed/8hly31xKli0',
        creator: 'freeCodeCamp.org',
        creatorUrl: 'https://www.youtube.com/@freecodecamp',
      },
    ],
    resources: [
      { name: 'Introduction to Algorithms', url: 'https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/', credit: 'MIT Press' },
      { name: 'LeetCode Algorithms', url: 'https://leetcode.com/problemset/all/', credit: 'LeetCode' },
    ],
  },
  // System Design
  {
    title: 'System Design',
    category: 'System Design',
    summary: 'Learn how to design scalable systems, architecture patterns, databases, caching, and more for real-world applications.',
    videos: [
      {
        title: 'System Design Full Course for Beginners',
        url: 'https://www.youtube.com/embed/UzLMhqg3_Wc',
        creator: 'Gaurav Sen',
        creatorUrl: 'https://www.youtube.com/@gkcs',
      },
    ],
    resources: [
      { name: 'System Design Primer', url: 'https://github.com/donnemartin/system-design-primer', credit: 'Donne Martin (GitHub)' },
      { name: 'Grokking the System Design Interview', url: 'https://www.educative.io/courses/grokking-the-system-design-interview', credit: 'Educative.io' },
    ],
  },
  // Aptitude (placeholder)
  {
    title: 'Aptitude (Quantitative, Logical, Verbal)',
    category: 'Aptitude',
    summary: 'Sharpen your aptitude skills for placements and competitive exams. Practice quantitative, logical reasoning, and verbal ability.',
    videos: [
      {
        title: 'Aptitude Preparation - Complete Playlist',
        url: 'https://www.youtube.com/embed/1gkBD4U4kkA',
        creator: 'TalentSprint Aptitude Prep',
        creatorUrl: 'https://www.youtube.com/@TalentSprintAptitudePrep',
      },
    ],
    resources: [
      { name: 'IndiaBix Aptitude', url: 'https://www.indiabix.com/aptitude/questions-and-answers/', credit: 'IndiaBix' },
      { name: 'GeeksforGeeks Aptitude', url: 'https://www.geeksforgeeks.org/aptitude-questions/', credit: 'GeeksforGeeks' },
    ],
  },
];

const categories = ['Core Subjects', 'DSA', 'System Design', 'Aptitude'];

export default function CSFundamentals() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(categories[0]);

  // Filter topics by search and active tab
  const filteredTopics = csTopics.filter(topic =>
    topic.category === activeTab &&
    (
      topic.title.toLowerCase().includes(search.toLowerCase()) ||
      topic.summary.toLowerCase().includes(search.toLowerCase()) ||
      topic.videos.some(v => v.title.toLowerCase().includes(search.toLowerCase())) ||
      topic.resources.some(r => r.name.toLowerCase().includes(search.toLowerCase()))
    )
  );

  return (
    <div className='min-h-screen pt-24 pb-10 px-2 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-center mb-2 bg-gradient-to-r from-teal-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>CS Fundamentals</h1>
        <p className='text-center text-base text-gray-200 mb-6'>A curated collection of the best resources to master core computer science concepts. All videos and links are credited to their original creators.</p>
        {/* Tab Bar */}
        <div className='flex justify-center gap-2 mb-6'>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200 ${activeTab === category ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white border-teal-400 shadow' : 'bg-slate-800 text-teal-300 border-slate-600 hover:bg-slate-700'}`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Search Bar */}
        <div className='flex justify-center mb-8'>
          <input
            type='text'
            placeholder={`Search in ${activeTab}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className='w-full max-w-md px-4 py-2 rounded-lg border border-teal-400 bg-slate-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
          />
        </div>
        {/* Cards */}
        <div className='grid gap-3 md:grid-cols-2 lg:grid-cols-3'>
          {filteredTopics.length === 0 && (
            <div className='col-span-full text-center text-gray-400'>No topics found.</div>
          )}
          {filteredTopics.map(topic => (
            <div key={topic.title} className='bg-white/10 dark:bg-slate-900/60 rounded-lg shadow p-3 flex flex-col gap-1 border border-teal-400/20 min-h-[220px]'>
              <h3 className='text-base font-bold text-teal-200 mb-0.5'>{topic.title}</h3>
              <p className='text-gray-200 text-xs mb-1'>{topic.summary}</p>
              {/* Videos Section */}
              <div>
                <h4 className='font-semibold text-gray-100 text-xs mb-1'>Video Playlists:</h4>
                {topic.videos.map((video, idx) => (
                  <div key={video.url} className='mb-1'>
                    <div className='aspect-[16/7] rounded overflow-hidden border border-gray-700 mb-1'>
                      <iframe
                        src={video.url}
                        title={video.title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='w-full h-full min-h-[90px] max-h-[120px]'
                      ></iframe>
                    </div>
                    <div className='text-xs text-gray-400'>
                      <span className='font-semibold'>{video.title}</span> <br />
                      by <a href={video.creatorUrl} target='_blank' rel='noopener noreferrer' className='underline hover:text-teal-300'>{video.creator}</a>
                    </div>
                  </div>
                ))}
              </div>
              {/* Resources Section */}
              <div>
                <h4 className='font-semibold text-gray-100 text-xs mb-1 mt-1'>Top Resources:</h4>
                <ul className='list-disc list-inside space-y-0.5'>
                  {topic.resources.map(res => (
                    <li key={res.url}>
                      <a href={res.url} target='_blank' rel='noopener noreferrer' className='text-teal-300 underline hover:text-pink-400 text-xs'>{res.name}</a>
                      <span className='text-xs text-gray-400 ml-1'>(by {res.credit})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 