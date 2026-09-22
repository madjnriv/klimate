# Klimate

Klimate is a modern weather dashboard built with React, Vite, TypeScript, and the OpenWeather API. It helps users search for cities, view weather conditions, save favorites, and explore detailed forecasts from a polished and responsive interface.

## Features

- City search with debounced typeahead/autocomplete behavior
- Current weather and hourly forecast views
- User geolocation support for local weather
- Detailed weather metrics like humidity, pressure, wind, visibility, and sunrise/sunset
- Favorite city saving and recent search history
- Keyboard navigation inside the search command list
- Light/dark theme switching
- Error states and stale-request protection for search updates

## Project audit summary

This project is a strong portfolio-quality weather app with the key requirements in place:

- Public API-backed city search
- Debounced input
- Loading and empty states
- Keyboard navigation
- Error handling
- Favorites and recent search persistence
- Clean, responsive UI

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack React Query
- React Router
- Radix UI
- OpenWeather API
- Lucide icons

## Project structure

```bash
src/
  api/
    config.ts
    types.ts
    weather.ts
  components/
    CitySearch.tsx
    CurrentWeather.tsx
    FavoriteButton.tsx
    FavoriteCities.tsx
    Header.tsx
    HourlyTemperature.tsx
    Layout.tsx
    LoadingSkeleton.tsx
    WeatherDetails.tsx
    WeatherForecast.tsx
    ui/
  context/
    theme-provider.tsx
  hooks/
    useDebounce.ts
    useFavorite.ts
    useGeolocation.ts
    useKeyboardNavigation.ts
    useLocalStorage.ts
    useSearchHistory.ts
    useWeather.ts
  pages/
    CityPage.tsx
    WeatherDashboard.tsx
```

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Add your environment variable

Create a `.env` file in the project root and add your OpenWeather API key:

```bash
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

### 3) Run the app locally

```bash
npm run dev
```

Open the app in your browser at:

```bash
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Search behavior

The search experience is driven by the OpenWeather geocoding API and includes:

- debounced query input
- loading indicators while requests are in flight
- empty states when no results match
- keyboard support using arrow keys and Enter
- stale-response protection so newer searches do not get overwritten by older requests

## Notes

- The dashboard requests geolocation when available to show a user’s local weather.
- Favorites and recent searches persist in browser storage.
- The UI supports both dark and light themes.

## License

This project is intended for personal or portfolio use unless otherwise stated.
