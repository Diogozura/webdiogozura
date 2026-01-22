import { useEffect, useState } from 'react';

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  city?: string;
  country?: string;
}

export interface GeolocationState {
  location: Location | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation(): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'Geolocalização não suportada neste navegador',
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setState({
        location: { latitude, longitude, accuracy },
        loading: false,
        error: null,
      });
    };

    const error = (err: GeolocationPositionError) => {
      let errorMsg = 'Erro ao obter localização';
      if (err.code === 1) {
        errorMsg = 'Permissão de localização negada';
      } else if (err.code === 2) {
        errorMsg = 'Localização indisponível';
      } else if (err.code === 3) {
        errorMsg = 'Tempo limite excedido';
      }
      setState({
        location: null,
        loading: false,
        error: errorMsg,
      });
    };

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  return state;
}
