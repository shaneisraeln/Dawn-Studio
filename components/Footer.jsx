export default function Footer() {
  return (
    <footer className="bg-black py-8 text-center">
      <p className="font-lato text-sm tracking-wider text-gray-400 mb-2">
        &copy; 2025 Dawn HD Studio. All rights reserved.
      </p>
      <p className="font-lato text-xs text-gray-500 mb-3">
        Made with ❤️ by{' '}
        <a 
          href="https://porygonsol.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gold hover:text-gold-dark transition-colors duration-300 underline"
        >
          Porygon
        </a>
      </p>
      <p className="font-lato text-xs text-gray-500 italic">
        "Commit to the Lord whatever you do, and he will establish your plans." - Proverbs 16:3
      </p>
    </footer>
  )
}
