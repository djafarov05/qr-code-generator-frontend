import { Link } from 'react-router-dom';
import { Zap, Shield, Users } from 'lucide-react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - QR Generator</title>
        <meta name="description" content="Create and manage your QR codes quickly and securely." />
      </Helmet>

      <div className="space-y-16">
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Professional QR Codes <span className="text-indigo-600">Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Generate customizable QR codes for your business or personal use. Easy to create, easy to share.
          </p>
          <Link
            to="/generator"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start Generating
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Fast Generation</h2>
            <p className="text-gray-600">Create QR codes in seconds with our intuitive interface.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Secure Storage</h2>
            <p className="text-gray-600">Your QR codes are safely stored and easily accessible.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="inline-block p-3 bg-indigo-100 rounded-full mb-4">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Team Friendly</h2>
            <p className="text-gray-600">Perfect for teams and businesses of all sizes.</p>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Content</h3>
              <p className="text-gray-600">Input your URL, text, or contact information.</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Customize Design</h3>
              <p className="text-gray-600">Choose colors, add a logo, and style your QR code.</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Download & Share</h3>
              <p className="text-gray-600">Get your QR code in multiple formats and share instantly.</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center space-y-6">
            <img
              src="/logo.png"
              alt="My brand logo"
              className="w-48 h-auto"
            />
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/kzp0o5rwS_o?autoplay=1&mute=1"
              title="QR code scanning video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
            <p className="text-xl font-semibold">Make your life easier using our advanced web-application</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
