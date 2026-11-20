export type FarmerProfileFixture = {
  full_name: string;
  email: string;
  mobile_number: string | null;
  state: string;
  district: string;
  village: string | null;
  crops: string[];
  land_size: number;
  land_unit: 'acre' | 'hectare';
  landholding_status: 'owner' | 'tenant_sharecropper' | 'landless' | 'unknown';
};

// Supabase supplies `id` from the authenticated user; fixtures must not invent auth identities.
export const farmerProfileFixtures: FarmerProfileFixture[] = [
  { full_name:'Synthetic Farmer 01', email:'farmer01@example.invalid', mobile_number:null, state:'Karnataka', district:'Bengaluru Urban', village:'Test Village 01', crops:['ragi'], land_size:0.99, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 02', email:'farmer02@example.invalid', mobile_number:null, state:'Karnataka', district:'Mysuru', village:'Test Village 02', crops:['rice'], land_size:1, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 03', email:'farmer03@example.invalid', mobile_number:null, state:'Karnataka', district:'Belagavi', village:'Test Village 03', crops:['sugarcane'], land_size:1.01, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 04', email:'farmer04@example.invalid', mobile_number:null, state:'Karnataka', district:'Mandya', village:'Test Village 04', crops:['sugarcane','ragi'], land_size:4.5, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 05', email:'farmer05@example.invalid', mobile_number:null, state:'Karnataka', district:'Hassan', village:'Test Village 05', crops:['coffee','pepper'], land_size:0.8, land_unit:'hectare', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 06', email:'farmer06@example.invalid', mobile_number:null, state:'Karnataka', district:'Kodagu', village:'Test Village 06', crops:['coffee'], land_size:2.25, land_unit:'hectare', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 07', email:'farmer07@example.invalid', mobile_number:null, state:'Karnataka', district:'Chikkamagaluru', village:'Test Village 07', crops:['coffee','arecanut'], land_size:1.6, land_unit:'hectare', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 08', email:'farmer08@example.invalid', mobile_number:null, state:'Karnataka', district:'Dakshina Kannada', village:'Test Village 08', crops:['coconut','arecanut'], land_size:0.65, land_unit:'hectare', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 09', email:'farmer09@example.invalid', mobile_number:null, state:'Karnataka', district:'Udupi', village:'Test Village 09', crops:['paddy','coconut'], land_size:1.75, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 10', email:'farmer10@example.invalid', mobile_number:null, state:'Karnataka', district:'Dharwad', village:'Test Village 10', crops:['cotton','maize'], land_size:6.25, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 11', email:'farmer11@example.invalid', mobile_number:null, state:'Karnataka', district:'Koppal', village:'Test Village 11', crops:['jowar','maize'], land_size:18, land_unit:'acre', landholding_status:'owner' },
  { full_name:'Synthetic Farmer 12', email:'farmer12@example.invalid', mobile_number:null, state:'Karnataka', district:'Raichur', village:'Test Village 12', crops:['paddy','cotton'], land_size:2.4, land_unit:'acre', landholding_status:'tenant_sharecropper' },
  { full_name:'Synthetic Farmer 13', email:'farmer13@example.invalid', mobile_number:null, state:'Karnataka', district:'Vijayapura', village:'Test Village 13', crops:['grape','pomegranate'], land_size:0.9, land_unit:'acre', landholding_status:'tenant_sharecropper' },
  { full_name:'Synthetic Farmer 14', email:'farmer14@example.invalid', mobile_number:null, state:'Karnataka', district:'Kalaburagi', village:'Test Village 14', crops:['tur','soybean'], land_size:3.5, land_unit:'acre', landholding_status:'tenant_sharecropper' },
  { full_name:'Synthetic Farmer 15', email:'farmer15@example.invalid', mobile_number:null, state:'Karnataka', district:'Tumakuru', village:'Test Village 15', crops:['groundnut','ragi'], land_size:2, land_unit:'acre', landholding_status:'tenant_sharecropper' },
  { full_name:'Synthetic Farmer 16', email:'farmer16@example.invalid', mobile_number:null, state:'Karnataka', district:'Bidar', village:'Test Village 16', crops:['bengal gram'], land_size:1.2, land_unit:'acre', landholding_status:'tenant_sharecropper' },
  { full_name:'Synthetic Farmer 17', email:'farmer17@example.invalid', mobile_number:null, state:'Karnataka', district:'Chitradurga', village:'Test Village 17', crops:['millet'], land_size:0, land_unit:'acre', landholding_status:'landless' },
  { full_name:'Synthetic Farmer 18', email:'farmer18@example.invalid', mobile_number:null, state:'Karnataka', district:'Kolar', village:'Test Village 18', crops:['tomato'], land_size:0, land_unit:'acre', landholding_status:'landless' },
  { full_name:'Synthetic Farmer 19', email:'farmer19@example.invalid', mobile_number:null, state:'Karnataka', district:'Chamarajanagar', village:'Test Village 19', crops:['ragi','pulses'], land_size:0, land_unit:'acre', landholding_status:'landless' },
  { full_name:'Synthetic Farmer 20', email:'farmer20@example.invalid', mobile_number:null, state:'Karnataka', district:'Shivamogga', village:'Test Village 20', crops:['arecanut','paddy'], land_size:1.1, land_unit:'hectare', landholding_status:'unknown' },
];
