<template>
  <section class="py-24 bg-gray-50">
    <div class="container mx-auto px-6 md:px-12 lg:px-20">
      <!-- Title -->
      <div class="text-center pb-20">
        <h2 class="text-4xl font-extrabold text-primary mb-4">Our Projects</h2>
        <p class="text-lg text-gray-600 max-w-3xl mb-20 mx-auto">
          Discover how we’ve helped businesses thrive through innovative and
          tailor-made digital solutions.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
        <!-- Project Card -->
        <div
        data-aos="zoom-in-up"
          class="relative bg-blue-50 rounded-2xlb mt-10 md:mt-0 shadow-lg pt-14 pb-6 px-6 text-center hover:shadow-2xl transition"
        >
          <!-- Image -->
          <div
        
            class="absolute w-[250px] -top-20 left-1/2 transform  -translate-x-1/2"
          >
            <img
              src="../assets/1task.png"
              alt="Project 1"
              class="w-full h-40 object-cover rounded-xl ring-4 ring-primary shadow-md"
            />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold mt-10">Task Manager</h3>
          <p class="text-gray-600 my-3">
            Manage Your Task Management Fast,Easy and Smart
          </p>
          <span class="text-sm text-blue-600 font-medium"></span>
          <div class="mt-4">
            <a
              href="#"
              class="text-sm text-white bg-primary hover:bg-blue-700 px-5 py-2 rounded-full transition"
            >
              View Details
            </a>
          </div>
        </div>

        <div
          data-aos="zoom-in-up"
          class="relative mt-20 md:mt-0 bg-blue-50 rounded-2xl shadow-lg pt-14 pb-6 px-6 text-center hover:shadow-2xl transition"
        >
          <!-- Image -->
          <div
       
            class="absolute w-[250px] -top-20 left-1/2 transform -translate-x-1/2"
          >
            <img
              src="../assets/logobr.png"
              alt="Project 1"
              class="w-full h-40 object-cover rounded-xl ring-4 ring-primary shadow-md"
            />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-gray-800 mt-10">Brooklyn System</h3>
          <p class="text-gray-600 my-3">
            Management system for business and management courses company
          </p>
          <span class="text-sm text-blue-600 font-medium"></span>
          <div class="mt-4">
            <a
              href="#"
              class="text-sm text-white bg-primary hover:bg-blue-700 px-5 py-2 rounded-full transition"
            >
              View Details
            </a>
          </div>
        </div>
        <div
           data-aos="zoom-in-up"
          class="relative bg-blue-50  mt-20 md:mt-0 rounded-2xl shadow-lg pt-14 pb-6 px-6 text-center hover:shadow-2xl transition"
        >
          <!-- Image -->
          <div
         
            class="absolute w-[250px] -top-20 left-1/2 transform -translate-x-1/2"
          >
            <img
              src="../assets/srm.png"
              alt="Project 1"
              class="w-full h-40 object-cover rounded-xl ring-4 ring-primary shadow-md"
            />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-gray-800 mt-10">SRM Student</h3>
          <p class="text-gray-600 my-3">
            A system for managing student status, payments, courses and
            lecturers
          </p>
          <span class="text-sm text-blue-600 font-medium"></span>
          <div class="mt-4">
            <a
              href="#"
              class="text-sm text-white bg-primary hover:bg-blue-700 px-5 py-2 rounded-full transition"
            >
              View Details
            </a>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="text-center mt-16">
        <a
          href="#"
          class="inline-block bg-gradient-to-r from-blue-600 to-primary text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition"
        >
          View All Projects
        </a>
      </div>
    </div>
  </section>
</template>
