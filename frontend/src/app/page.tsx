import CertificateForm from '@/components/CertificateForm';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-purple-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-40 left-20 w-96 h-96 rounded-full bg-pink-200 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="z-10 w-full max-w-4xl flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Create Professional <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Certificates Instantly
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Generate high-quality PDF certificates for your students, employees, or event participants in seconds.
            </p>
          </div>

          <CertificateForm />
        </div>
      </div>

      <footer className="bg-white py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CertGen. All rights reserved.
      </footer>
    </main>
  );
}
