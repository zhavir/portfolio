'use client';
import React from 'react';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="lg:py-16" id="hero">
      <div className="grid grid-cols-1 sm:grid-cols-12 w-full">
        <div className="col-span-8 place-self-center text-center sm:text-left justify-self-start">
          <h1 className="text-primaryText mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold ">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-400 ">
              {`Hello I'm`}{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                'Andrea',
                1000,
                'Softwere Engineer',
                1000,
                'DevOps Engineer',
                1000,
                'Backend Developer',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-secondaryText text-base sm:text-lg mb-6 lg:text-xl mr-10">
            {`I'm a Softwere engineer with 10 years of experience`}
          </p>
          <div>
            <Link
              href="#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-600 to-secondary-400 hover:from-primary-600 hover:to-secondary-200 text-primaryText"
            >
              Contact Me
            </Link>
            <button className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-600 to-secondary-400 hover:bg-slate-800 text-primaryText mt-3">
              <span className="block bg-secondaryBackgroud hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </button>
          </div>
        </div>
        <div className="col-span-4 place-self-center mt-4 lg:mt-0">
          <div className="rounded-full w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/hero-image.jpeg"
              alt="hero image"
              className="absolute rounded-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
              priority={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
