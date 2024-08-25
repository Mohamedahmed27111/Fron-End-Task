<template>
  <!-- Modal Background -->
  <div v-if="isOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4 md:p-0">
    <!-- Modal Container -->
    <div class="rounded-lg shadow-lg w-full max-w-xl bg-white">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4 border-b-2 bg-sec-1 p-6 rounded-t-lg">
        <h2 class="text-xl text-black mb-2 font-bold">{{ title }}</h2>
        <button class="text-gray-600 hover:text-gray-900" @click="handleClose">
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

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';
import axios from 'axios';
import { useMarkups } from '~/stores/markups';

// Initialize the markups store
const markupStore = useMarkups();
const inputMArkup = ref(markupStore.addMarkup);



// Define the expected props for this component
interface Props {
  isOpen: boolean;
  title: string;
}

const props = defineProps<Props>();

// Define the event emission for updating the modal state
const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void;
}>();

// Reactive reference to control modal visibility
const isOpen = ref(props.isOpen);

// Function to close the modal and reset the active step
const closeModal = () => {
  emit('update:isOpen', false);
};


const handleClose = () => {
  closeModal();
  isActive.value = 1; // Reset active step when closing
  markupStore.clearvalues()
};

// Watch for changes in the `isOpen` prop to synchronize modal visibility
watch(() => props.isOpen, (newVal) => {
  isOpen.value = newVal;
  if (!newVal) {
    isActive.value = 1; // Reset active step when modal is closed
  }
});



// Handle form submission
const submitForm = async () => {
  try {
    // Send a POST request with markup and selected corporates
    const response = await axios.post('https://example.com/api/markups', {
      markup: inputMArkup.value,
      corporates: selectedCorporates.value
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};











// Track the active tab or step
const isActive = ref(1);


// Handle the "Next" button click
const handleNext = () => {
  isActive.value = 2; // Move to the next step
};

// Handle the "Back" button click
const handleBack = () => {
  isActive.value = 1; // Go back to the previous step
};

</script>













<style scoped>
</style>
