import Link from 'next/link';

export default function Header({ showBackButton = false, backText = "Back to Home", backHref = "/" }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link href="/" className="logo-section">
            <div className="logo">
              <span>TfL</span>
            </div>
            <h1 className="logo-text">Journey Checker</h1>
          </Link>
          
          <nav>
            {showBackButton ? (
              <Link href={backHref} className="back-button">
                ← {backText}
              </Link>
            ) : (
              <Link href="/travel" className="nav-button">
                Check Tube Status
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}