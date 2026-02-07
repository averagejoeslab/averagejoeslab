'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Github } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isResearchOpen, setIsResearchOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <nav className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/ajlabs-logo-light.png"
              alt="Average Joes Lab Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-slate-800">
              Average Joes Lab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/learn/"
              className="text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
            >
              Learn
            </Link>

            {/* Research Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsResearchOpen(!isResearchOpen)}
                onBlur={() => setTimeout(() => setIsResearchOpen(false), 150)}
                className="flex items-center text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
              >
                Research
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isResearchOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <Link
                    href="/internal-papers/"
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-accent-500 transition-colors"
                    onClick={() => setIsResearchOpen(false)}
                  >
                    Internal Papers
                  </Link>
                  <Link
                    href="/external-papers/"
                    className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-accent-500 transition-colors"
                    onClick={() => setIsResearchOpen(false)}
                  >
                    External Papers
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog/"
              className="text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
            >
              Blog
            </Link>

            {/* External Links */}
            <a
              href="https://discord.gg/7gzZMAPuGr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
              aria-label="Discord"
            >
              Discord
            </a>
            <a
              href="https://github.com/averagejoeslab"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-700 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-accent-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200">
              <Link
                href="/"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/learn/"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn
              </Link>
              <Link
                href="/internal-papers/"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Internal Papers
              </Link>
              <Link
                href="/external-papers/"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                External Papers
              </Link>
              <Link
                href="/blog/"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://discord.gg/7gzZMAPuGr"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Discord
              </a>
              <a
                href="https://github.com/averagejoeslab"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-slate-700 hover:text-accent-500 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
