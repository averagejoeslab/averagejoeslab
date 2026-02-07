import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Org Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/images/ajlabs-logo-dark.png"
                alt="Average Joes Lab Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">
                Average Joes Lab
              </span>
            </Link>
            <p className="text-slate-300 mb-6 text-sm">
              Democratizing research for citizen scientists worldwide. Open science by ordinary people.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://discord.gg/7gzZMAPuGr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                Discord
              </a>
              <a
                href="https://github.com/averagejoeslab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Research */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Research</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="text-slate-300 hover:text-white transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <Link href="/internal-papers" className="text-slate-300 hover:text-white transition-colors">
                  Internal Papers
                </Link>
              </li>
              <li>
                <Link href="/external-papers" className="text-slate-300 hover:text-white transition-colors">
                  External Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/7gzZMAPuGr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/averagejoeslab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Content</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Average Joes Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
