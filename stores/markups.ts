import { defineStore } from 'pinia';
import axios from 'axios';

// URL
const API_URL = 'https://test.mowafaqa.com.sa/api';

// Interface definitions
interface AssetsInfo {
  id: number;
  incomingValue: string;
  outcomingValue: string;
}

interface CorporatesInfo {
  id: number;
}

interface MarkupsInfo {
  name: string;
  incomingValue: string;
  outcomingValue: string;
  corporates: CorporatesInfo[];
  assets: AssetsInfo[];
}

interface Markups {
  showMarkup: string[];
  showAsset: string[];
  userMarkup: MarkupsInfo[];
  showCorporate: string[];
  addMarkup: MarkupsInfo;
}

// Define the Pinia store
export const useMarkups = defineStore('markup', {
  state: (): Markups => ({
    showMarkup: [],
    showAsset: [],
    userMarkup: [],
    showCorporate: [],
    addMarkup: {
      name: '',
      incomingValue: '',
      outcomingValue: '',
      corporates: [],
      assets: [],
    },
  }),

  // Actions
  actions: {
  
    // Clear data
    clearvalues() {
      this.addMarkup = {
        name: '',
        incomingValue: '',
        outcomingValue: '',
        corporates: [],
        assets: [],
      };
    },

    // Fetch Markups
    fetchMarkUps() {
      axios
        .get(`${API_URL}/markups`)
        .then((response) => {
          this.showMarkup = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching Markups:', error);
        });
    },

    // Fetch Assets
    fetchAssets() {
      axios
        .get(`${API_URL}/assets`)
        .then((response) => {
          this.showAsset = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching assets:', error);
        });
    },

    // Fetch Corporate Info
    fetchCorporateInfo() {
      axios
        .get(`${API_URL}/corporates`)
        .then((response) => {
          this.showCorporate = response.data.data;
        })
        .catch((error) => {
          console.error('Error fetching corporate info:', error);
        });
    },
  },
});
