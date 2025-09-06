import React, { useEffect, useRef } from 'react';
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
}

const JobMap: React.FC<JobMapProps> = ({ jobs, onJobSelect, selectedJobId }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});
  const popups = useRef<{ [key: string]: mapboxgl.Popup }>({});

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGFvZHV5bG9uZyIsImEiOiJjbTl5ZTQwb2cwOWw3MmpzaG5mcHE3bmszIn0.ZGTA5pi7Cp8XsHqouMkO5A';
    
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

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: osmStyle,
      zoom: 11,
      center: [106.6966, 10.7769],
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Suppress benign abort errors from tile requests when panning/zooming
    map.current.on('error', (e: any) => {
      const name = e?.error?.name || '';
      const message = e?.error?.message || '';
      if (/AbortError/i.test(name) || /aborted/i.test(message)) {
        e.preventDefault?.();
      }
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};

    // Add markers for each job
    jobs.forEach(job => {
      const markerElement = document.createElement('div');
      markerElement.className = `w-8 h-8 rounded-full cursor-pointer border-2 border-white shadow-lg ${
        selectedJobId === job.id
          ? 'bg-job-marker-hover'
          : 'bg-job-marker'
      }`;
      
      // Add company initial or job type indicator
      markerElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-xs font-bold">${
        job.company.charAt(0).toUpperCase()
      }</div>`;

      markerElement.addEventListener('click', () => {
        onJobSelect(job);
      });

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat(job.coordinates)
        .addTo(map.current!);

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
  }, [jobs, onJobSelect, selectedJobId]);

  // Fly to selected job location
  useEffect(() => {
    if (selectedJobId && map.current) {
      const selectedJob = jobs.find(job => job.id === selectedJobId);
      if (selectedJob) {
        map.current.flyTo({
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
      }
    }
  }, [selectedJobId, jobs]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default JobMap;
