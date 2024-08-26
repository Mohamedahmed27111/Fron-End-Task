<template>
  <div v-if="UpdateVisible" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
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
          <div class="flex flex-col mb-4">
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
          <!-- Asset List -->
          <div v-if="returnedMarkeUp.assets.length > 0" class="overflow-y-auto max-h-48">
            <h1 class="text-black font-bold text-xl">Assets</h1>

            <div v-for="(asset, index) in returnedMarkeUp.assets" :key="index"
              class="flex justify-between items-center gap-3 mt-3">
              <div class="flex flex-col w-1/3">
                <label :for="'asset-name-' + index">Asset</label>
                <Dropdown :id="'asset-name-' + index" v-model="asset.asset_id" :options="getAssets" optionLabel="name"
                  optionValue="id" :placeholder="asset.asset_id? null : 'Select an Asset'" class="custom-dropdown p-focus" />
              </div>
              <div class="flex flex-col w-1/3">
                <label :for="'asset-incoming-' + index">Incoming Value</label>
                <InputText :id="'asset-incoming-' + index" v-model="asset.incoming_markup" class="inputText"
                  :class="{ 'is-invalid': !isNumeric(asset.incoming_markup) && asset.incoming_markup !== '' }" />
              </div>
              <div class="flex flex-col w-1/3">
                <label :for="'asset-outcoming-' + index">Outcoming Value</label>
                <InputText :id="'asset-outcoming-' + index" v-model="asset.outgoing_markup" class="inputText"
                  :class="{ 'is-invalid': !isNumeric(asset.outgoing_markup) && asset.outgoing_markup !== '' }" />
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
import axios from 'axios';

const getAssets = computed(() => markupsStore.showAsset);

const props = defineProps({
  UpdateVisible: Boolean,
  markup: Object,
});

const emit = defineEmits(['close', 'save']);

const markupsStore = useMarkups();
const returnedMarkeUp = ref({ ...props.markup });

watch(() => props.markup, (newMarkup) => {
  returnedMarkeUp.value = { ...newMarkup };
});
const closeModal = () => emit('close');


const updateMarkup = async () => {
  try {
    const response = await axios.post(`https://{example.com/api/markups/${returnedMarkeUp.value.id}, returnedMarkeUp.value`);
    
      await markupsStore.updateMarkup(response.data);
      closeModal();
 
  } catch (error) {
    console.error('Error updating markup:', error.response ? error.response.data : error.message);
  }
};

const isNumeric = (value) => !isNaN(value) && isFinite(value);
const removeAsset = (index) => returnedMarkeUp.value.assets.splice(index, 1);
</script>



<style scoped></style>
