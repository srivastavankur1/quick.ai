import {
    FileText,
    House,
    Scissors,
    SquarePen,
    Hash,
    Image,
    Eraser,
    Users,
    LogOut
  } from 'lucide-react';
  import { Protect, useClerk, useUser } from '@clerk/clerk-react';
  import React from 'react';
  import { NavLink } from 'react-router-dom';
  
  const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
  ];
  
  const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();
  
    return (
      <div
        className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between max-sm:absolute top-0 bottom-0 z-50 transition-all duration-300 ease-in-out ${
          sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
        }`}
      >  
        <div className="flex-1 overflow-y-auto">
          {/* User Info */}
          <div className="py-6 text-center">
            <img
              src={user.imageUrl}
              alt="user"
              className="w-14 h-14 rounded-full mx-auto mb-2"
            />
            <p className="text-sm font-medium text-gray-700">{user.fullName}</p>
          </div>
  
          {/* Nav Items */}
          <nav className="px-6 mt-5  text-sm text-gray-600 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition-all text-sm font-medium ${
                    isActive
                      ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
            <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
                <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
                <div>
                    <h1 className='text-sm font-medium'>{user.fullName}</h1>
                    <p className='text-xs text-gray-500'>
                        <Protect plan='premium' fallback="Free" >Premium</Protect> 
                        Plan
                    </p>
                </div>
            </div>
            <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />
            
        </div>

      </div>
    );
  };
  
  export default Sidebar;
  