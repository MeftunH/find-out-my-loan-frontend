import React from "react";

class Menu extends React.Component {
    render() {
        return (
          <div>
            <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
  <a href="/home" class="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="FOML Logo" />
      <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Find Out My Loan</span>
  </a>
  <div class="flex md:order-2">
  
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <a href="/apply-loan" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700
         md:p-0 dark:text-white" aria-current="page">Apply Loan</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent
         md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700
          dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Find My Loans</a>
      </li>
      <li>
        <a href="#" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent
         md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700
          dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My Account</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
          </div>
        );
    }
}
export default Menu;