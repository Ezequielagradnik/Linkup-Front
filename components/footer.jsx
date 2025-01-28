import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Imagen%20de%20WhatsApp%202025-01-26%20a%20las%2015.19.42_e01988de.jpg-cpajLuZWHffaR1AfdCOjwttm1CwJLm.jpeg"
                alt="LinkUp Logo"
                className="h-8 w-8 mr-2"
              />
              <span className="font-bold text-xl text-primary-900">LinkUp</span>
            </Link>
          </div>
          <nav className="w-full md:w-auto">
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
              <li>
                <Link href="/" className="text-gray-600 hover:text-secondary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-secondary-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog-podcast" className="text-gray-600 hover:text-secondary-600">
                  Blog & Podcast
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-secondary-600">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-secondary-600">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} LinkUp. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

