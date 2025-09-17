import React, { useEffect, useRef, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Job {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  coordinates: [number, number];
  type: string;
}

interface JobMapProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  selectedJobId?: string;
  getMetric?: (job: Job) => number; // optional metric (e.g., views) used to scale marker size
  metricLabel?: string;
  showLegend?: boolean;
}

const JobMap: React.FC<JobMapProps> = ({ jobs, onJobSelect, selectedJobId, getMetric, metricLabel = 'Views', showLegend = false }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const popups = useRef<{ [key: string]: mapboxgl.Popup }>({});

  const metrics = useMemo(() => {
    if (!getMetric) return null;
    const values = jobs.map(j => getMetric(j));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const byId: Record<string, number> = {};
    jobs.forEach((j, i) => { byId[j.id] = values[i]; });
    return { min, max, byId };
  }, [jobs, getMetric]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map using OSM raster tiles (no Mapbox token required)
    const osmStyle = {
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
      layers: [
        { id: 'osm', type: 'raster', source: 'osm' }
      ]
    } as any;

    const m = new mapboxgl.Map({
      container: mapContainer.current,
      style: osmStyle,
      zoom: 11,
      center: [106.6966, 10.7769],
    });
    map.current = m;

    // Add navigation controls
    m.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Suppress benign abort errors from tile requests when panning/zooming
    const onError = (e: any) => {
      const name = e?.error?.name || '';
      const message = e?.error?.message || '';
      if (/AbortError/i.test(name) || /aborted/i.test(message) || /The operation was aborted/i.test(message) || /signal is aborted without reason/i.test(message)) {
        e.preventDefault?.();
      }
    };
    m.on('error', onError);

    // Cleanup function
    return () => {
      // Remove popups and markers explicitly before tearing down the map
      Object.values(popups.current).forEach(p => p.remove());
      Object.values(markers.current).forEach(marker => marker.remove());
      markers.current = {};
      popups.current = {};

      if (map.current) {
        map.current.off('error', onError);
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const m = map.current;
    if (!m) return;

    const addMarkers = () => {
      // Clear existing markers
      Object.values(markers.current).forEach(marker => marker.remove());
      markers.current = {};
      Object.values(popups.current).forEach(p => p.remove());
      popups.current = {};

      // Add markers for each job
      jobs.forEach(job => {
        const markerElement = document.createElement('div');

        // Compute size by metric when provided
        const base = 28; // default diameter
        let diameter = base;
        let titleContent = job.company.charAt(0).toUpperCase();
        let metricVal: number | undefined;
        if (metrics) {
          metricVal = metrics.byId[job.id];
          const { min, max } = metrics;
          const minD = 16, maxD = 44;
          const span = Math.max(1, max - min);
          diameter = Math.round(minD + ((metricVal - min) / span) * (maxD - minD));
          titleContent = String(metricVal);
        }

        markerElement.className = `rounded-full cursor-pointer border-2 border-white shadow-lg ${
          selectedJobId === job.id
            ? 'bg-job-marker-hover'
            : 'bg-job-marker'
        }`;
        markerElement.style.width = `${diameter}px`;
        markerElement.style.height = `${diameter}px`;

        // Add label
        markerElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-[10px] font-bold">${titleContent}</div>`;

        markerElement.addEventListener('click', () => {
          onJobSelect(job);
        });

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(job.coordinates)
          .addTo(m);

        // Add popup on hover
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          closeOnClick: false
        }).setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${job.title}</h3>
            <p class="text-xs text-muted-foreground">${job.company}</p>
            <p class="text-xs font-medium text-primary">${job.salary}</p>
            ${metrics ? `<p class='text-[11px] mt-1'>${metricLabel}: <span class='font-semibold'>${metrics.byId[job.id]}</span></p>` : ''}
          </div>
        `);

        markerElement.addEventListener('mouseenter', () => {
          marker.setPopup(popup).togglePopup();
        });

        markerElement.addEventListener('mouseleave', () => {
          popup.remove();
        });

        markers.current[job.id] = marker;
        popups.current[job.id] = popup;
      });
    };

    if (m.isStyleLoaded()) {
      addMarkers();
    } else {
      m.once('load', addMarkers);
      return () => {
        m.off('load', addMarkers);
      };
    }
  }, [jobs, onJobSelect, selectedJobId, metrics, metricLabel]);

  // Fly to selected job location
  useEffect(() => {
    const m = map.current;
    if (!selectedJobId || !m) return;

    const selectedJob = jobs.find(job => job.id === selectedJobId);
    if (!selectedJob) return;

    const fly = () => {
      m.flyTo({
        center: selectedJob.coordinates,
        zoom: 14,
        duration: 800,
        essential: true
      });
      Object.values(popups.current).forEach(p => p.remove());
      const marker = markers.current[selectedJob.id];
      const popup = popups.current[selectedJob.id];
      if (marker && popup) {
        marker.setPopup(popup);
        marker.togglePopup();
      }
    };

    if (m.isStyleLoaded()) {
      fly();
    } else {
      m.once('load', fly);
      return () => m.off('load', fly);
    }
  }, [selectedJobId, jobs]);

  return (
    <div className="relative w-full h-full">
      {metrics && showLegend && (
        <div className="absolute left-2 top-2 z-10 rounded-md border bg-card/90 backdrop-blur p-2 text-[11px]">
          <div className="font-medium mb-1">{metricLabel}</div>
          <div className="flex items-end gap-2">
            <div className="bg-[hsl(var(--job-marker))] rounded-full" style={{ width: 12, height: 12 }} />
            <div className="bg-[hsl(var(--job-marker))] rounded-full" style={{ width: 22, height: 22 }} />
            <div className="bg-[hsl(var(--job-marker))] rounded-full" style={{ width: 36, height: 36 }} />
          </div>
          <div className="mt-1 flex justify-between text-muted-foreground">
            <span>Thấp</span><span>Cao</span>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default JobMap;
