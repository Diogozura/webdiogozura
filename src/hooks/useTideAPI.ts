import { useEffect, useState } from 'react';

export interface TideData {
  date: string;
  high_tide_1: string | null;
  high_tide_1_height: number | null;
  low_tide_1: string | null;
  low_tide_1_height: number | null;
  high_tide_2?: string | null;
  high_tide_2_height?: number | null;
  low_tide_2?: string | null;
  low_tide_2_height?: number | null;
}

export interface TideResponse {
  date: string;
  tides: TideData[];
}

export interface UseTideAPIOptions {
  latitude: number;
  longitude: number;
  date?: string; // YYYY-MM-DD format
}

export interface TideAPIState {
  data: TideData[] | null;
  loading: boolean;
  error: string | null;
}

const API_PROXY = '/api/tides';

export function useTideAPI(options: UseTideAPIOptions | null): TideAPIState {
  const [state, setState] = useState<TideAPIState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!options) {
      setState({ data: null, loading: false, error: 'Localização não disponível' });
      return;
    }

    const fetchTides = async () => {
      try {
        setState({ data: null, loading: true, error: null });

        const { latitude, longitude, date } = options;
        // Formatar a query para a rota do servidor (proxied)
        const params = new URLSearchParams({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });
        if (date) params.append('date', date);

        const response = await fetch(`${API_PROXY}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`Erro da API: ${response.status}`);
        }

        const result = await response.json();

        // A rota `/api/tides` pode retornar { tabua: {...} } ou { tides: [...] } ou { tabua: { data: [...] } }
        let tidesData: any[] = [];
        if (result.tides) tidesData = result.tides;
        else if (result.tabua && Array.isArray(result.tabua.data)) tidesData = result.tabua.data;
        else if (result.tabua && Array.isArray(result.tabua)) tidesData = result.tabua;

        setState({ data: tidesData || [], loading: false, error: null });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
        setState({
          data: null,
          loading: false,
          error: errorMsg,
        });
      }
    };

    fetchTides();
  }, [options?.latitude, options?.longitude, options?.date]);

  return state;
}
