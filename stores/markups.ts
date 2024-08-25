import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'https://test.mowafaqa.com.sa/api';




interface MarkupData{
    id: number;
    name: string;
    incoming_markup: string;
    outgoing_markup: string;
}
interface AssetData {
    name: string; 
    id: number;  
   
  }

interface AssetsInfo{
    name?: string; 
    incomingValue: string;
    outcomingValue: string;
  }

interface MarkupsInfo {
    name: string;
    incomingValue: string;
    outcomingValue: string;
    corporates?:string;
    assets: AssetsInfo[];
  }

interface Corporate {
  name: string; 
  id: number;  
}

interface Markups {
  showMarkup:MarkupData[];  
  userMarkup: MarkupsInfo[];
  showAsset: AssetData[];
  CorporateInfo: Corporate[];
  addMarkup: MarkupsInfo;
}

// Define the Pinia store
export const useMarkups = defineStore('markup', {
  state: (): Markups => ({
    showMarkup:[],
    userMarkup: [],
    showAsset: [],
    CorporateInfo: [],
    addMarkup: {
        name: '',
        incomingValue: '',
        outcomingValue: '',
        corporates:'',
        assets: []
      },

  
   
  }),

  actions: {



    // clear data
    clearvalues(){
      this.addMarkup={
        name:'',
        incomingValue:'',
        outcomingValue:'',
        corporates:'',
        assets:[]
      }
    },


    



    // fetch Markups
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

    // fetch Assets
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

    // fetch Corporate
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

    

