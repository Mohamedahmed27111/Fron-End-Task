<template>
    <div v-if="visible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-xl font-bold">Edit Markup</h2>
          <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
            <Icon size="25" name="ic:sharp-close" />
          </button>
        </div>
        <!-- Modal Body -->
        <div class="p-4">
          <form @submit.prevent="updateMarkup">
            <div class="flex flex-col">
              <label for="R-MarkupName">Group name</label>
              <InputText id="R-MarkupName" v-model="returnedMarkeUp.name" class="inputText" />
            </div>
            <div class="flex justify-between my-3 gap-3">
              <div class="flex flex-col">
                <label for="R-Markup-in-Val">Incoming Value</label>
                <InputText id="R-Markup-in-Val" v-model="returnedMarkeUp.incoming_markup" class="inputText" />
              </div>
              <div class="flex flex-col">
                <label for="R-Markup-Out-Val">Outcoming Value</label>
                <InputText id="R-Markup-Out-Val" v-model="returnedMarkeUp.outgoing_markup" class="inputText" />
              </div>
            </div>
            <!-- Asset -->
            <div v-if="returnedMarkeUp.assets.length > 0" class="overflow-y-auto max-h-48">
              <div v-for="(asset, index) in returnedMarkeUp.assets" :key="index"
                   class="asset-container flex justify-between items-center gap-2 mt-5">
                <div>
                  <Dropdown v-model="asset.name" :options="getAssets" optionLabel="name"
                            placeholder="Select an Asset" class="custom-dropdown p-focus" />
                </div>
                <div>
                  <InputText v-model="asset.incomingValue" class="inputText" placeholder="Incoming Value"
                             :class="{ 'is-invalid': !isNumeric(asset.incomingValue) && asset.incomingValue !== '' }" />
                </div>
                <div>
                  <InputText v-model="asset.outcomingValue" class="inputText" placeholder="Outcoming Value"
                             :class="{ 'is-invalid': !isNumeric(asset.outcomingValue) && asset.outcomingValue !== '' }" />
                </div>
                <button type="button" @click="removeAsset(index)" class="text-sec-2 hover:text-sec-3">
                  <Icon size="25" name="ic:baseline-delete" />
                </button>
              </div>
            </div>
            <button type="submit" class="mt-4 px-4 py-2 bg-prim text-white rounded">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useMarkups } from '@/stores/markups';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
  });
  
  const emit = defineEmits(['close']);
  
  const markupsStore = useMarkups();
  const returnedMarkeUp = ref({ ...markupsStore.updateMarkup }); // Initialize with current updateMarkup data
  
  watch(() => markupsStore.updateMarkup, (newMarkup) => {
    returnedMarkeUp.value = { ...newMarkup }; // Update local state when store state changes
  });
  
  const closeModal = () => {
    emit('close');
  };
  
  // Function to update the markup
  const updateMarkup = async () => {
    try {
      await markupsStore.updateMarkup(); // Call updateMarkup method from store
      closeModal(); // Close the modal after updating
    } catch (error) {
      console.error('An error occurred while updating the markup:', error);
    }
  };
  
  // Utility functions
  const isNumeric = (value) => !isNaN(value) && isFinite(value);
  const removeAsset = (index) => {
    returnedMarkeUp.value.assets.splice(index, 1);
  };
  const getAssets = computed(() => markupsStore.showAsset); // Assuming this is the list of assets
  
  </script>
  
  <style scoped>
  /* Scoped styles for the modal component */
  </style>
  