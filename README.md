# PathFinder

PathFinder is a React application designed to help users plan and visualize routes for outdoor activities like hiking, biking, or running. It provides an interactive map interface using OpenLayers, allowing users to easily draw custom routes and export them as GPX files for use with devices like Garmin Connect or Strava.

## Key Features

*   Interactive map interface using OpenLayers for route planning.
*   Linestring drawing tools for creating custom routes.
*   GPX file export for compatibility with Garmin Connect and other GPS devices/software.

## Installation

1.  Clone the repository:

    ```bash
    git clone [repository URL]
    ```

2.  Navigate to the project directory:

    ```bash
    cd mapdrawsol
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
    or
    ```bash
    pnpm install
    ```

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open the application in your web browser at the provided URL (usually `http://localhost:5173`).

3.  Click on the map to begin drawing your route.

4.  Continue clicking to add points to the linestring, creating your desired path.

5.  To delete the lines click on "clear drawings"

6.  Once your route is complete, download the GPX File.

7.  Upload the downloaded GPX file to Garmin Connect or your preferred GPS device/software(Strava).


## License

MIT License

