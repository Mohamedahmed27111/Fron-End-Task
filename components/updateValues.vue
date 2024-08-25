<template>
    <!-- Modal backdrop -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <!-- Modal container -->
      <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <!-- Modal header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-semibold">
            {{ title }}
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4">
          <slot></slot>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-end p-4 border-t">
          <button @click="closeModal" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Close
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      title: {
        type: String,
        default: 'Modal Title',
      },
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles for custom modal component */
  </style>
  