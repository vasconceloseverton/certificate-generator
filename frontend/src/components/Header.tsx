export default function Header() {
    return (
        <header className="w-full py-6 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        CertGen
                    </h1>
                </div>
                <nav>
                    <ul className="flex space-x-6 text-gray-600 font-medium">
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Home</li>
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">Templates</li>
                        <li className="hover:text-blue-600 cursor-pointer transition-colors">About</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
