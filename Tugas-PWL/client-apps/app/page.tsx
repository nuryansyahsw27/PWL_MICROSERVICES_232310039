import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header - Library Admin */}
          <div className="bg-indigo-600 px-6 py-10 text-center">
            <div className="mb-4">
              <svg 
                className="w-16 h-16 mx-auto text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-wide">
              Library Admin
            </h1>
            <p className="text-indigo-200 mt-2 text-sm">
              Sistem Manajemen Perpustakaan
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Selamat Datang
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Silakan pilih opsi di bawah ini
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link 
                href="/sign-in"
                className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-center"
              >
                <span className="flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Masuk
                </span>
              </Link>

              <Link 
                href="/register"
                className="block w-full bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 rounded-lg border-2 border-indigo-600 transition duration-200 text-center"
              >
                <span className="flex items-center justify-center">
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Daftar
                </span>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-indigo-600 font-bold text-lg">📚</div>
                  <p className="text-xs text-gray-500 mt-1">Kelola Buku</p>
                </div>
                <div>
                  <div className="text-indigo-600 font-bold text-lg">👤</div>
                  <p className="text-xs text-gray-500 mt-1">Manajemen User</p>
                </div>
                <div>
                  <div className="text-indigo-600 font-bold text-lg">📊</div>
                  <p className="text-xs text-gray-500 mt-1">Dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Library Admin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}