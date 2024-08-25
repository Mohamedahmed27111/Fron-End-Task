<template>
  <div>

    <div class="bg-white rounded-md p-4">
      
      <h1 class="text-black text-2xl font-bold">Markups Groups</h1>
      <p class="text-sec-2 text-sm font-semibold mt-1">Manage your markups, add and edit them</p>

      <div class="CFI flex items-start justify-between flex-col md:flex-row md:items-center mb-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for markups..."
          class="p-2 border rounded w-full md:w-1/3"
        />
        <div class="CF flex flex-col md:flex-row md:items-center items-start gap-2 mt-4 md:mt-0">
          <button class="px-3 py-2 bg-sec-1 text-prim flex items-center rounded-lg">
            <Icon size="25" name="mdi:filter" /> Filter
          </button>
          <button @click="openModal" class="px-3 py-2 bg-prim text-white rounded-lg">
            + Create Markup Group
          </button>
          <PopuoModal v-model:isOpen="showModal" title="Create Markup Group" />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-[300%] sm:w-[250%] xl:w-full table-fixed">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Incoming Value(%)</th>
              <th>Outgoing Value(%)</th>
              <th>Assigned corporates</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in filteredMarkups" :key="m.id" class="border-b-2 border-sec-1">
              <td>{{ m.name }}</td>
              <td>{{ m.incoming_markup }}</td>
              <td>{{ m.outgoing_markup }}</td>
              <td></td>
              <td class="">
                <button @click="toggleActions(m.id)" class="py-2 px-4 bg-sec-1 text-sec-3 font-semibold rounded flex items-center">
                  Action
                  <Icon size="18" name="ri:arrow-down-s-line" color="black" />
                </button> 
                <div v-if="activeAction === m.id" class="actions absolute z-10 bg-sec-1 border-2 p-3 rounded-lg">
                  <button @click="editMarkup(m.id)" class="py-2 px-4 w-full bg-prim my-2 text-white font-semibold rounded flex items-center justify-center">
                    Edit
                  </button>
                  <button @click="deleteMarkup(m.id)" class="py-2 px-4 bg-red-600 text-white font-semibold rounded flex items-center justify-center">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref, computed , onMounted } from 'vue'

import { useMarkups } from '@/stores/markups';

const searchQuery = ref('')
const showModal = ref(true)
const activeAction = ref(null)

const markupsStore = useMarkups();


const getMarkups = ref(markupsStore.showMarkup)

console.log(getMarkups)
onMounted(() => {
  markupsStore.fetchMarkUps()

})

// Computed property to filter markups based on the search query
const filteredMarkups = computed(() => {
  return getMarkups.value.filter(m => 
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Open modal
const openModal = () => {
  showModal.value = true
}
















// // PUT request to edit a markup
// const editMarkup = async (id) => {
//   try {
//     const response = await axios.put(`https://example.com/api/markups/${id}`, {
//       name: 'Updated Markup Name',
//       incoming_markup: 10,
//       outgoing_markup: 5
//     })
//     console.log('Markup updated successfully:', response.data)
//     // Optionally refresh the markups list after editing
//     fetchMarkups()
//   } catch (error) {
//     console.error('An error occurred while updating the markup:', error)
//   }
// }

// // DELETE request to delete a markup
// const deleteMarkup = async (id) => {
//   try {
//     const response = await axios.delete(`https://example.com/api/markups/${id}`)
//     console.log('Markup deleted successfully:', response.data)
//     fetchMarkups()
//   } catch (error) {
//     console.error('An error occurred while deleting the markup:', error)
//   }
// }

// Toggle actions for each markup
const toggleActions = (id) => {
  activeAction.value = activeAction.value === id ? null : id
}
</script>

<style scoped>
/* Table */
table {
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 15px;
  white-space: nowrap;
}

th {
  @apply text-sec-2;
}

td {
  @apply text-sec-3;
}

/* Input search */
input {
  @apply bg-white rounded-lg;
  outline: none;
}

input:focus {
  @apply border-2 border-sec-2;
}
</style>
