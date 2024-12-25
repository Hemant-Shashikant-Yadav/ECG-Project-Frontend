import { Patient } from '../types/patient';

// Mock data - replace with actual API calls later
const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastCheckup: "2024-03-15",
    status: "Normal",
    age: 45,
    gender: "Male",
    lastECG: "2024-03-15",
    nextAppointment: "2024-04-15"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    lastCheckup: "2024-03-14",
    status: "Follow-up Required",
    age: 52,
    gender: "Female",
    lastECG: "2024-03-14",
    nextAppointment: "2024-03-21"
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    lastCheckup: "2024-03-13",
    status: "Critical",
    age: 68,
    gender: "Male",
    lastECG: "2024-03-13",
    nextAppointment: "2024-03-16"
  }
];

export const getPatients = async (): Promise<Patient[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPatients), 1000);
  });
};

export const getPatientById = async (id: number): Promise<Patient | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPatients.find(p => p.id === id));
    }, 500);
  });
};