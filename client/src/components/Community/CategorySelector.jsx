// import React, { useState } from "react";
// import { TextField, MenuItem, Box } from "@mui/material";

// const categories = {
//   Academic: [
//     // School
//     "Class 7",
//     "Class 8",
//     "Class 9",
//     "Class 10",
//     "Class 11",
//     "Class 12",

//     // Undergraduate Degrees
//     "BA",
//     "B.Sc",
//     "B.Com",
//     "BCA",
//     "B.Tech",
//     "BBA",
//     "LLB",
//     "BVSc",
//     "B.Pharm",
//     "B.Des",

//     // Postgraduate Degrees
//     "MA",
//     "M.Sc",
//     "M.Com",
//     "MBA",
//     "MCA",
//     "M.Tech",
//     "LLM",
//     "M.Pharm",
//     "M.Des",
//     "PH.D",
//     "Others"
//   ],

//   "Competitive Exams": [
//     "UPSC",
//     "SSC",
//     "Banking",
//     "Railway",
//     "NDA",
//     "CDS",
//     "JEE",
//     "NEET",
//     "GATE",
//     "CAT",
//     "Others",
//   ],
//   Coding: [
//   // Low-level / classic

//   "C",
//   "C++",
//   "C#",
//   "Java",
//   "Python",
//   "Go",
//   "Rust",
//   "Ruby",
//   "Swift",
//   "Kotlin",
//   "PHP",
  
//   // Web / Frontend
//   "Backend",
//   "Frontend",
//   "Full Stack",
//   "Frame Work",
//   "App Development",
//   "JavaScript",
//   "TypeScript",
//   "HTML",
//   "CSS",
//   "React",
//   "Angular",
//   "Vue.js",
//   "Svelte",
  
//   // Backend / Server
//   "Node.js",
//   "Express.js",
//   "Django",
//   "Flask",
//   "Spring Boot",
//   "Laravel",
//   "Ruby on Rails",
  
//   // Databases / Query
//   "SQL",
//   "MySQL",
//   "PostgreSQL",
//   "MongoDB",
//   "Firebase",
  
//   // Mobile / App Development
//   "React Native",
//   "Flutter",
//   "SwiftUI",
//   "Jetpack Compose",
  
//   // Others / Misc
//   "MATLAB",
//   "R",
//   "Perl",
//   "Scala",
//   "Assembly",
//   "Others"
// ],

//   "General Studies": [
//     "Communication Skills",
//     "Grammar",
//     "Aptitude",
//     "Interview Prep",
//     "Personality Development",
//     "Cheat Sheets",
//     "Others"
//   ],
//  Others: [
//   "Uncategorized",
//   "Other Notes",
//   "Reference Material",
//   "Miscellaneous",
// ],
// };

// export default function CategorySelector({ category, subCategory, setCategory, setSubCategory }) {
//   const handleCategoryChange = (e) => {
//     setCategory(e.target.value);
//     setSubCategory(""); // reset subcategory on change
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//   {/* Main Category Dropdown */}
//   <TextField
//     select
//     label="Category"
//     value={category}
//     onChange={handleCategoryChange}
//     fullWidth
//     variant="filled"
//     SelectProps={{
//       MenuProps: {
//         PaperProps: {
//           style: {
//             maxHeight: window.innerHeight * 0.4, // 40% of screen height
//             width: 250, // optional
//           },
//         },
//       },
//     }}
//   >
//     {Object.keys(categories).map((cat) => (
//       <MenuItem key={cat} value={cat}>
//         {cat}
//       </MenuItem>
//     ))}
//   </TextField>

//   {/* Subcategory Dropdown (only if main category chosen) */}
//   {category && categories[category].length > 0 && (
//     <TextField
//       select
//       label="Sub Category"
//       value={subCategory}
//       onChange={(e) => setSubCategory(e.target.value)}
//       fullWidth
//       variant="filled"
//       SelectProps={{
//         MenuProps: {
//           PaperProps: {
//             style: {
//               maxHeight: window.innerHeight * 0.4, // responsive scrollable height
//               width: 250, // optional
//             },
//           },
//         },
//       }}
//     >
//       {categories[category].map((sub) => (
//         <MenuItem key={sub} value={sub}>
//           {sub}
//         </MenuItem>
//       ))}
//     </TextField>
//   )}
// </Box>

//   );
// }













import React, { useState } from "react";
import { TextField, MenuItem, Box, ListItemIcon } from "@mui/material";

// Import icons
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CodeIcon from "@mui/icons-material/Code";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const categories = {
  Academic: [
    "Class 7","Class 8","Class 9","Class 10","Class 11","Class 12",
    "BA","B.Sc","B.Com","BCA","B.Tech","BBA","LLB","BVSc","B.Pharm","B.Des",
    "MA","M.Sc","M.Com","MBA","MCA","M.Tech","LLM","M.Pharm","M.Des","PH.D","Others"
  ],
  "Competitive Exams": [
    "UPSC","SSC","Banking","Railway","NDA","CDS","JEE","NEET","GATE","CAT","Others"
  ],
  Coding: [
    "C","C++","C#","Java","Python","Go","Rust","Ruby","Swift","Kotlin","PHP",
    "Backend","Frontend","Full Stack","Frame Work","App Development",
    "JavaScript","TypeScript","HTML","CSS","React","Angular","Vue.js","Svelte",
    "Node.js","Express.js","Django","Flask","Spring Boot","Laravel","Ruby on Rails",
    "SQL","MySQL","PostgreSQL","MongoDB","Firebase",
    "React Native","Flutter","SwiftUI","Jetpack Compose",
    "MATLAB","R","Perl","Scala","Assembly","Others"
  ],
  "General Studies": [
    "Communication Skills","Grammar","Aptitude","Interview Prep",
    "Personality Development","Cheat Sheets","Others"
  ],
  Others: [
    "Uncategorized","Other Notes","Reference Material","Miscellaneous"
  ],
};

// Icons mapping
const categoryIcons = {
  Academic: <SchoolIcon fontSize="small" />,
  "Competitive Exams": <EmojiEventsIcon fontSize="small" />,
  Coding: <CodeIcon fontSize="small" />,
  "General Studies": <MenuBookIcon fontSize="small" />,
  Others: <MoreHorizIcon fontSize="small" />,
};

export default function CategorySelector({ category, subCategory, setCategory, setSubCategory }) {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(""); // reset subcategory on change
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Main Category Dropdown */}
      <TextField
        select
        label="Category"
        value={category}
        onChange={handleCategoryChange}
        fullWidth
        variant="filled"
        SelectProps={{
          MenuProps: {
            PaperProps: {
              style: {
                maxHeight: window.innerHeight * 0.4,
                width: 250,
              },
            },
          },
        }}
      >
        {Object.keys(categories).map((cat) => (
          <MenuItem key={cat} value={cat}>
            <ListItemIcon>
              {categoryIcons[cat]}
            </ListItemIcon>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      {/* Subcategory Dropdown */}
      {category && categories[category].length > 0 && (
        <TextField
          select
          label="Sub Category"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          fullWidth
          variant="filled"
          SelectProps={{
            MenuProps: {
              PaperProps: {
                style: {
                  maxHeight: window.innerHeight * 0.4,
                  width: 250,
                },
              },
            },
          }}
        >
          {categories[category].map((sub) => (
            <MenuItem key={sub} value={sub}>
              {sub}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
}
