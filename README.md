# COVID-19 Dashboard

This is a comprehensive COVID-19 Dashboard built using React, Chart.js, and CSS. This project visualizes COVID-19 data, such as active cases, recoveries, deaths, and vaccinations, using charts and summary cards. The dashboard fetches data from the Disease.sh API.

## Features

- **Dynamic Data Visualization**: Uses Chart.js to display interactive line charts of COVID-19 statistics.
- **Location-Based Data**: Select from multiple locations (countries or states) to view specific data.
- **Summary Cards**: Displays cumulative statistics like total cases, recoveries, deaths, and vaccinations.
- **Responsive Design**: Built with Tailwind CSS to ensure the application looks great on all devices.

## Technologies Used

- **React.js**: For building the user interface.
- **Chart.js**: For creating interactive and visually appealing charts.
- **CSS**: For styling and responsive design.
- **Disease.sh API**: To fetch real-time COVID-19 data.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lawani-EJ/COVID-19-Dashboard
   ```

2. Navigate to the project directory:
   ```bash
   cd covid19-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Usage

- Select a location from the dropdown to view COVID-19 data for that region.
- Interact with the line chart to explore trends over time.
- View summary cards for cumulative statistics.

## Project Structure

```plaintext
src/
├── App.css           // Global styles
├── App.jsx           // Main application component
├── components/
│   └── SummaryCard.jsx // Summary card component
├── index.css         // Tailwind CSS configuration
└── main.jsx          // Application entry point
```

## Screenshots

### Home Page
![Home Page](./public/Screenshot%20(181).png)

![Home Page](./public/Screenshot%20(182).png)

![Home Page](./public/Screenshot%20(183).png)

## API Reference

This project uses the [Disease.sh API](https://disease.sh/docs/):

- **Endpoint for Summary Data**: `/v3/covid-19/countries/{country}`
- **Endpoint for Historical Data**: `/v3/covid-19/historical/{country}?lastdays=30`

## Future Enhancements

- Add support for more granular data (e.g., cities or districts).
- Include additional visualizations like bar charts or pie charts.
- Implement a search feature for faster location selection.
- Add dark mode for better user experience.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

**Developed By**: [Lawani-EJ](https://github.com/Lawani-EJ)
