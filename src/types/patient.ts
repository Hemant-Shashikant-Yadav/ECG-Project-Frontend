export interface Patient {
  id: number;
  name: string;
  email: string;
  lastCheckup: string;
  status: 'Normal' | 'Follow-up Required' | 'Critical';
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastECG?: string;
  nextAppointment?: string;
}