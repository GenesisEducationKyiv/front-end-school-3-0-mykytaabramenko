# Music Tracks Manager

A simple React application for managing music tracks, built with Vite and Material-UI.

## Getting Started

To install dependencies and run the app locally:

```bash
npm install
npm start
```

The app will be available at `http://localhost:3000`.

## Core Features

- **CRUD Modals**  
  Create and edit track metadata (title, artist, album, genres, cover image) in modal dialogs using React Router v6 modal routes.

- **Playback**  
  Play/pause inline by clicking the row, with a progress indicator at the bottom of the row.

- **Filtering & Search**  
  Filter tracks by artist, genre, and perform search by title, artist, or album.

- **Sorting**  
  Sort tracks by title, artist, album, or genre in ascending/descending order.

- **Pagination**  
  Server-side pagination with controls to navigate between pages and adjust items per page.

- **Form Validation**  
  Real-time and on-blur validation with React Hook Form for required fields and cover image URL format checks.

- **Default Cover Image**  
  Display a default placeholder when no cover image URL is provided.

- **Delete Confirmation**  

- **Toast Notifications**  
  Success and error toasts for create, update, and delete operations using MUI Snackbar and Alert.

- **Loading States & Accessibility**  
  Loading indicators, disabled states with both `disabled` and `aria-disabled="true"`, and `data-loading="true"` attributes.  
  Each interactive element and form error has a `data-testid` for reliable testing.

## `data-testid` Reference

Some of the test IDs used throughout the app:

- `tracks-header` – Main page heading
- `create-track-button` – Button to open Create Track modal
- `track-form`, `input-title`, `input-artist`, … – Track form and its inputs
- `filter-genre`, `filter-artist`, `search-input` – Filter controls
- `sort-select`, `order-select` – Sorting controls
- `pagination`, `pagination-next`, `pagination-prev` – Pagination
- `track-item-{id}`, `audio-player-{id}`, `play-button-{id}`, `pause-button-{id}`, `audio-progress-{id}` – Track row and player
- `confirm-dialog`, `confirm-delete`, `cancel-delete` – Delete confirmation
- `toast-container`, `toast-success`, `toast-error` – Toast notifications

## Technologies

- **Frontend:** React, Vite, Material-UI, React Hook Form, TanStack Query, React Router
- **Styling:** Styled Components
- **Backend:** Node.js API (provided separately)

## License

This project is for educational purposes.
