export default function Navbar() {
  const navItems = [
    { title: '일반주소', url: '#', active: false },
    { title: '군부대/훈련소', url: '#', active: false },
    { title: '소년원/소년교도소', url: '#', active: false },
    { title: '구치소/교도소', url: '#', active: true },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-11 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center">
            <img
              src="https://github.com/heung-D/to-orange/blob/main/LOGO.png?raw=true"
              alt="To-orange"
              className="h-6"
            />
          </a>
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className={`font-medium py-4 ${
                  item.active
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                {item.title}
              </a>
            ))}
          </div>
          <div className="flex items-center">
            <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              로그인
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
