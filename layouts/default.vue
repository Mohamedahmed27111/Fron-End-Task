<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <!-- Sticky Sidebar -->
    <div class="lg:sticky fixed z-50 top-0 h-screen">
      <SideNavBar />
    </div>

    <!-- Main Content Area -->
    <div class="flex-auto p-4 lg:p-10 overflow-auto">
      <LoadingScreen v-if="isLoading" />

      <div class="maincontent mt-4">
        <HeadBar />
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const router = useRouter();

onMounted(() => {
  isLoading.value = false
})
import { useRouter } from 'vue-router';


onMounted(() => {
  router.replace('/Markup'); 
});
</script>
