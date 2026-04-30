import MainLayout from "./app/layouts/MainLayout";
import AuthPage from "./app/pages/AuthPage";
import ChatPage from "./app/pages/ChatPage";
import JournalPage from "./app/pages/JournalPage";
import ProfilePage from "./app/pages/ProfilePage";
import HomePage from "./app/pages/HomePage";
import { useState } from "react";


function App() {

  const [page,setPage] = useState(0);
  return (
    <div>
      {/* <MainLayout> */}
        <div className="flex justify-center gap-10 bg-white/70 backdrop-blur-md p-2 rounded-2xl ">
          {[
            { name: "Auth", id: 0 },
            { name: "Journal", id: 1 },
            { name: "Chat", id: 2 },
            { name: "Profile", id: 3 },
            { name: "Home", id: 4 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  page === item.id
                    ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md"
                    : "text-blue-600 hover:bg-blue-100/60 hover:text-blue-700"
                }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        {page === 0 && <AuthPage />}
        {page === 1 && <JournalPage />}
        {page === 2 && <ChatPage />}
        {page === 3 && <ProfilePage />}
        {page === 4 && <HomePage />}

      {/* </MainLayout> */}
    </div>
  )
}

export default App;
