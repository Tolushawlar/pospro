
// Landing page component with Tailwind CSS
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-800">Cartmor</div>
            </div>
            {/* <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Shop</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Deals</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Discover Amazing</span>
                  <span className="block text-indigo-600">Products & Deals</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Shop thousands of quality products at unbeatable prices. Find everything you need with our easy-to-use online marketplace.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Shop Now
                    </a>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      View Deals
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Secure Shopping</h3>
              <p className="mt-2 text-gray-600">
                Shop with confidence using our secure system with multiple payment options.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Best Prices</h3>
              <p className="mt-2 text-gray-600">
                We guarantee the lowest prices and offer price matching on all products.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-gray-600">
                Our customer service team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-white">&copy; 2025 Cartmor. All rights reserved.</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
