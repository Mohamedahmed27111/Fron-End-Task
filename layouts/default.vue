<template>
    <div class="flex flex-col lg:flex-row h-screen relative">
      <div class="sticky  top-0 ">
        <SideNavBar />
      </div>
  
      <div class="flex-auto p-4 lg:p-10  ">
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
    
    onMounted(() => {
      isLoading.value = false
    })
    </script>
    
    
  
  
  
  
  