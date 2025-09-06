
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { UserIcon } from '../components/Icons';

const DashboardPage: React.FC = () => {
  const { currentUser, updateUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if(currentUser) {
        updateUser({ ...currentUser, username });
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
       <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center mb-8">
            <UserIcon className="h-24 w-24 text-gray-400 bg-gray-200 rounded-full p-4 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">{currentUser.username}</h1>
            <p className="text-gray-600">{currentUser.email}</p>
        </div>
        
        <form onSubmit={handleSave}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} disabled={!isEditing} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (cannot be changed)</label>
              <input type="email" id="email" value={email} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100" />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">Save Changes</button>
              </>
            ) : (
              <button type="button" onClick={() => setIsEditing(true)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700">Edit Profile</button>
            )}
          </div>
          {successMessage && <p className="text-gray-600 mt-4 text-center">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
