# Car Dealer App

## Overview

The Car Dealer App is a Next.js application that allows users to filter vehicles by make and model year, and view detailed results on a separate page. This documentation provides instructions on how to run and build the application, along with an overview of its features and architecture.

---

## Features

1. **Filter Page:**

   - Home page with a dropdown for vehicle makes and model years.
   - Fetches vehicle makes dynamically using the [VPIC API](https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json).
   - Dropdown for model years ranging from 2015 to the current year.
   - "Next" button navigates to the results page when selections are made.

2. **Result Page:**

   - Displays a list of vehicle models based on the selected make and model year.
   - Fetches vehicle models dynamically using the [VPIC API](https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json).
   - Implements error handling for data fetching issues.

3. **Responsive UI:**
   - Styled using Tailwind CSS.

---

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/car-dealer-app-test.git
   ```

2. Navigate to the project directory:

   ```bash
   cd car-dealer-app-test
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file in the root directory and add any required environment variables. Example:
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://vpic.nhtsa.dot.gov/api
   ```

### Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building the Application

To create a production build:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm start
# or
yarn start
```

---

