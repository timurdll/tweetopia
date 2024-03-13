import Navbar from "@components/Navbar";
import "@styles/globals.css";
import AuthProvider from "@components/AuthProvider";
import { Provider as ReduxProvider } from "react-redux";
import store from "@redux/store";
import StoreProvider from "./storeProvider";

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
