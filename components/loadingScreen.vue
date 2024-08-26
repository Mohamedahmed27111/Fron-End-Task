<template>
    <div class="bg-sec-1 w-full h-full flex items-center justify-center fixed top-0 z-10">
         <div class="loader"></div> 

    </div>
</template>

<style  scoped>
/* HTML: <div class="loader"></div> */
.loader {
  height: 80px;
  aspect-ratio: 1;
  display: grid;
}
.loader:before,
.loader:after {
  content: "";
  --c:no-repeat linear-gradient(#4824f5 0 0);
  background: var(--c), var(--c);
  background-size: 25% 50%;
  animation: l4 1.5s infinite linear;
}
.loader:after {
  transform: scale(-1);
}
@keyframes l4 {
  0%,
  10%  {background-position:33.4% 100%,66.6% 100%}
  40%  {background-position:33.4% 0,100% 100%}
  70%  {background-position:0 100%,66.6% 0}
  100% {background-position:33.4% 100%,66.6% 100%}
} 
</style>