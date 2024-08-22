<template>
  <div class="p-3">
    <div class="my-3">
      <h1 class="font-bold text-xl text-black">Assign corporates <span class="text-prim text-sm font-extrabold">(optional)</span></h1>
      <p class="text-xs text-sec-2 font-bold">
        Select corporates to apply this markup to them.
        You can do this from the markups page too.
      </p>
    </div>
    <MultiSelect
      v-model="selectedCorporates"
      :options="corporates"
      optionLabel="name"
      placeholder="Select Corporates"
      class="custom-dropdown p-focus w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

// Define the type for corporates
interface Corporate {
  name: string;
  id: number;
}

// Define props
const props = defineProps<{
  corporates: Corporate[];
  modelValue: Corporate[];
}>();

// Define emits
const emit = defineEmits<{
  (event: 'update:modelValue', value: Corporate[]): void;
}>();

// Initialize selectedCorporates with the value from props
const selectedCorporates = ref<Corporate[]>(props.modelValue);

// Watch for changes in selectedCorporates and emit updates
watch(selectedCorporates, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>

<style scoped>
.p-multiselect:not(.p-disabled).p-focus{
  border-color:#4824f5 !important ;
}



</style>
