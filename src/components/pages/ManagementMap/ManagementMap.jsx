// import React, { useEffect, useState } from "react";
// import "./ManagementMap.css";
// import { Fab } from "@mui/material";
// import PolylineIcon from "@mui/icons-material/Polyline";
// import ConstructionIcon from "@mui/icons-material/Construction";
// import HistoryIcon from "@mui/icons-material/History";
// import Map from "../../map/Map";
// import NewSite from "../../../forms/NewSite/NewSite";
// import NewEquipment from "../../../forms/NewEquipment/NewEquipment";

// const ManagementMap = (props) => {
//   const [sites, setSites] = useState([]);
//   const [isNewSiteFormOpen, setIsNewSiteFormOpen] = useState(false);
//   const [isNewEquipmentFormOpen, setIsNewEquipmentFormOpen] = useState(false);

//   const addArea = () => {
//     console.log("add area");
//   };

//   const openNewSiteForm = () => {
//     setIsNewSiteFormOpen(true);
//   };

//   const closeNewSiteForm = () => {
//     setIsNewSiteFormOpen(false);
//   };

//   const openNewEquipmentForm = () => {
//     setIsNewEquipmentFormOpen(true);
//   };

//   const closeNewEquipmentForm = () => {
//     setIsNewEquipmentFormOpen(false);
//   };

//   const addSite = (newSite) => {
//     setSites((prevSites) => [...prevSites, newSite]);
//   };

//   const addEquipment = (newEquipment) => {
//     console.log("Equipment to add is:", newEquipment);
//   };

//   useEffect(() => {
//     const mockSites = [
//       {
//         siteName: "Site 1",
//         siteDescription: "Description for Site 1",
//         sitePolygonPoints: [
//           [32.0231, 34.7749],
//           [32.0223, 34.7801],
//           [32.0184, 34.7797],
//           [32.0186, 34.7733],
//         ],
//         siteMarkers: [
//           {
//             markerName: "Marker 1",
//             markerPoints: [32.0212, 34.7776],
//           },
//           {
//             markerName: "Marker 2",
//             markerPoints: [32.0202, 34.7753],
//           },
//         ],
//       },
//       {
//         siteName: "Site 2",
//         siteDescription: "Description for Site 2",
//         sitePolygonPoints: [
//           [32.0225, 34.7648],
//           [32.0211, 34.7676],
//           [32.0194, 34.7659],
//           [32.0209, 34.763],
//         ],
//         siteMarkers: [
//           {
//             markerName: "Marker 3",
//             markerPoints: [32.021, 34.766],
//           },
//         ],
//       },
//     ];

//     setSites(mockSites);
//   }, []);

//   return (
//     <div className="task-container">
//       <Map sites={sites} />
//       {/* <NewSite
//         isOpen={isNewSiteFormOpen}
//         closeForm={closeNewSiteForm}
//         addSite={addSite}
//       />
//       <NewEquipment
//         isOpen={isNewEquipmentFormOpen}
//         closeForm={closeNewEquipmentForm}
//         addEquipment={addEquipment}
//         allSites={sites}
//       /> */}
//       <div className="floating-actions">
//         <Fab
//           color="primary"
//           aria-label="add"
//           className="floating-button"
//           onClick={openNewSiteForm}
//         >
//           <PolylineIcon />
//         </Fab>
//         <Fab
//           color="primary"
//           aria-label="add"
//           className="floating-button"
//           onClick={openNewEquipmentForm}
//         >
//           <ConstructionIcon />
//         </Fab>
//         <Fab
//           color="primary"
//           aria-label="add"
//           className="floating-button"
//           onClick={addArea}
//         >
//           <HistoryIcon />
//         </Fab>
//       </div>
//     </div>
//   );
// };

// export default ManagementMap;

import React, { useState, useEffect } from "react";
import "./ManagementMap.css";
import Map from "../../map/Map";
import NewSite from "../../../forms/NewSite/NewSite";

import { Fab, Modal } from "@mui/material";
import PolylineIcon from "@mui/icons-material/Polyline";
import ConstructionIcon from "@mui/icons-material/Construction";

const ManagementMap = () => {
  const [sites, setSites] = useState([]);
  const [isNewSiteFormOpen, setIsNewSiteFormOpen] = useState(true);
  const [isNewEquipmentFormOpen, setIsNewEquipmentFormOpen] = useState(false);

  useEffect(() => {
    const mockSites = [
      {
        siteName: "Site 1",
        siteDescription: "Description for Site 1",
        sitePolygonPoints: [
          [32.0231, 34.7749],
          [32.0223, 34.7801],
          [32.0184, 34.7797],
          [32.0186, 34.7733],
        ],
        siteMarkers: [
          {
            markerName: "Marker 1",
            markerPoints: [32.0212, 34.7776],
          },
          {
            markerName: "Marker 2",
            markerPoints: [32.0202, 34.7753],
          },
        ],
      },
      {
        siteName: "Site 2",
        siteDescription: "Description for Site 2",
        sitePolygonPoints: [
          [32.0225, 34.7648],
          [32.0211, 34.7676],
          [32.0194, 34.7659],
          [32.0209, 34.763],
        ],
        siteMarkers: [
          {
            markerName: "Marker 3",
            markerPoints: [32.021, 34.766],
          },
        ],
      },
    ];

    setSites(mockSites);
  }, []);

  const openNewSiteForm = () => {
    setIsNewSiteFormOpen(true);
  };

  const closeNewSiteForm = () => {
    setIsNewSiteFormOpen(false);
  };

  const openNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(true);
  };

  const closeNewEquipmentForm = () => {
    setIsNewEquipmentFormOpen(false);
  };

  const handleSaveNewSite = (newSiteData) => {
    // Perform necessary actions with the new site data
    console.log("New Site Data:", newSiteData);
    // Add the new site to the existing sites list
    setSites((prevSites) => [...prevSites, newSiteData]);
  };

  return (
    <div className="task-container">
      <Map sites={sites} />
      <div className="floating-actions">
        <Fab color="primary" aria-label="add" onClick={openNewSiteForm}>
          <PolylineIcon />
        </Fab>
        <Fab color="secondary" aria-label="edit" onClick={openNewEquipmentForm}>
          <ConstructionIcon />
        </Fab>
      </div>
      {/* <NewSite open={isNewSiteFormOpen} onClose={closeNewSiteForm} onSave={handleSaveNewSite} /> */}

      <Modal open={isNewEquipmentFormOpen} onClose={closeNewEquipmentForm}>
        <div>
          <h2>Edit Modal</h2>
        </div>
      </Modal>
    </div>
  );
};

export default ManagementMap;
