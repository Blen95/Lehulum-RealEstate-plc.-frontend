declare module "../api/contactapi.js" {
  export function submitComplaint(formData: FormData): Promise<any>;
  export function trackComplaint(trackingNumber: string): Promise<any>;
  export function submitTip(payload: Record<string, any>): Promise<any>;
  export function submitInquiry(payload: Record<string, any>): Promise<any>;
}
