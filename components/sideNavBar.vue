<template>
  <div class="transition-transform duration-300 ease-in-out lg:translate-y-0 w-full"
    :class="{ 'translate-y-0': isSidebarOpen, '-translate-y-full': !isSidebarOpen }">
    <div class="lg:h-screen bg-white text-sec-2 py-6 w-full">
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-black text-2xl font-bold px-6 flex items-center">
          <Icon size="25" name="f7:hexagon-fill" color="black" /> RoxCustody
        </h1>
        <Icon size="25" name="ic:sharp-close" color="black" class="lg:hidden" @click="toggle" />
      </div>
      <ul>
        <NuxtLink to="/Dashboard" @click="TToDashboard"> 
          <li>
            <Icon size="25" name="material-symbols:dashboard" /> Dashboard
          </li>
        </NuxtLink>
        <NuxtLink to="/Corporates" @click="TToCoporates">
          <li>
            <Icon size="25" name="ph:buildings-fill" /> Corporates
          </li>
        </NuxtLink>
        <NuxtLink to="/Network" @click="TToNetwork">
          <li>
            <Icon size="25" name="entypo:network" /> Networks
          </li>
        </NuxtLink>
        <NuxtLink to="/Assets" @click="TToAsset">
          <li>
            <Icon size="25" name="fa-brands:gg-circle" /> Assets
          </li>
        </NuxtLink>
        <NuxtLink to="/Markup" @click="TToMarkup">
          <li>
            <Icon size="25" name="f7:divide-square-fill" /> Markups
          </li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMarkups } from '~/stores/markups'; 


const isSidebarOpen = ref(false);
const toggle = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
ul li {
  @apply px-10 py-4 pr-32 flex items-center gap-1 font-bold;
}

.router-link-exact-active li {
  border-left: 4px solid #4824f5;
  background-color: #f2f5fa;
  color: black;
  box-sizing: border-box;
}

.router-link-exact-active li span {
  color: #4824f5;
}
</style>
