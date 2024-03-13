import Navbar from "@components/Navbar";
import "@styles/globals.css";
import AuthProvider from "@components/AuthProvider";
import StoreProvider from "@components/storeProvider";

export const metadata = {
  title: "Tweetopia",
  description: "Discover & Share Thoughts",
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <StoreProvider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Navbar />
              {children}
            </main>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
