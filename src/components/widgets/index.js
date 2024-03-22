import React, { useState, useEffect } from "react";
import "../widgets/widget.css";
import apiClient from "../../utils/spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    if (artistID) {
      apiClient
        .get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          console.log("Similar Artists:", res.data);
          const a = res.data?.artists.slice(0, 3);
          setSimilar(a);
        })
        .catch((err) => console.error("Error fetching similar artists:", err));

      apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          console.log("Featured Playlists:", res.data);
          const a = res.data?.playlists?.items.slice(0, 3); // <- corrected here
          setFeatured(a);
        })
        .catch((err) => console.error("Error fetching featured playlists:", err));

      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          console.log("New Releases:", res.data);
          const a = res.data?.albums?.items.slice(0, 3); // <- corrected here
          setNewRelease(a);
        })
        .catch((err) => console.error("Error fetching new releases:", err));
    }
  }, [artistID]);

  return (
    <div className="widgets-body flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="Made For You" featured={featured} />
      <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  );
}
