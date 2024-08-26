<template>
  <div>
    <div class="bg-white rounded-md p-4">
      <!-- Update Modal -->
      <UpdateValues :UpdateVisible="isUpdateModalVisible" @close="hideUpdateModal"  :markup="selectedMarkup" />

      <!-- Popup Modal -->
      <popupModal :AddVisible="isAddModalVisible" @close="hideAddModal" />

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
          <button @click="showAddModal" class="px-3 py-2 bg-prim text-white rounded-lg">
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
            <tr v-for="m in filteredMarkups" :key="m.id" class="border-b-2 border-sec-1">
              <td>{{ m.name }}</td>
              <td>{{ m.incoming_markup }}</td>
              <td>{{ m.outgoing_markup }}</td>
              <td>{{ m.assigned_corporates }}</td>
              <td>
                <div class="relative">
                  <button @click="toggleActions(m.id)" class="py-2 px-4  bg-sec-1 text-sec-3 font-semibold rounded flex items-center">
                    Action
                    <Icon size="18" name="ri:arrow-down-s-line" color="black" />
                  </button>
                  <div v-if="activeAction === m.id" class="actions absolute top-7 z-10 bg-sec-1 border-2 p-3 rounded-lg w-24 mt-2 flex flex-col gap-1">
                    <button @click="editMarkup(m)" class="bg-prim actionBTN">
                      Edit
                    </button>
                    <button @click="deleteMarkup(m.id)" class="bg-red-600 actionBTN">
                      Delete
                    </button>
                  </div>
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
import { ref, computed, onMounted } from 'vue'; 
import { useMarkups } from '@/stores/markups';

// State variables
const searchQuery = ref(''); 
const isAddModalVisible = ref(false); 
const isUpdateModalVisible = ref(false); 
const activeAction = ref(null); 
const selectedMarkup = ref(null); 

// Access the markups store
const markupsStore = useMarkups();

// Fetch initial data when component is mounted
onMounted(() => {
  markupsStore.fetchMarkUps(); 
  markupsStore.fetchAssets(); 
  markupsStore.fetchCorporateInfo(); 
});

// Methods for handling modal visibility
const showAddModal = () => {
  isAddModalVisible.value = true; 
};

const hideAddModal = () => {
  isAddModalVisible.value = false; 
};

const showUpdateModal = () => {
  isUpdateModalVisible.value = true; 
};

const hideUpdateModal = () => {
  isUpdateModalVisible.value = false; 
};

// Computed properties
const getMarkups = computed(() => markupsStore.showMarkup); 
  

// Filter markups based on the search query
const filteredMarkups = computed(() => {
  return getMarkups.value.filter(m =>
    m.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleActions = (id) => {
  activeAction.value = activeAction.value === id ? null : id;
};

// Set the selected markup for editing and show the Update Markup modal
const editMarkup = (markup) => {
  selectedMarkup.value = { ...markup }; 
  showUpdateModal(); 
};

const deleteMarkup = (id) => {
  // Implement delete functionality here
};

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

.actionBTN{
  @apply py-2 px-4  text-white font-semibold rounded flex items-center justify-center w-full ;
}
</style>
