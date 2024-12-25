import { useState, useEffect } from 'react';
import { getAllECGRecords } from '../services/api';
import type { ECGRecord } from '../types/models';

export function useECGStats() {
    const [records, setRecords] = useState<ECGRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getAllECGRecords();
                setRecords(data);
            } catch (err) {
                setError('Failed to fetch ECG records');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const uniquePatients = new Set(records.map(record => record.patientEmail)).size;
    const totalRecords = records.length;

    return { records, uniquePatients, totalRecords, loading, error };
}