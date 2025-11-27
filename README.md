# 🏥 Regal Care Hospital – Modern Healthcare & Content Management Platform

A full-stack, production-ready **Healthcare Appointment Management + Blog Publishing System**, engineered with **Next.js App Router**, **Appwrite**, **MongoDB**, **Tailwind CSS**, and industry-standard patterns.

This project demonstrates strong skills in **scalable system design**, **authentication**, **performance optimization**, **API-driven architectures**, and **enterprise-grade UI/UX**.

---

## 🌟 **Core Features**

### 🧑‍⚕️ **Healthcare Appointment Management System**

A robust workflow that supports both patients and administrators.

#### ✅ **Appointment Booking**

* Patients can securely book appointments with their preferred doctor.
* Automatic prevention of **double-booking** via pre-submit availability checks.
* Doctors receive clean, structured appointment data for faster processing.

#### ⏱ **Real-time Doctor Availability**

* Built-in logic to ensure a doctor cannot be booked twice at the same time.
* Implemented at **form-level** for the best user experience.
* Uses Appwrite + API endpoints for instant validation.

#### 🔐 **Secure Patient Authentication**

* Token-based auth with **JWT** + server-side protection.
* Session validation handled via `/dashboard/auth/verify`.
* Hardened against unauthorized access.

#### 🧾 **Full Patient Profile & ID Upload**

* Upload of ID cards via Appwrite Storage.
* Admins can view full patient details before approving or cancelling appointments.

#### 🗂️ **Admin Workflow**

* View all appointments in a clean dashboard.
* Approve or cancel bookings.
* Send SMS notifications using **Twilio API**.
* Click on a patient’s name to view full registration data (new feature).
* Visited patient names are automatically visually indicated.

---

## 📰 **AI-Ready Blog Publishing System**

A complete editorial publishing platform built inside the hospital app.

#### ✍️ **Blog Post Creation**

* Rich-text editing with categories, tags, thumbnail images, and authors.
* Media uploaded via Appwrite storage.

#### 🗃️ **Dynamic Blog Categories**

* Category CRUD with validation.
* Category-based filtering and routing.

#### 🔎 **Post Search & Pagination**

* Real-time search across title, tags, and body.
* Server-optimized pagination for large datasets.

#### 🗂️ **Archive System (by Month & Year)**

* Automatically groups posts by publication date.
* Server-rendered for SEO using `revalidate`.
* Clean UI showing month → year → post count.

#### 📰 **SEO-Ready Slug Pages**

* Dynamic routes for each post.
* Pre-generated metadata for better search visibility.

#### 🎧 **Future-ready AI Enhancements**

(Your saved vision for upcoming work:)

* Per-article **text-to-speech** (local accents).
* AI-generated summaries.
* Inline ChatGPT question-and-answer section for every article.

---

## 💡 **Other Platform Features**

* 🎨 **Modern UI/UX** using Tailwind CSS + Shadcn components
* 🌓 Light/dark theme support
* 📦 Clean folder structure using the Next.js App Router
* 🛡️ Environment variables stored securely
* 🗄️ Database powered by **MongoDB**
* ☁️ Cloud media handling via **Appwrite**
* 📱 Fully responsive layout

---

## 🛠️ **Tech Stack**

| Layer                   | Technology                                  |
| ----------------------- | ------------------------------------------- |
| **Frontend Framework**  | Next.js (App Router)                        |
| **Styling**             | Tailwind CSS + Shadcn UI                    |
| **Backend Runtime**     | Next.js server actions + API routes         |
| **Authentication**      | JWT Tokens                                  |
| **Database**            | MongoDB                                     |
| **File Storage**        | Appwrite Cloud                              |
| **State/Data Fetching** | React Server Components + Client Components |
| **Deployment**          | Vercel                                      |
| **SMS Notifications**   | Twilio                                      |
| **Version Control**     | Git & GitHub                                |

---

## 🏁 **Getting Started**

### **Prerequisites**

* Node.js v18+
* MongoDB URI
* Appwrite project
* Twilio account (optional for SMS)

### **Installation**

```bash
git clone https://github.com/LoveyCode/Regal-Care-Hospital.git
cd Regal-Care-Hospital
npm install
npm run dev
```


