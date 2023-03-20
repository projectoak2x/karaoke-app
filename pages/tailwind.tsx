import Image from "next/image";
import { useState } from "react";

function Tailwind() {
  const [menuClass, setMenuClass] = useState(false)

  const ToggleMenu = () => {
    setMenuClass(!menuClass)
    console.log(menuClass)
  }

  return (
    <>
      {/* NavBar */}
      <nav className="container relative mx-auto p-6">
        {/* Flex Container */}
        <div className="items-center flex justify-between">
          {/* Logo */}
          <div className="pt-2">
            <Image src={`img/logo.svg`} width={146} height={24} alt="logo" />
          </div>
          {/* Menu Items */}
          <div className="hidden space-x-6 md:flex">
            <a href="#" className="hover:text-darkGrayishBlue">
              Create a Lobby
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Sign In
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              About
            </a>
            <a href="#" className="hover:text-darkGrayishBlue">
              Contact
            </a>
          </div>
          {/* button */}
          <a
            href="#"
            className="hidden rounded-full bg-brightRed p-3 px-6 pt-2 text-white md:block"
          >
            Get Started
          </a>

          <button id="menu-btn" onClick={()=>ToggleMenu()} className={`block hamburger md:hidden focus:outline-none ${menuClass ? 'open':''}`}>
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
        <div className="md:hidden">
          <div id="menu" className={`absolute flex-col flex items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:self-center left-6 right-6 drop-shadow-md ${menuClass ? 'flex':'hidden'}`}>
            <a href="">Pricing</a>
            <a href="">Product</a>
            <a href="">Pricing</a>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="hero">
        {/* Flex Container */}
        <div className="item-center container mx-auto mt-10 flex flex-col-reverse space-y-0 px-6 md:flex-row md:space-y-0">
          {/* Left Item */}
          <div className="mb-32 flex flex-col space-y-12 md:w-1/2">
            <h1 className="max-w-md text-center text-4xl font-bold md:text-left md:text-5xl">
              Bring Everyone to sing better
            </h1>
            <p className="max-w-md text-center text-darkGrayishBlue md:max-w-sm md:text-left">
{`              Sing your heart out with our karaoke app featuring a vast library
              of songs from different genres, a recording option, and an
              enjoyable and entertaining experience for all.`}
            </p>
            <div className="flex justify-center md:justify-start">
              <a
                href="#"
                className="rounded-full bg-brightRed p-3 px-6 pt-2 text-white"
              >
                Get Started
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="md:w-1/2">
            <Image
              src={`img/illustration-intro.svg`}
              width={580}
              height={525}
              alt="hero"
            ></Image>
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <section>
        {/* Flex Container */}
        <div className="container mx-auto mt-10 flex flex-col space-y-12 px-4 md:flex-row md:space-y-0">
          {/* What's Different */}
          <div className="flex flex-col space-y-12 md:w-1/2">
            <h2 className="max-w-md text-center text-4xl font-bold md:text-left">
              {`What's Different about karaoke`}
            </h2>
            <p className="max-w-md text-center text-darkGrayishBlue md:text-left">
{`              Our karaoke app sets itself apart with its vast library of songs
              from different genres, recording option, and an enjoyable
              experience for all.`}
            </p>
          </div>

          {/* Numbered List */}
          <div className="flex flex-col space-y-8 md:w-1/2">
            {/* List 1 */}
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-brightRed px-4 py-2 text-white md:py-1">
                    01
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
{`                    Track company-wide progress`}
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="mb-4 hidden text-lg font-bold md:block">
{`                  Track company-wide progress`}
                </h3>
                <p className="text-darkGrayishBlue">
{`                  See how your day-to-day tasks fit into the wider vision. Go
                  from tracking progress at the milestone level all the way down
                  to the smallest of details. Never lose sight of the bigger
                  picture again.`}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-brightRed px-4 py-2 text-white md:py-1">
                    02
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Track company-wide progress
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="mb-4 hidden text-lg font-bold md:block">
                  Track company-wide progress
                </h3>
                <p className="text-darkGrayishBlue">
{`                  See how your day-to-day tasks fit into the wider vision. Go
                  from tracking progress at the milestone level all the way down
                  to the smallest of details. Never lose sight of the bigger
                  picture again.`}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-6">
              <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full bg-brightRed px-4 py-2 text-white md:py-1">
                    03
                  </div>
                  <h3 className="text-base font-bold md:mb-4 md:hidden">
                    Track company-wide progress
                  </h3>
                </div>
              </div>

              <div>
                <h3 className="mb-4 hidden text-lg font-bold md:block">
                  Track company-wide progress
                </h3>
                <p className="text-darkGrayishBlue">
{`                  See how your day-to-day tasks fit into the wider vision. Go
                  from tracking progress at the milestone level all the way down
                  to the smallest of details. Never lose sight of the bigger
                  picture again.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="testimonials">
        <div className="mx-auto mt-32 max-w-6xl px-5 text-center">
          <h2 className="text-center text-4xl font-bold">
{`            What's different with karaoke`}
          </h2>
          <div className="mt-24 flex flex-col gap-y-12 md:flex-row md:gap-y-0 md:space-x-6">
            <div className="flex flex-col items-center space-y-6 rounded-lg bg-veryLightGray p-6 md:w-1/3">
              <img
                src="img/avatar-anisha.png"
                alt="Anisha"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Anisha Li</h5>
              <p className="text-sm text-darkGrayishBlue">
{`                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated."`}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6 rounded-lg bg-veryLightGray p-6 md:w-1/3">
              <img
                src="img/avatar-anisha.png"
                alt="Anisha"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Anisha Li</h5>
              <p className="text-sm text-darkGrayishBlue">
{`                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated."`}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-6 rounded-lg bg-veryLightGray p-6 md:w-1/3">
              <img
                src="img/avatar-anisha.png"
                alt="Anisha"
                className="-mt-14 w-16"
              />
              <h5 className="text-lg font-bold">Anisha Li</h5>
              <p className="text-sm text-darkGrayishBlue">
{`                “Manage has supercharged our team’s workflow. The ability to
                maintain visibility on larger milestones at all times keeps
                everyone motivated."`}
              </p>
            </div>
          </div>
          <div className="my-16">
            <a
              href="#"
              className="rounded-full bg-brightRed p-3 px-6 pt-2 text-white shadow-2xl hover:bg-brightRedLight"
            >Get Started</a>
          </div>
        </div>
      </section>

      <section id="cta" className="bg-brightRed">
        <div className="container mx-auto flex flex-col items-center justify-between space-y-12 px-6 py-24 md:flex-row md:space-y-0 md:py-12">
          <h2 className="text-center text-5xl font-bold leading-tight text-white md:max-w-xl md:text-left md:text-4xl">
            Simplify how your team works today
          </h2>
          <div>
            <a
              href="#"
              className="rounded-full bg-white p-3 px-6 pt-2 text-brightRed shadow-2xl hover:bg-gray-900"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
      <footer className="bg-veryDarkBlue">
        <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start">
            <div className="mx-auto my-6 text-center text-white md:hidden">
              Copyright &copy; 2022, All Rights Reserved
            </div>
            <div>
              <img src="img/logo-white.svg" className="h-8" alt="" />
            </div>
            <div className="flex justify-center space-x-4">
              <a href="#">
                <img src="img/icon-facebook.svg" alt="" className="h-8"/>
              </a>
              <a href="#">
                <img src="img/icon-facebook.svg" alt="" className="h-8"/>
              </a>
              <a href="#">
                <img src="img/icon-facebook.svg" alt="" className="h-8"/>
              </a>
              <a href="#">
                <img src="img/icon-facebook.svg" alt="" className="h-8"/>
              </a>
              <a href="#">
                <img src="img/icon-facebook.svg" alt="" className="h-8"/>
              </a>
            </div>
          </div>
          <div className="flex justify-around space-x-32">
            <div className="flex flex-col space-y-3 text-white">
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
            </div>
            <div className="flex flex-col space-y-3 text-white">
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
              <a href="#" className="hover:text-brightRed">Carrers</a>
            </div>
          </div>
          <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <input type="text" placeholder="updates in your inbox" className="flex-1 px-4 rounded-full focus:outline-none" />
              <button className="px-6 py-2 text-white rounded-full bg-brightRed hover:bg-brightRedLight focus:outline-none">Go</button>
            </div>
          </form>
          <div className="hidden text-white md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
        </div>
      </footer>
    </>
  );
}

export default Tailwind;
