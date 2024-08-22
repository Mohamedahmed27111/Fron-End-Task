<template>
  <div>
    <!-- Form fields for user input -->
    <div class="flex flex-col">
      <label for="G-name">Group name</label>
      <InputText v-model="markup.name" id="G-name" class="inputText" />
    </div>

    <div class="flex justify-between my-3 gap-3">
      <div class="flex flex-col">
        <label for="M-In-v">Incoming Value</label>
        <InputText
          v-model="markup.incomingValue"
          id="M-In-v"
          class="inputText"
          :class="{ 'is-invalid': !isNumeric(markup.incomingValue) && markup.incomingValue !== '' }"
          @input="validateNumeric($event)"
        />
        <span v-if="!isNumeric(markup.incomingValue) && markup.incomingValue !== ''" class="error">This field is required Number</span>
      </div>
      <div class="flex flex-col">
        <label for="M-Out-v">Outcoming Value</label>
        <InputText
          v-model="markup.outcomingValue"
          id="M-Out-v"
          class="inputText"
          :class="{ 'is-invalid': !isNumeric(markup.outcomingValue) && markup.outcomingValue !== '' }"
          @input="validateNumeric($event)"
        />
        <span v-if="!isNumeric(markup.outcomingValue) && markup.outcomingValue !== ''" class="error">This field is required Number</span>
      </div>
    </div>

    <div class="my-3">
      <h1 class="font-bold text-black">Custom Markup <span class="text-prim text-sm font-extrabold">(optional)</span></h1>
      <p class="text-xs text-sec-2 font-bold">You can add your customized markups for specific assets</p>
    </div>

    <!-- Assets -->
    <div v-if="markup.assets.length > 0" class="overflow-y-auto max-h-48">
      <div v-for="(asset, index) in markup.assets" :key="index" class="asset-container flex justify-between items-center gap-2 mt-5">
        <div>
          <Dropdown
            v-model="asset.selectedAsset"
            :options="assets"
            optionLabel="name"
            placeholder="Select an Asset"
            class="custom-dropdown p-focus"
          />
        </div>
        <div>
          <InputText
            v-model="asset.incomingValue"
            :id="'asset-incomingValue-' + index"
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
            :id="'asset-outcomingValue-' + index"
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
import { ref, defineProps, defineEmits, watch } from 'vue';


interface Asset {
  selectedAsset: string;
  incomingValue: string;
  outcomingValue: string;
  id: number;
}

interface Markup {
  name: string;
  incomingValue: string;
  outcomingValue: string;
  assets: Asset[];
}

// Define props
const props = defineProps<{
  assets: { name: string; id: number }[];
  markup: Markup;
}>();

// Define emits
const emit = defineEmits<{
  (event: 'update:modelValue', value: Markup): void;
}>();

// Initialize the markup object with props
const markup = ref<Markup>(props.markup);

// Available assets from props
const availableAssets = ref<{ name: string; id: number }[]>(props.assets);

// Function to add a new asset
const addAsset = () => {
  markup.value.assets.push({
    selectedAsset: '',
    incomingValue: '',
    outcomingValue: '',
    id: Date.now(), // Unique ID
  });
};

// Function to remove an asset
const removeAsset = (index: number) => {
  markup.value.assets.splice(index, 1);
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

// Watch for changes in markup and emit the updated value
watch(markup, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

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
