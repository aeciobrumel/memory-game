
import rocketLaunch from "../assets/rocket-launch.svg";
import planetFill from "../assets/planet-fill.svg";
import meteor from "../assets/meteor.svg";
import globe from "../assets/globe-hemisphere-west.svg";
import flyingSaucer from "../assets/flying-saucer.svg";
import alien from "../assets/alien.svg";
import { StaticImageData } from "next/image";

export type Item = {
    name: string;
    image: StaticImageData;
}
export const items : Item[] = [
    {name: 'rocket', image: rocketLaunch},
    {name: 'planet', image: planetFill},
    {name: 'meteor', image: meteor},
    {name: 'globe',  image: globe},
    {name: 'flying', image: flyingSaucer},
    {name: 'alien',  image: alien}
]
    