 Regal Care Hospital with Healthcare Appointment Management System

Regal Care Hospital is a modern hosital with a responsive, and user-friendly healthcare appointment management system built using Next.js and Tailwind CSS. The platform allows patients to book appointments with doctors, check availability, and manage their healthcare interactions seamlessly.

 🌟 Features

- 📅 **Online Appointment Booking:** Patients can easily schedule appointments with available doctors.
- ✅ **Real-time Doctor Availability Check:** Prevents double-booking by checking doctor schedules before form submission.
- 🔐 **JWT Authentication:** Secure login and registration for patients with token-based authentication.
- 📂 **Dynamic Route System:** Implements nested dynamic routing in Next.js for structured page access.
- 🔧 **Admin/Doctor Management Ready (Future-ready):** Easily extendable for doctor dashboards and admin controls.
- 🎨 **Modern UI/UX:** Clean, intuitive design powered by Tailwind CSS with theme toggling options.
- 🔒 **Secure Environment Handling:** Sensitive data like database URLs and secrets are managed via `.env.local` (ignored from version control).

 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Authentication:** JSON Web Tokens (JWT)
- **Routing:** Dynamic Nested Routes with centralized content configuration
- **State Management:** React hooks
- **Version Control:** Git & GitHub

**CODE CLARIFICATION**

**In libs/Mongodb**
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongooseCache || {
  conn: null,
  promise: null,
};

let cached: { conn: ..., promise: ... }

We are defining a variable called cached, and giving it a TypeScript type.
That type is an object with two properties:

conn:
Either a Mongoose connection object (typeof mongoose)
or null if not connected yet.

promise:
Either a Promise that will eventually resolve to a Mongoose connection
or null if no connection attempt is in progress yet.

So it means:

“cached can hold an existing connection and a connection promise, or both can be null.”

⚙️ (global as any)._mongooseCache

This accesses a global variable stored on the Node.js global object.

In Node.js, global is like a storage space that lives as long as the app is running.

global._mongooseCache is a custom property that the developer adds manually.

It’s meant to store the connection info so it’s reused between requests.

We cast it to any (global as any) so TypeScript won’t complain that _mongooseCache doesn’t exist on global by default.

⚡ || { conn: null, promise: null }

This means:

“If there is no existing cache (global._mongooseCache doesn’t exist yet), then use a new empty object with both conn and promise set to null.”


**In Services/postService**

const p = new Post(payload);
  return p.save();
const p = new Post(payload)

This creates a new document in memory using the Mongoose model Post, and initializes it with the payload data.

It doesn’t save it yet — it just prepares it.

**return p.save()

This saves the post into the MongoDB collection and returns the saved document (usually as a Promise).


 🏁 Getting Started

 Prerequisites

- Node.js (v18+ recommended)
- A code editor like VS Code

 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LoveyCode/Regal-Care-Hospital.git


