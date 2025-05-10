import StudentRegistration from '@/components/StudentRegistration';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link'
import React from "react";

const RegisterPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">
            Join Our Savings Group
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Start your savings journey with Web3Bridge
          </p>
        </div>

        <StudentRegistration />
      </div>
    </main>
  );
};

export default RegisterPage;
