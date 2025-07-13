import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">TfL Journey Checker</h1>
      <p className="text-lg text-gray-600 mb-8">
        Check London Underground line statuses and disruptions
      </p>
      <Link 
        href="/travel"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
      >
        Check Tube Status
      </Link>
    </div>
  );
}