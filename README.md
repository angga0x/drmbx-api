# DramaBox API Server & Telegram Bot

This project provides a RESTful API and a Telegram bot for fetching video data from DramaBox. The API is built with Node.js and Express, and it uses a SQLite database to manage user API keys. The Telegram bot, built with Telegraf, allows users to generate and manage their API keys.

## Features

- **REST API:**
  - Secure endpoints protected by an `x-api-key` header.
  - Fetches all chapters for a given DramaBox URL.
  - Fetches a single chapter by index.
  - Generates, regenerates, and views API keys.
  - Tracks key creation, update, and last usage times in GMT+7.
- **Telegram Bot:**
  - `/getkey`: Generates a new API key or retrieves an existing one.
  - `/regeneratekey`: Replaces the user's current API key.
  - `/viewkey`: Displays the user's API key and its metadata.
- **Robust Pagination:** The API uses a reliable, incremental fetching strategy to handle inconsistencies in the DramaBox API.
- **Automatic Server Reloading:** `nodemon` is used for automatic server restarts during development.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/angga0x/drmbx-api.git
    cd dramabox-api-server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root of the project and add your Telegram bot token:
    ```
    TELEGRAM_BOT_TOKEN=your_telegram_bot_token
    ```

## Running the Application

You can run the API server and the Telegram bot concurrently in separate terminals.

-   **To start the API server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:3000`.

-   **To start the Telegram bot:**
    ```bash
    npm run start:bot
    ```

## API Endpoints

All endpoints are prefixed with `/v1`.

### API Key Management

-   **GET `/keys/:username`**
    -   Retrieves an existing API key for a user or generates a new one.
    -   `:username` should be the user's Telegram username.

-   **POST `/keys/:username/regenerate`**
    -   Generates a new API key, replacing the old one.

-   **GET `/keys/:username/view`**
    -   Retrieves detailed information about a user's API key, including timestamps.

### Drama Downloader

-   **POST `/drama/download`**
    -   Fetches video data from a DramaBox URL.
    -   Requires a valid `x-api-key` in the header.
    -   **Body (to fetch all chapters):**
        ```json
        {
          "url": "dramabox_url"
        }
        ```
    -   **Body (to fetch a single chapter):**
        ```json
        {
          "url": "dramabox_url",
          "index": 1
        }
        ```

## Telegram Bot Commands

-   `/start`: Displays a welcome message.
-   `/getkey`: Generates a new API key or retrieves the existing one.
-   `/regeneratekey`: Creates a new API key, invalidating the old one.
-   `/viewkey`: Shows your current API key and its usage details.
