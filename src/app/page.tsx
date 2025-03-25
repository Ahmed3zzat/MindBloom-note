import Link from "next/link"; // Import Link from next/link

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[url('@/assets/images/start.jpg')] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Welcome Message */}
      <div className="relative text-center p-4 rounded-lg">
        <h2 className="text-white text-3xl font-bold">
          Hey, Welcome to MindBloom Notes!
        </h2>
        <p className="text-white text-lg">
          Organize your thoughts, grow your ideas, and share your knowledge.
        </p>
      </div>

      {/* Get Started Button */}
      <Link href="/notes">
        <button className="relative cursor-pointer z-10 bg-[#69995D] hover:bg-[#394648] text-white font-bold px-8 py-3 mt-6 rounded-full shadow-lg transition duration-300">
          Get Started →
        </button>
      </Link>

      {/* About Section */}
      <div className="relative z-10 mt-auto mb-4 w-[90%] max-w-3xl rounded-2xl p-6 mx-3 backdrop-blur-md bg-white/40 text-center shadow-lg">
        <p className="text-3xl font-bold text-[#69995D]">MindBloom Notes</p>

        <p className="mt-4 text-gray-800 text-sm leading-relaxed">
          MindBloom Notes is your ultimate digital solution for organizing,
          sharing, and growing your knowledge. Whether you`re a student,
          professional, or creative thinker, our platform empowers you to
          capture ideas, create structured notes, and collaborate seamlessly.
          With features like real-time syncing, customizable templates, and
          AI-powered insights, MindBloom Notes ensures that your ideas blossom
          into actionable results. From personal journals to team projects, we
          provide the tools to cultivate your thoughts and transform them into
          meaningful outcomes.
        </p>
      </div>
    </div>
  );
}
