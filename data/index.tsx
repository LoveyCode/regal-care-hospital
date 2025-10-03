type Advisor = {
  name: string;
  title: string;
  image: string;
  description: string;
};

type GalleryItem = {
  image: string;
  department: string;
  caption: string;
};

export const galleryItems: GalleryItem[] = [
  {
    image: '/gallery1.jpg',
    department: 'General Outpatient',
    caption: 'Consultation with our general physician.',
  },
  {
    image: '/gallery2.jpg',
    department: 'Surgical Services',
    caption: 'Team performing a laparoscopic surgery.',
  },
  {
    image: '/gallery3.jpg',
    department: 'Maternity Ward',
    caption: 'Newborn care provided by our nurses.',
  },
  {
    image: '/gallery4.jpg',
    department: 'Orthopedic Unit',
    caption: 'Joint rehabilitation session in progress.',
  },
  {
    image: '/gallery5.jpg',
    department: 'Diagnostic Imaging',
    caption: 'Ultrasound scan in the radiology unit.',
  },
  {
    image: '/gallery6.jpg',
    department: 'Pharmacy',
    caption: 'Pharmacists dispensing medication.',
  },
  {
    image: '/gallery7.jpg',
    department: 'Emergency Unit',
    caption: 'Doctors attending to an emergency case.',
  },
  {
    image: '/gallery8.jpg',
    department: 'Childbirth Services',
    caption: 'Mother receiving post-natal care.',
  },
  {
    image: '/gallery9.jpg',
    department: 'Consultation Room',
    caption: 'Patient review with consultant.',
  },
  {
    image: '/gallery10.jpg',
    department: 'Surgical Prep Room',
    caption: 'Preparing patient for surgery.',
  },
  {
    image: '/gallery11.jpg',
    department: 'Dialysis Unit',
    caption: 'Patient undergoing dialysis session.',
  },
  {
    image: '/gallery12.jpg',
    department: 'Pediatric Unit',
    caption: 'Routine check-up for a child.',
  },
  {
    image: '/gallery13.jpg',
    department: 'Reception',
    caption: 'Welcoming patients at the front desk.',
  },
  {
    image: '/gallery14.jpg',
    department: 'Lab Services',
    caption: 'Blood samples being analyzed.',
  },
  {
    image: '/gallery15.jpg',
    department: 'Vaccination Centre',
    caption: 'Administering childhood immunizations.',
  },
  {
    image: '/gallery16.jpg',
    department: 'Ward Rounds',
    caption: 'Doctors conducting early morning rounds.',
  },
];

export const advisors: Advisor[] = [
  {
    name: 'Dr. Henry Okwara',
    title: 'Senior Medical Advisor',
    image: '/assets/images/senior-medical-advisor.jpeg',
    description:
      'Dr. Okwara has over 25 years of experience in clinical research and hospital management. He has led numerous public health campaigns across West Africa and served on international medical boards.',
  },
  {
    name: 'Prof. Brusi Filo',
    title: 'Board Advisor, Medical Education',
    image: '/assets/images/board-advisor-medical-education.jpeg',
    description:
      'Prof. Filo is an award-winning academic, a WHO consultant, and former Dean of the College of Medicine. She has mentored over 300 medical professionals and published extensively in global journals.',
  },

{
  name: 'Dr. Amaka Jalamida',
  title: 'Advisor, Pediatric & Family Medicine',
  image: '/assets/images/Advisor-pediatric-family-medicine.jpeg',
  description:
    'Dr. Jalamida is a seasoned pediatrician with over 15 years of experience in child and adolescent health. She has led immunization drives, early childhood development programs, and continues to advocate for family-centered care across Nigeria.',
},
{
  name: 'Dr. Joseph Ziko',
  title: 'Advisor, Mental Health & Wellness',
  image: '/assets/images/Advisor-mental-health-wellness.jpeg',
  description:
    'Dr. ZIko is a psychiatrist and mental health strategist passionate about destigmatizing mental illness in Africa. He has developed national mental health frameworks and leads training sessions for trauma-informed care.',
},
{
  name: 'Matron Indana Ivan',
  title: 'Advisor, Nursing Leadership & Practice',
  image: '/assets/images/Advisor-nursing-leadership-practice.jpeg',
  description:
    'Matron Ivan is a veteran nurse leader with three decades of frontline experience. She has trained over 500 nurses in clinical excellence and ethical practice, and consults on strengthening nursing systems in healthcare institutions.',
}


];

export const hospitals = [
    {
      id: 1,
      name: "Evercare Medical",
      img: "/hospital1.png",
  
    },
    {
      id: 2,
      name: "Center Harmony General Hospital",
      img: "/hospital2.png",
   
    },
    {
      id: 3,
      name: "Starlight Health",
      img: "/hospital3.png",

    },
    {
      id: 4,
      name: "GreenFeild",
      img: "/hospital4.png",
   
    },
    {
      id: 5,
      name: "Cedar Valley Hospital.",
      img: "/hospital5.png",

    },
    {
        id: 6,
        name: "Novacare.",
        img: "/hospital6.png",
    
      },
  ];
  
  export const heroImages = [
    {
    id: 1,
    src: "/assets/images/bg1.jpg",
    alt: "Hero image 2",

    },

    {
      id: 2,
      src: "/assets/images/bg2.jpg",
      alt: "Hero image 1",

      },

      {
        id: 3,
        src: "/assets/images/bgThree.jpg",
        alt: "Hero image 3",
     
        },

         {
            id: 5,
            src: "/assets/images/bg5.jpg",
            alt: "Hero image 5",
     
            },

        {
          id: 4,
          src: "/assets/images/bgFour.jpg",
          alt: "Hero image 4",
   
          },

         
  ]

  export const socialMediaIcons = [
    {
      id: 1,
      src: "/assets/icons/facebook.png",
      alt: "Facebook Icon",
      link: "https://www.facebook.com/yourpage"
    },
    {
      id: 2,
      src: "/assets/icons/Instagram.png",
      alt: "Instagram Icon",
      link: "https://www.instagram.com/yourpage"
    },
    {
      id: 3,
      src: "/assets/icons/LinkedIn.png",
      alt: "LinkedIn Icon",
      link: "https://www.linkedin.com/in/yourprofile"
    },
    {
      id: 4,
      src: "/assets/icons/whatsappp.png",
      alt: "Whatsapp Icon",
      link: "https://wa.me/yourphonenumber"
    },
    {
      id: 5,
      src: "/assets/icons/X.png",
      alt: "X Icon",
      link: "https://x.com/yourhandle"
    },
    {
      id: 6,
      src: "/assets/icons/youtube.png",
      alt: "Youtube Icon",
      link: "https://www.youtube.com/yourchannel"
    }
  ];
  

  export const servicesImages = [
    {
      id: 1,
      src: "/assets/images/DailyRoutineCheckup.jpg",
      alt: "Routine Check Up",
      serviceName: "General Outpatient Consultation",
      link: "https://www.facebook.com/yourpage",
      description: "General Outpatient Consultation provides patients with access to routine medical care, diagnosis, and treatment for a wide range of health concerns without the need for hospital admission. It’s your first step toward expert medical advice and personalized care."
    },
    {
      id: 2,
      src: "/assets/images/KidneyTransplant.png",
      alt: "Kidney Transplant",
      serviceName: "Surgical Services",
      link: "https://www.instagram.com/yourpage",
      description: "At Regal Care, our Kidney Transplant service provides a life-changing solution for patients with advanced kidney failure. We offer expert care throughout the transplant journey from evaluation and donor matching to surgery and post-operative support."
    },
    {
      id: 3,
      src: "/assets/images/Prenatal-care.jpg",
      alt: "Prenatal Care",
      serviceName: "Maternity & Childbirth Services",
      link: "https://www.linkedin.com/in/yourprofile",
      description: "At Regal Care, our Maternity & Childbirth Services are designed to support mothers and their babies with compassion, expertise, and personalized care. From prenatal checkups to safe delivery and postnatal support, our dedicated team ensures a smooth and reassuring journey through pregnancy and childbirth."
    },
    {
      id: 4,
      src: "/assets/images/OrthopedicsTrauma.jpg",
      alt: "Orthopedics Trauma",
      serviceName: "Orthopedic & Trauma Surgery Services",
      link: "https://wa.me/yourphonenumber",
      description: "At Regal Care, our Orthopedic & Trauma Surgery Services provide expert care for patients with bone, joint, and musculoskeletal injuries. Whether it’s a fracture, dislocation, or complex trauma, our skilled orthopedic surgeons use advanced surgical techniques and rehabilitation plans to restore mobility and improve quality of life. "
    },
    {
      id: 5,
      src: "/assets/images/X-Ray.jpg",
      alt: "X-Ray",
      serviceName: "Diagnostic Imaging Services",
      link: "https://x.com/yourhandle",
      description: "General Outpatient Consultation provides patients with access to routine medical care, diagnosis, and treatment for a wide range of health concerns—without the need for hospital admission. It’s your first step toward expert medical advice and personalized care."
    },
    {
      id: 6,
      src: "/assets/images/pharmacy.jpg",
      alt: "Pharmacy",
      serviceName: "Pharmacy",
      link: "https://www.youtube.com/yourchannel",
      description: "At Regal Care, our Diagnostic Imaging Services offer advanced, non-invasive tools to accurately detect and monitor a wide range of medical conditions. Using state-of-the-art equipment such as ultrasound, X-ray, CT scans, and MRI, our experienced radiology team delivers fast, precise results to support early diagnosis and effective treatment planning."
    }
  ];


  export const testimonials = [
    {
      quote:
        "Choosing Regal Care Hospital was the best decision for my family. The doctors are attentive, and the staff makes you feel genuinely cared for. I wouldn’t trust our health to anyone else.",
      name: "Mrs. Ifeoma Chukwu",
      title: "Mother & Entrepreneur",
    },
    {
      quote:
        "From diagnosis to recovery, the experience at Regal Care was seamless. Their team of specialists handled my surgery with such confidence and compassion. I'm grateful for the care I received.",
      name: "David Ayodele",
      title: "Civil Engineer",
    },
    {
      quote:
        "What impressed me most was the coordination between departments — it felt like everyone was working together just for me. Regal Care lives up to its name.",
      name: "Fatima Bello",
      title: "Lecturer, University of Lagos",
    },
    {
      quote:
        "As someone managing a chronic condition, I value consistent, quality care. Regal Care Hospital has never let me down — their dedication is unmatched.",
      name: "Chinedu Okeke",
      title: "Software Developer",
    },
    {
      quote:
        "The facilities are clean, modern, and equipped with cutting-edge technology. But it’s the human touch — the empathy — that sets Regal Care apart.",
      name: "Elizabeth Udo",
      title: "Fashion Designer",
    },
    {
      quote:
        "My wife and I welcomed our baby at Regal Care and the maternity team made the entire process stress-free and joyful. Thank you for making that special moment even more memorable.",
      name: "Abdul-Rahman Yusuf",
      title: "Photographer",
    },
    {
      quote:
        "I was anxious about undergoing a medical procedure, but the calm professionalism at Regal Care gave me total peace of mind. They treat you like family.",
      name: "Gloria Eze",
      title: "HR Consultant",
    }
  ];
  
  