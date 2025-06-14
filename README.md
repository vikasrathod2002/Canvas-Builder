# Canvas Builder Backend API

A Node.js/Express backend for the Canvas Builder application that provides API endpoints for canvas manipulation and PDF export.

## Features

- Initialize canvas with custom dimensions
- Add various elements (rectangles, circles, text, images)
- Export canvas as high-quality PDF
- Input validation and error handling
- File upload handling

## API Endpoints

- `POST /api/canvas/initialize` - Initialize canvas
- `POST /api/canvas/rectangle` - Add rectangle
- `POST /api/canvas/circle` - Add circle
- `POST /api/canvas/text` - Add text
- `POST /api/canvas/image` - Add image (file upload or URL)
- `GET /api/canvas/export` - Export canvas as PDF
- `GET /api/canvas/state` - Get current canvas state

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`
4. Start the server: `npm start` (or `npm run dev` for development)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FILE_UPLOAD_LIMIT` - Max file upload size (default: 5MB)

## Testing

Run tests with: `npm test`
