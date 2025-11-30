const users = [
  {
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    fullName: "Amit Sharma",
    designation: "Software Engineer",
    description: "Amit is a full-stack developer with 5 years of experience in building scalable applications."
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    fullName: "Riya Verma",
    designation: "UI/UX Designer",
    description: "Riya is a creative designer who loves crafting modern, user-friendly interfaces."
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    fullName: "Sandeep Kumar",
    designation: "Marketing Manager",
    description: "Sandeep specializes in digital marketing and has led multiple successful campaigns."
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    fullName: "Neha Gupta",
    designation: "Data Analyst",
    description: "Neha is passionate about data science and loves solving complex analytical problems."
  },
    {
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    fullName: "Amit Sharma",
    designation: "Software Engineer",
    description: "Amit is a full-stack developer with 5 years of experience in building scalable applications."
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    fullName: "Riya Verma",
    designation: "UI/UX Designer",
    description: "Riya is a creative designer who loves crafting modern, user-friendly interfaces."
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    fullName: "Sandeep Kumar",
    designation: "Marketing Manager",
    description: "Sandeep specializes in digital marketing and has led multiple successful campaigns."
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    fullName: "Neha Gupta",
    designation: "Data Analyst",
    description: "Neha is passionate about data science and loves solving complex analytical problems."
  }
];

let clutter = ""
users.forEach(function(elem){
    
    clutter += `<div class="card">
            <img src="${elem.image}" alt="">
            <h1>${elem.fullName}</h1>
            <h2>${elem.designation}</h2>
            <p>${elem.description}</p>
        </div>`
    
})

document.querySelector("main").innerHTML = clutter
