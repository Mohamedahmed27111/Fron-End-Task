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
      v-model="inputMArkup.corporates"
      :options="getCorporates"
      optionLabel="name"
      placeholder="Select Corporates"
      class="custom-dropdown p-focus w-full"

    />
  </div>
</template>



<script setup >
import { ref} from 'vue';
import { useMarkups } from '~/stores/markups';

const markupsStore = useMarkups();

const inputMArkup = ref(markupsStore.addMarkup)

const getCorporates =ref(markupsStore.CorporateInfo)




</script>

<style scoped>
.p-multiselect:not(.p-disabled).p-focus{
  border-color:#4824f5 !important ;
}



</style>
