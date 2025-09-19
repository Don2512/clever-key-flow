import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface LocationValue {
  lng: number;
  lat: number;
  address?: string;
}

interface LocationPickerProps {
  value?: LocationValue | null;
  onChange: (value: LocationValue) => void;
  height?: number | string;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGFvZHV5bG9uZyIsImEiOiJjbTl5ZTQwb2cwOWw3MmpzaG5mcHE3bmszIn0.ZGTA5pi7Cp8XsHqouMkO5A';

const DEFAULT_CENTER: [number, number] = [106.6966, 10.7769];

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, height = 420 }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<LocationValue | null>(value ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const style = useMemo(() => ({
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: [
          'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
  } as any), []);

  useEffect(() => {
    if (!mapContainer.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    const center = value ? [value.lng, value.lat] as [number, number] : DEFAULT_CENTER;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      zoom: value ? 13 : 11,
      center,
    });
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.on('error', (e: any) => {
      const name = e?.error?.name || '';
      const message = e?.error?.message || '';
      if (/AbortError/i.test(name) || /aborted/i.test(message)) {
        e.preventDefault?.();
      }
    });

    map.on('click', (e) => {
      placeMarker(e.lngLat.lng, e.lngLat.lat, true);
    });

    if (value) {
      placeMarker(value.lng, value.lat, false);
    }

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reverseGeocode = useCallback(async (lng: number, lat: number) => {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=vi`;
      const resp = await fetch(url);
      const data = await resp.json();
      const address = data?.features?.[0]?.place_name as string | undefined;
      return address;
    } catch {
      return undefined;
    }
  }, []);

  const forwardGeocode = useCallback(async (query: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&country=VN&types=address,place,locality,neighborhood&language=vi&limit=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    const f = data?.features?.[0];
    if (!f) return null;
    const [lng, lat] = f.center as [number, number];
    return { lng, lat, address: f.place_name as string } as LocationValue;
  }, []);

  const placeMarker = useCallback(async (lng: number, lat: number, doReverse: boolean) => {
    if (!mapRef.current) return;
    if (!markerRef.current) {
      markerRef.current = new mapboxgl.Marker({ color: '#2563eb' }).setLngLat([lng, lat]).addTo(mapRef.current);
    } else {
      markerRef.current.setLngLat([lng, lat]);
    }
    mapRef.current.flyTo({ center: [lng, lat], zoom: 14, duration: 600 });

    let address: string | undefined = selected?.address;
    if (doReverse) {
      address = await reverseGeocode(lng, lat);
    }
    const loc: LocationValue = { lng, lat, address };
    setSelected(loc);
    onChange(loc);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, reverseGeocode, selected?.address]);

  const onSearch = async () => {
    if (!search.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const res = await forwardGeocode(search.trim());
      if (!res) {
        setError('Không tìm thấy địa chỉ phù hợp');
        return;
      }
      setSelected(res);
      onChange(res);
      if (mapRef.current) {
        placeMarker(res.lng, res.lat, false);
      }
    } catch (e) {
      setError('Có lỗi xảy ra khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-3">
        <Input
          placeholder="Nhập địa chỉ hoặc địa danh..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />
        <Button onClick={onSearch} disabled={loading}>{loading ? 'Đang tìm...' : 'Tìm'}</Button>
      </div>
      {error && <div className="text-sm text-destructive mb-2">{error}</div>}
      <div ref={mapContainer} style={{ height }} className="w-full rounded-md overflow-hidden border" />
      {selected && (
        <div className="mt-3 text-sm text-muted-foreground">
          <div><span className="font-medium text-foreground">Đã chọn:</span> {selected.address || `${selected.lat.toFixed(6)}, ${selected.lng.toFixed(6)}`}</div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
