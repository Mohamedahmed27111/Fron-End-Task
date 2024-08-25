<template>
  <div>
    <!-- Form fields for user input -->
    <div class="flex flex-col">
      <label for="G-name">Group name</label>
      <InputText v-model="inputMArkup.name" id="G-name" class="inputText" />
    </div>

    <div class="flex justify-between my-3 gap-3">
      <div class="flex flex-col">
        <label for="M-In-v">Incoming Value</label>
        <InputText
          v-model="inputMArkup.incomingValue"
          id="M-In-v"
          class="inputText"
          :class="{ 'is-invalid': !isNumeric(inputMArkup.incomingValue) && inputMArkup.incomingValue !== '' }"
          @input="validateNumeric($event)"
        />
        <span v-if="!isNumeric(inputMArkup.incomingValue) && inputMArkup.incomingValue !== ''" class="error">This field is required Number</span>
      </div>
      <div class="flex flex-col">
        <label for="M-Out-v">Outcoming Value</label>
        <InputText
          v-model="inputMArkup.outcomingValue"
          id="M-Out-v"
          class="inputText"
          :class="{ 'is-invalid': !isNumeric(inputMArkup.outcomingValue) && inputMArkup.outcomingValue !== '' }"
          @input="validateNumeric($event)"
        />
        <span v-if="!isNumeric(inputMArkup.outcomingValue) && inputMArkup.outcomingValue !== ''" class="error">This field is required Number</span>
      </div>
    </div>
    

    <div class="my-3">
      <h1 class="font-bold text-black">Custom Markup <span class="text-prim text-sm font-extrabold">(optional)</span></h1>
      <p class="text-xs text-sec-2 font-bold">You can add your customized markups for specific assets</p>
    </div>

    <!-- Assets -->
    <div v-if="inputMArkup.assets.length > 0" class="overflow-y-auto max-h-48">
      <div v-for="(asset ,index ) in  inputMArkup.assets" :key="index" class="asset-container flex justify-between items-center gap-2 mt-5">
        <div>
          <Dropdown
            v-model="asset.name"
            :options="getAssets"
            optionLabel="name"
            placeholder="Select an Asset"
            class="custom-dropdown p-focus"
          />
        </div>
        <div>
          <InputText
            v-model="asset.incomingValue"
            class="inputText"
            placeholder="Incoming Value"
            :class="{ 'is-invalid': !isNumeric(asset.incomingValue) && asset.incomingValue !== '' }"
            @input="validateNumeric($event)"
          />
          <span v-if="!isNumeric(asset.incomingValue) && asset.incomingValue !== ''" class="error">This field is required Number</span>
        </div>
        <div>
          <InputText
            v-model="asset.outcomingValue"
            class="inputText"
            placeholder="Outcoming Value"
            :class="{ 'is-invalid': !isNumeric(asset.outcomingValue) && asset.outcomingValue !== '' }"
            @input="validateNumeric($event)"
          />
          <span v-if="!isNumeric(asset.outcomingValue) && asset.outcomingValue !== ''" class="error">This field is required Number</span>
        </div>
        <button type="button" @click="removeAsset(index)" class="text-sec-2 hover:text-sec-3">
          <Icon size="25" name="ic:baseline-delete" />
        </button>
      </div>
    </div>

    <!-- Button to add a new asset -->
    <button type="button" @click="addAsset" class="w-full bg-sec-1 text-prim py-2 mt-5 font-bold rounded-lg">+ Add Asset</button>
  </div>
</template>

<script setup lang="ts">


import { useMarkups } from '~/stores/markups';

const markupStore = useMarkups()
const inputMArkup = ref(markupStore.addMarkup)

markupStore.fetchAssets()
const getAssets = (markupStore.showAsset)













// Function to add a new asset
const addAsset = () => {
  inputMArkup.value.assets.push({
    name: '',
    incomingValue: '',
    outcomingValue: '',
  });
};

// Function to remove an asset
const removeAsset = (index: number) => {
  inputMArkup .value.assets.splice(index, 1);
};

// Function to validate numeric input
const isNumeric = (value: string): boolean => /^\d*\.?\d*$/.test(value);

// Function to prevent non-numeric input
const validateNumeric = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!isNumeric(input.value)) {
    input.value = input.value.slice(0, -1);
  }
};



</script>

<style scoped>
.inputText {
  @apply bg-white w-full ;
}

.inputText:focus {
  border-color: #4824f5 !important;
}

.custom-dropdown .p-dropdown .p-inputtext:focus {
  border-color: #4824f5 !important;
}

.p-select-option.p-select-option-selected.p-focus {
  color: #4824f5 !important;
}

label {
  @apply text-sm font-bold text-sec-2;
}

.error {
  color: red;
  font-size: 0.9em;
}

.is-invalid {
  border-color: red;
  outline-color: red;
}
</style>
