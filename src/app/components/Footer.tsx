export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* ✅ Left */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Future Stock. All rights reserved.</p>

        {/* ✅ Right */}
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/" target="_blank" className="hover:text-white">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" className="hover:text-white">LinkedIn</a>
          <a href="mailto:yourmail@example.com" className="hover:text-white">Email</a>
        </div>
      </div>
    </footer>
  );
}
