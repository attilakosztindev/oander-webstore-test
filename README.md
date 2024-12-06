# 🛠 Frontend Development Task

This project outlines the implementation of a **Vue.js 3 build** based on the provided design and functionality requirements. Follow the steps and guidance below to complete the task effectively.

---

## 🔧 Build Instructions

1. **Environment Setup**:
   - Set the appropriate [Node version](#node-version) in the project root directory.
   - Run the following command to initialize the Vue.js 3 environment:
     ```bash
     npm install
     ```

2. **Design**:
   - The graphical design is available under the ["Design"](#design) section.  
   - To inspect elements in Figma:
     - Use your Gmail account to log in if you don’t have a Figma account or don’t want to create one.

3. **Mobile-First Approach**:
   - Build the layout with a **pixel-perfect mobile-first** mindset using Vue.js.
   - Libraries can be used sparingly, with an emphasis on lightweight solutions (e.g., selective use of Bootstrap components rather than the entire library).

4. **Product Data**:
   - Populate the product cards using the endpoint specified in the ["API"](#api) section.

5. **Vanilla JavaScript**:
   - To showcase your **vanilla.js skills**, avoid using external packages or plugins wherever possible.

---

## 🎯 Functional Requirements

### ✅ Core Functionality:
1. **Category Filtering**:
   - Implement category filtering based on the four states visible in the design.

2. **Filter by Condition**:
   - Implement filtering for **new** and **on sale** products using a native `<select>` element for options.  
   - The design doesn't specify the filter UI, so a simple native select will suffice.

3. **Excluded Features**:
   - No functionality is required for the following elements in this task:
     - "More products" link
     - Wishlist button
     - Color swatch selector
     - Quantity input
     - "Add to cart" button

---

## 🎨 Design

Access the graphical design using the link below:  
[**Figma Design**](https://www.figma.com/file/GDhg551sqnWt2ppOzgVG0T/FE-Pr%C3%B3bafeladat?node-id=0%3A1)  
*(Log in with a Gmail account if necessary for inspection.)*

---

## 🌐 API

Fetch product data from the following endpoint:  
[**MockAPI Endpoint**](https://63500f5078563c1d82b7d0ab.mockapi.io/oander-frontend/products)

---

## ⚙️ Node Version

Ensure the project is initialized with **Node.js v16.18.0** or later.

---

## 🖥️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/frontend-task.git
   cd frontend-task
