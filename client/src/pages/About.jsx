export default function About() {
  return (
    <div className='pt-20 pb-8 min-h-screen'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Learning Loop
          </h1>
          <h2 className='text-xl font-medium text-teal-500 mb-4'>Where Curiosity Never Ends</h2>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              <b>Learning Loop</b> is your go-to platform for continuous learning, skill-building, and professional growth. Our mission is to empower curious minds with insightful articles, hands-on tutorials, and the latest trends in web development, software engineering, and technology.
            </p>
            <p>
              Whether you're a beginner or a seasoned developer, you'll find valuable resources, practical guides, and a supportive community to help you stay inspired and push your skills beyond the 9 to 5.
            </p>
            <p>
              We encourage you to engage with our content, leave comments, and connect with fellow learners. At Learning Loop, we believe that sharing knowledge and experiences helps everyone grow.
            </p>
            <hr className='my-4' />
            <div className='text-left'>
              <h3 className='text-lg font-semibold mb-2'>About the Creator</h3>
              <p>
                Hi! I'm Anil Rathod, the creator of Learning Loop. I'm passionate about technology, coding, and lifelong learning. I built this platform to share my journey, help others grow, and foster a vibrant learning community. Thank you for being part of the loop!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
