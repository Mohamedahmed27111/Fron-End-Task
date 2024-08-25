import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://test.mowafaqa.com.sa/api';

// Interface definitions
interface MarkupData {
    id: number;
    name: string;
    incoming_markup: string;
    outgoing_markup: string;
}

interface AssetData {
    name: string; 
    id: number;  
}

interface AssetsInfo {
    name?: string; 
    incomingValue: string;
    outcomingValue: string;
}

interface MarkupsInfo {
    id?: number; // Added id here to match with MarkupData in UpdateMarkeups
    name: string;
    incomingValue: string;
    outcomingValue: string;
    corporates?: string;
    assets: AssetsInfo[];
}

interface Markupsupdate {
    name: string;
    incoming_markup: string;
    outgoing_markup: string;
    assets: AssetUpdate[];
}

interface AssetUpdate {
    name: string; 
    incomingValue: string;
    outcomingValue: string;
}

interface Corporate {
    name: string; 
    id: number;  
}

interface Markups {
    showMarkup: MarkupData[];
    userMarkup: MarkupsInfo[];
    showAsset: AssetData[];
    CorporateInfo: Corporate[];
    addMarkup: MarkupsInfo;
    updateMarkup: Markupsupdate;
}

// Define the Pinia store
export const useMarkups = defineStore('markup', {
  state: (): Markups => ({
    showMarkup: [],
    userMarkup: [],
    showAsset: [],
    CorporateInfo: [],
    addMarkup: {
      id: undefined, // Initialized with undefined
      name: '',
      incomingValue: '',
      outcomingValue: '',
      corporates: '',
      assets: []
    },
    updateMarkup: {
      name: '',
      incoming_markup: '',
      outgoing_markup: '',
      assets: []
    }
  }),

  actions: {
    // Clear data
    clearvalues() {
      this.addMarkup = {
        id: undefined, 
        name: '',
        incomingValue: '',
        outcomingValue: '',
        corporates: '',
        assets: []
      };
    },

    // Update Markups
    UpdateMarkeups() {
      // Ensure addMarkup has an id before proceeding
      if (this.addMarkup.id === undefined) {
        console.error('No markup ID specified for update.');
        return;
      }

      // Find the index of the markup to update
      const index = this.showMarkup.findIndex(markup => markup.id === this.addMarkup.id);
      if (index !== -1) {
        // Update the item in the array
        this.showMarkup[index] = {
          ...this.showMarkup[index],
          name: this.addMarkup.name,
          incoming_markup: this.addMarkup.incomingValue,
          outgoing_markup: this.addMarkup.outcomingValue,
        };
      } else {
        console.error('Markup not found');
      }
    },

    // Fetch Markups
    fetchMarkUps() {
      axios.get<{ data: MarkupData[] }>(`${API_URL}/markups`)
        .then((response) => {
          this.showMarkup = response.data.data.map(markUp => ({
            name: markUp.name,
            incoming_markup: markUp.incoming_markup,
            outgoing_markup: markUp.outgoing_markup,
            id: markUp.id
          }));
        })
        .catch((error) => {
          console.error('Error fetching Markups:', error);
        });
    },

    // Fetch Assets
    fetchAssets() {
      axios.get<{ data: AssetData[] }>(`${API_URL}/assets`)
        .then((response) => {
          this.showAsset = response.data.data.map(asset => ({
            name: asset.name,
            id: asset.id
          }));
        })
        .catch((error) => {
          console.error('Error fetching assets:', error);
        });
    },

    // Fetch Corporate Info
    fetchCorporateInfo() {
      axios.get<{ data: Corporate[] }>(`${API_URL}/corporates`)
        .then((response) => {
          this.CorporateInfo = response.data.data.map(corporate => ({
            name: corporate.name,
            id: corporate.id
          }));
        })
        .catch((error) => {
          console.error('Error fetching corporate info:', error);
        });
    }
  },
});
