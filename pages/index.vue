<template>
  <div>
    <div class="bg-white rounded-md p-4">
      <UpdateValues :visible="isModalVisible" @close="hideModal" />
      
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
            <tr v-for="m,  in filteredMarkups" :key="m.id" class="border-b-2 border-sec-1">
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



<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useMarkups } from '@/stores/markups';

const searchQuery = ref('');
const isModalVisible = ref(true);
const activeAction = ref(null);

const markupsStore = useMarkups();

onMounted(() => {
  markupsStore.fetchMarkUps();
  markupsStore.fetchAssets();
  markupsStore.fetchCorporateInfo();
});

const getMarkups = computed(() => markupsStore.showMarkup);

watch(() => markupsStore.showMarkup, (newVal) => {
  getMarkups.value = newVal;
}, { immediate: true });

const filteredMarkups = computed(() => {
  return getMarkups.value.filter(m =>
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};

const toggleActions = (id) => {
  activeAction.value = activeAction.value === id ? null : id;
};

// Function to edit a markup (Placeholder function, implement your logic)
const editMarkup = (id) => {
  markupsStore.updateMarkup()
};

// // Function to delete a markup (Placeholder function, implement your logic)
// const deleteMarkup = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/markups/${id}`);
//     console.log('Markup deleted successfully');
//     markupsStore.fetchMarkUps(); // Refresh the list after deletion
//   } catch (error) {
//     console.error('An error occurred while deleting the markup:', error);
//   }
// };
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
