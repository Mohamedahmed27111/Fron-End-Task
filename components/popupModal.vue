<template>
  <!-- Modal Background -->
  <div v-if="AddVisible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 md:p-0">
    <!-- Modal Container -->
    <div class="rounded-lg shadow-lg w-full max-w-xl bg-white">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4 border-b-2 bg-sec-1 p-6 rounded-t-lg">
        <h2 class="text-xl text-black mb-2 font-bold">Create Markup Group</h2>
        <button class="text-gray-600 hover:text-gray-900" @click="closeModal">
          <Icon size="25" name="ic:sharp-close" />
        </button>
      </div>
      <!-- Modal Body -->
      <form @submit.prevent="submitForm">
        <!-- Markup Section -->
        <div class="mb-6 p-6" v-if="isActive === 1">
          <addMarkup />
        </div>

        <!-- Corporates Section -->
        <div class="mb-6" v-if="isActive === 2">
          <addCorporates />
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end p-6">
          <button
            @click="handleNext"
            v-if="isActive === 1"
            class="bg-prim text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Next
          </button>
          <button
            @click="handleBack"
            v-if="isActive === 2"
            class="bg-sec-2 text-white px-4 py-2 rounded hover:bg-sec-3 mx-3"
          >
            Back
          </button>
          <button
            v-if="isActive === 2"
            type="submit"
            class="bg-prim text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useMarkups } from '~/stores/markups';
import axios from 'axios';

// Initialize markups store
const markupStore = useMarkups();
const inputMarkup = ref(markupStore.addMarkup);

// Define props and emits
const props = defineProps({
  AddVisible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'submitted']);

// Watch prop changes and reset modal state accordingly
watch(() => props.AddVisible, (newVal) => {
  if (!newVal) {
    resetForm();
  }
});

// Function to close the modal
const closeModal = () => {
  emit('close');
  resetForm();
};

// Reset the form state
const resetForm = () => {
  isActive.value = 1; // Reset active step
  markupStore.clearvalues(); // Clear store values
};

// Form submission logic
const submitForm = async () => {
  try {
    // Submit the form via API call
    const response = await axios.post('https://example.com/api/markups', {
      markup: inputMarkup.value,
    });
    console.log('Response:', response.data);
    emit('submitted'); // Emit submission success event
    closeModal(); // Close modal after submission
  } catch (error) {
    console.error('Error submitting form:', error);
    // Handle error (e.g., show user feedback)
  }
};

// Track the active tab or step
const isActive = ref(1);

// Handle navigation between steps
const handleNext = () => {
  isActive.value = 2;
};

const handleBack = () => {
  isActive.value = 1;
};
</script>
