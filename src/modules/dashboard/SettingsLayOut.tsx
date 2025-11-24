import React from "react";

// SettingsPage.jsx
// Single-file React component using Tailwind CSS (assumes Tailwind is available in the project)

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Sidebar */}
      

      {/* Main content */}
      <main className="flex-1 p-12">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Hubungkan Akun Meta Anda</h2>

          <section className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">META API KEY</h3>
            <p className="text-sm text-gray-500 mb-5">
              Buatlah akun Meta Ads dengan langkah-langkah yang tertera untuk mendapatkan API KEY milik anda, agar terhubung dengan akun Anda. Berikut link-nya: <a href="#" className="text-blue-600 underline">https://developers.facebook.com/docs/marketing-api/get-started</a>
            </p>

            <div className="mt-4">
              <label className="block text-xs text-gray-500 mb-2">API Key</label>
              <div className="flex gap-3 items-center">
                <input type="password" className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 placeholder-gray-400" placeholder="••••••••••••••••" />
                <button className="bg-blue-600 text-white px-5 py-3 rounded-lg">Hubungkan</button>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Decorative blurred corners (absolute positioned) */}
      <div className="pointer-events-none fixed left-8 bottom-10 w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-200 rounded-2xl opacity-40 blur-3xl"></div>
      <div className="pointer-events-none fixed right-8 top-8 w-56 h-56 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl opacity-40 blur-3xl"></div>
    </div>
  );
}
