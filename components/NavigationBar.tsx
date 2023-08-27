import ProfileConnect from '@/components/ProfileConnect';

export default function NavigationBar() {
  return (
    <>
      <div className="bg-gray-800">
        <nav className="p-4 rounded shadow-lg w-full md:w-auto">
          <div className="container mx-auto flex items-center justify-between">
            <a className="text-white text-2xl font-bold" href="#">
              Credit Source
            </a>
            <ProfileConnect />
          </div>
        </nav>
      </div>
    </>
  );
}
