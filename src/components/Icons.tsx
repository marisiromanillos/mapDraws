import alltrails from "../assets/alltrails.png";
import garmin from "../assets/garmin.png";
import komoot from "../assets/komoot.svg.png";
import strava from "../assets/strava.png";

const Icons = (): JSX.Element => {
    interface IconsType {
        alltrails: string;
        garmin: string;
        komoot: string;
        strava: string;
    }

    const icons: IconsType = {
        alltrails,
        garmin,
        komoot,
        strava,
    };

    return (
        <div className="grid gap-x-4 md:gap-x-0 gap-y-4 grid-cols-2 md:w-1/2 items-center">
            {Object.entries(icons).map(([key, value]) => (
                <div key={key}>
                    <img src={value} alt={key} width={key}/>
                </div>
            ))}
        </div>
    );
};

export default Icons;
