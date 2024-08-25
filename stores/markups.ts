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
  addAsset: AssetsInfo;
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
      addAsset:{
        name:'',
        incomingValue: '',
        outcomingValue: ''
      }
  }),

  actions: {

    // fetch Markups
    async fetchMarkUps(){
        try{
            const response = await axios.get<{data:MarkupData[]}>(`${API_URL}/markups`)
            this.showMarkup=response.data.data.map(markUp => ({
                name:markUp.name,
                incoming_markup: markUp.incoming_markup ,
                outgoing_markup:markUp.outgoing_markup,
                id:markUp.id
            }));
        }
        catch (error) {
            console.error('Error fetching Markups', error);
          }
    },
    


    // fetch Assets
    async fetchAssets() {
      try {
        const response = await axios.get<{ data: { name: string; id: number }[] }>(`${API_URL}/assets`);
        this.showAsset = response.data.data.map(asset => ({
          name: asset.name,
          id: asset.id,     
        }));
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
   
    
    },
    // fetch Corporate

    async fetchCorporateInfo() {
      try {
        const response = await axios.get<{ data: Corporate[] }>(`${API_URL}/corporates`);
        this.CorporateInfo = response.data.data.map(Corporate=>({
            name:Corporate.name,
            id:Corporate.id
        }))
      } catch (error) {
        console.error('Error fetching corporate info:', error);
      }
    }
  },
});
