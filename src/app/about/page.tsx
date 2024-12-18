'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button' // Ensure this is correctly imported
import Image from 'next/image'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold leading-tight mb-4">Welcome to Shri Vishwakarma Middle School Tukoganj, Dewas (M.P.)</h1>
          <p className="text-lg md:text-xl mb-8">
            Excellence in education, empowering the leaders of tomorrow.
          </p>

          {/* Apply Now Button */}
          <Link href="/admissions">
            {/* Use Tailwind CSS for debugging the button */}
            <button className="px-8 py-4 bg-white text-lg font-semibold text-blue-600 rounded-md shadow-md hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/school-hero-image.jpg")' }}></div>
      </section>

      {/* Mission and Vision Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-12">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg">
              Our mission is to provide a well-rounded education that nurtures curiosity, creativity, and critical thinking. We believe in fostering an environment where students can explore their passions and excel academically.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg">
              Our vision is to cultivate an environment where each student reaches their full potential—academically, socially, and emotionally. We aim to be a community of lifelong learners dedicated to positive change.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-800 mb-12">Meet Our Board Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Example Faculty Member */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Rukmani Verma</h3>
                <p className="text-gray-600">Senior Director(founder)</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Kalpana Nag</h3>
                <p className="text-gray-600">Pricipal</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Atula Kanwar</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Amrita</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/apoorva.png" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Apoorva Nag Rane</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Amrita</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Priyesh Vishwakarma</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Image src="/Atula.gif" alt="Faculty Member" width={400} height={400} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Achint Rane</h3>
                <p className="text-gray-600">Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Join Our School?</h2>
          <p className="text-lg mb-8">
            Take the first step towards a bright future. Apply today and become part of our thriving community!
          </p>
          <Link href="/admissions">
            <button className="px-8 py-4 bg-white text-lg font-semibold text-gray-800 rounded-md shadow-md hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default AboutPage
