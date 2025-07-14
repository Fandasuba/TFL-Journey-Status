import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="page-layout">
      <Header />

      <main className="main-content">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-6">
              Corporate Transport Dashboard
            </h2>
            <p className="text-xl text-gray mb-8" style={{maxWidth: '672px', margin: '0 auto 32px'}}>
              Enterprise-grade London Underground monitoring system for operational efficiency 
              and workforce mobility management.
            </p>
            <Link href="/travel" className="btn-primary">
              Access Status Dashboard
            </Link>
          </div>

          <div className="corp-section">
            <h3 className="corp-title">Executive Summary</h3>
            <p className="corp-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="corp-text">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
              voluptatem accusantium doloremque laudantium.
            </p>
          </div>

          <div className="grid grid-cols-2 mb-16">
            <div className="corp-section">
              <h3 className="corp-title">Operational Metrics</h3>
              <p className="corp-text">
                Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem 
                quia voluptas sit aspernatur aut odit aut fugit.
              </p>
              <p className="corp-text">
                Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi 
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
            </div>

            <div className="corp-section">
              <h3 className="corp-title">System Integration</h3>
              <p className="corp-text">
                Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
                ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam.
              </p>
              <p className="corp-text">
                Quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut 
                aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit.
              </p>
            </div>
          </div>

          <div className="corp-section">
            <h3 className="corp-title">Enterprise Features</h3>
            <p className="corp-text">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium 
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint 
              occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt 
              mollitia animi, id est laborum et dolorum fuga.
            </p>
            <p className="corp-text">
              Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, 
              cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime 
              placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
            </p>
            <div className="text-center" style={{marginTop: '24px'}}>
              <Link href="/travel" className="btn-primary">
                Launch Monitoring Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}