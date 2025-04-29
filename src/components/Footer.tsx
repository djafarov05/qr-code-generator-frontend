// import React from 'react';
import { Github, Instagram } from "lucide-react";
import { useUserStore } from "../store/userStore";

const Footer = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-600">
              Create beautiful and functional QR codes for your business or
              personal use.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/generator"
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Generate QR Code
                </a>
              </li>

              {isLoggedIn && (
                <>
                  <li>
                    <a
                      href="/my-codes"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      My QR Codes
                    </a>
                  </li>
                  <li>
                    <a
                      href="/settings"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      Settings
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/djafarov05"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/jamal_royale23/"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} QR Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
