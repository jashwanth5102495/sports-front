export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex flex-col items-center md:items-start">
          <a href="#home" className="flex items-center mb-4 group hover:opacity-90 transition-opacity">
            <span className="text-xl font-nav font-bold italic text-white uppercase leading-none tracking-tight">ERIN</span>
            <span className="text-xl font-nav font-bold italic text-accent uppercase leading-none tracking-tight ml-1.5">COYKENDALL</span>
          </a>
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">
            Official Portfolio &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#career" className="hover:text-white transition-colors">Career</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex gap-4">
          <a 
            href="https://www.instagram.com/erincoykendall/?hl=en" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-400 hover:text-white hover:border-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
