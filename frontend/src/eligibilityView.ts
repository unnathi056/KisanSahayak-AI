export type EligibilityViewState = 'eligible'|'not_eligible'|'unknown';
export function eligibilityLabel(status: EligibilityViewState, language:'en'|'kn'='en'):string {
  if(language==='kn') return status==='eligible'?'ಅರ್ಹ':status==='not_eligible'?'ಅರ್ಹರಲ್ಲ':'ಅಜ್ಞಾತ';
  return status==='eligible'?'Eligible':status==='not_eligible'?'Not Eligible':'Unknown';
}
export function safeConditionState(status: unknown): EligibilityViewState {
  return status==='eligible'||status==='not_eligible'?status:'unknown';
}
