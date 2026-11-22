import { apiUrl } from './api';

export type Recommendation = {schemeId:string;status:string;reasons:string[];missingInformation:string[]};
export type RecommendationRequest = {
  state:string;
  district:string;
  crops:string[];
  landSize:number;
  landUnit:'acres'|'hectares';
  landholdingType:string;
  language:'en'|'kn';
};

function isRecord(value:unknown):value is Record<string,unknown>{
  return typeof value==='object'&&value!==null;
}

export async function requestRecommendations(
  fetcher:typeof fetch,
  accessToken:string,
  profile:RecommendationRequest,
  fallbackMessage:string,
):Promise<Recommendation[]>{
  let response:Response;
  try{
    response=await fetcher(apiUrl('/api/schemes/recommend'),{
      method:'POST',
      headers:{'Content-Type':'application/json',Authorization:`Bearer ${accessToken}`},
      body:JSON.stringify(profile),
    });
  }catch{
    throw new Error(fallbackMessage);
  }

  let payload:unknown;
  try{
    payload=await response.json();
  }catch{
    throw new Error(fallbackMessage);
  }

  const data=isRecord(payload)?payload.data:undefined;
  if(!response.ok||!isRecord(payload)||payload.success!==true||!Array.isArray(data)){
    const message=isRecord(payload)&&typeof payload.error==='string'&&payload.error.trim()?payload.error:fallbackMessage;
    throw new Error(message);
  }
  return data as Recommendation[];
}
