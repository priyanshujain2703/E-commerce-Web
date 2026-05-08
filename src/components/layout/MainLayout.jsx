import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <Navbar />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
